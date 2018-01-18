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

}