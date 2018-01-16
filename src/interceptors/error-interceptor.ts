import { Injectable } from '@angular/core';
 import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
 import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/store.service';
 
 @Injectable()
 export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){

    }
 
     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         console.log("Passou no interceptor com Sucesso");
         return next.handle(req)
         .catch((error, caught) => {
 
             let errorObj = error;
             if (errorObj.error) {
                 errorObj = errorObj.error;
             }
             if (!errorObj.status) {
                 errorObj = JSON.parse(errorObj);
             }
 
             console.log("Erro detectado pelo interceptor:");
             console.log(errorObj);

             switch (errorObj.status){
                 case 403:
                 this.error403();
                break;
             }
 
             return Observable.throw(errorObj);
         }) as any;
     }

     error403(){
         //remove da storage
         this.storage.setLocalUser(null);
     }
 }
 
 export const ErrorInterceptorProvider = {
     provide: HTTP_INTERCEPTORS,
     useClass: ErrorInterceptor,
     multi: true,
 };