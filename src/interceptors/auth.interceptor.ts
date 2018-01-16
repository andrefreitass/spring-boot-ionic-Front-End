import { Injectable } from '@angular/core';
 import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
 import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/store.service';
import { API_CONFIG } from '../config/api.config';
 
 @Injectable()
 export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){
    }
 
     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        
        let localUser = this.storage.getLocalUser();
        let origemTransacao = API_CONFIG.baseUrl.length;
        let requisicaoApi = req.url.substring(0, origemTransacao) == API_CONFIG.baseUrl;

        //por padrao localUser inicia como Nulllo
        if(localUser && requisicaoApi){
            //clona a requisicao caso venha nulo
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        }else{
            return next.handle(req);
        }
    }
 }
 
 export const AuthInterceptorProvider = {
     provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptor,
     multi: true,
 };