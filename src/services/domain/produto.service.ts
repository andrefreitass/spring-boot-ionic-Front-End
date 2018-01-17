import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  buscaCategoria(categoria_id : string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }

  //metodo busca as imagens pequenas do bucket S3 Amazon, recebe BLOB por ser uma imagem
  buscaImagemBucket(id : string) : Observable<any>{
      let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
      return this.http.get(url, {responseType : 'blob'});
  }
}
