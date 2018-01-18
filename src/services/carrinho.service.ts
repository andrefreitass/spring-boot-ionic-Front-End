import { Injectable } from '@angular/core';
import { ProdutoDTO } from '../models/produto.dto';
import { StorageService } from './store.service';
import { Carrinho } from '../models/carrinho';

@Injectable()
export class CarrinhoService {

    constructor(public storage: StorageService) {
    }

    criarOuLimparCarrinho() : Carrinho {
        let cart: Carrinho = {itens: []};
        this.storage.setCarrinhoLocal(cart);
        return cart;
    }

    ObtemCarrinho() : Carrinho {        
        let cart: Carrinho = this.storage.getCarrinhoLocal();
        if (cart == null) {
            cart = this.criarOuLimparCarrinho();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO) : Carrinho {
        let cart = this.ObtemCarrinho();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if (position == -1) {
            //push insere um novo objeto no carrinho
            cart.itens.push({quantidade: 1, produto: produto});
        }
        this.storage.setCarrinhoLocal(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDTO) : Carrinho {
         let cart = this.ObtemCarrinho();
         let position = cart.itens.findIndex(x => x.produto.id == produto.id);
         if (position != -1) {
             //splica remove
             cart.itens.splice(position, 1);
         }
         this.storage.setCarrinhoLocal(cart);
         return cart;
     }
 
     incrementaQuantidade(produto: ProdutoDTO) : Carrinho {
         let cart = this.ObtemCarrinho();
         let position = cart.itens.findIndex(x => x.produto.id == produto.id);
         if (position != -1) {
             cart.itens[position].quantidade++;
         }
         this.storage.setCarrinhoLocal(cart);
         return cart;
     }
 
     decrementaQuantidade(produto: ProdutoDTO) : Carrinho {
         let cart = this.ObtemCarrinho();
         let position = cart.itens.findIndex(x => x.produto.id == produto.id);
         if (position != -1) {
             cart.itens[position].quantidade--;
             if (cart.itens[position].quantidade < 1) {
                 cart = this.removeProduto(produto);
             }
         }
         this.storage.setCarrinhoLocal(cart);
         return cart;
     }
 
     total() : number {
         let cart = this.ObtemCarrinho();
         let sum = 0;
         for (var i=0; i<cart.itens.length; i++) {
             sum += cart.itens[i].produto.preco * cart.itens[i].quantidade;
         }
         return sum;
     }

}