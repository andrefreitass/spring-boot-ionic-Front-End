import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemCarrinho } from '../../models/item-carrinho';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CarrinhoService } from '../../services/carrinho.service';
import { ProdutoDTO } from '../../models/produto.dto';

/**
 * Generated class for the CarrinhoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {
  //esse items e referenciado no html
  items: ItemCarrinho[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public carrinhoService: CarrinhoService,
    public produtoService: ProdutoService,) {
  }

  ionViewDidLoad() {
    let cart = this.carrinhoService.ObtemCarrinho();
    this.items = cart.itens;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.buscaImagemBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
        error => {});
    }
  }

  removeProduto(produto: ProdutoDTO){
    this.items = this.carrinhoService.removeProduto(produto).itens;
  }

  incrementaQuantidade(produto: ProdutoDTO){
    this.items = this.carrinhoService.incrementaQuantidade(produto).itens;
  }

  decrementaQuantidade(produto: ProdutoDTO){
    this.items = this.carrinhoService.decrementaQuantidade(produto).itens;
  }

  total() : number {
    return this.carrinhoService.total();
  }

  continuaComprando(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  finalizarCompra(){
    this.navCtrl.push('EscolhaEnderecoPage');
  }

}

