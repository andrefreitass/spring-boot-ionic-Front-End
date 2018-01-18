import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./store.service";
import { JwtHelper } from "angular2-jwt";
import { CarrinhoService } from "./carrinho.service";

@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public carrinhoService: CarrinhoService){        
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
            token: tokenAutorizacao,
            email: this.jwtHelper.decodeToken(tokenAutorizacao).sub
        };
        this.storage.setLocalUser(usuarioLocal);
        this.carrinhoService.criarOuLimparCarrinho();
    }

    atualizaToken(){
        return this.http.post(
         `${API_CONFIG.baseUrl}/auth/refresh_token`,
         {},
         {
             observe: 'response',
             responseType: 'text'
             //coloca text para o Json nao realizar um parse
         })
     }

    logout(){
        this.storage.setLocalUser(null);
    }
    

}