import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CarrinhoService } from '../../services/carrinho.service';

/**
 * Generated class for the DetalheProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhe-produtos',
  templateUrl: 'detalhe-produtos.html',
})
export class DetalheProdutosPage {
  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public carrinhoService: CarrinhoService) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    this.produtoService.buscaPorId(produto_id)
      .subscribe(response => {
        this.item = response;
        this.ImagemUrlExiste();
      },
    error => {})
  }
  
  ImagemUrlExiste(){
    this.produtoService.buscaImagemDetalheBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      error => {})
  }

  AdicionaCarrinho(produto: ProdutoDTO){
    this.carrinhoService.addProduto(produto);
    this.navCtrl.setRoot('CarrinhoPage');
  }

}
