import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  buscaPorId(produto_id : string){
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);    
  }

  buscaCategoria(categoria_id : string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }

  //metodo busca as imagens pequenas do bucket S3 Amazon, recebe BLOB por ser uma imagem
  buscaImagemBucket(id : string) : Observable<any>{
      let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
      return this.http.get(url, {responseType : 'blob'});
  }

    //metodo busca as imagens GRANDES do bucket S3 Amazon para exibir no Detalhe, recebe BLOB por ser uma imagem
    buscaImagemDetalheBucket(id : string) : Observable<any>{
      let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`      
      return this.http.get(url, {responseType : 'blob'});
      
  }
}
