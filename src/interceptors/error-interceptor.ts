import { Injectable } from '@angular/core';
 import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
 import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/store.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
 
 @Injectable()
 export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService,public alertaControle: AlertController){

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
                case 401:
                this.error401();
                break;
                
                case 403:
                 this.error403();
                break;

                case 404:
                this.error404();
                break;

                default:
                this.errorDefault(errorObj);
             }
 
             return Observable.throw(errorObj);
         }) as any;
     }
     error401(){
        let alerta = this.alertaControle.create({
            title: 'Error 401 - Falha de Autenticacao',
            message: 'Email ou Senha Incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alerta.present();
     }

     error403(){
        //remove da storage
        this.storage.setLocalUser(null);
    }

     error404(){
        let alerta = this.alertaControle.create({
            title: 'Error 404 - Falha para carregar os Dados',
            message: 'Dados Nao Encontrados',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alerta.present();
     }

     errorDefault(errorObj){
        let alerta = this.alertaControle.create({
            title: 'Error' + errorObj.status + ': ' + errorObj.error ,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alerta.present();
    }

 }
 
 export const ErrorInterceptorProvider = {
     provide: HTTP_INTERCEPTORS,
     useClass: ErrorInterceptor,
     multi: true,
 };