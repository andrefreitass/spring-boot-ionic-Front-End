import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./store.service";

@Injectable()
export class AuthService{

    constructor(public http: HttpClient, public storage: StorageService){        
    }

    autenticacao(credencias :  CredenciaisDTO){
       return this.http.post(
        `${API_CONFIG.baseUrl}/login`,
        credencias,
        {
            observe: 'response',
            responseType: 'text'
        })
    }

    loginSucesso(authorizationValue : string){
        let tokenAutorizacao = authorizationValue.substring(7);
        let usuarioLocal : LocalUser = {
            token: tokenAutorizacao
        };
        this.storage.setLocalUser(usuarioLocal);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
    

}