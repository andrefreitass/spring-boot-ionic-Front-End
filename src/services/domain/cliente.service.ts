import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../store.service";


@Injectable()
export class ClienteService{

    constructor(public http: HttpClient, public store: StorageService){
    }

    buscaEmail(email: string) : Observable<ClienteDTO>{

        let token = this.store.getLocalUser().token;
        let autHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});

        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?email=${email}`,
            {'headers': autHeader});
    }
    //any e um tipo do TypeScript que serve pra todo mundo
    buscaImagemBucket(id : string) : Observable <any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url,{responseType : 'blob'});
    }


}