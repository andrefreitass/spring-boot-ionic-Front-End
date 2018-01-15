import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { CategoriasPage } from '../categorias/categorias';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  credenciais : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor (
    public navCtrl: NavController, 
    public menu:MenuController,
    public autorizacao: AuthService
  ) {

  }
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    }
    
    ionViewDidLeave() {
    this.menu.swipeEnable(true);
    } 

  login(){
    this.autorizacao.autenticacao(this.credenciais).subscribe(response => {
      this.autorizacao.loginSucesso(response.headers.get('Authorization'));
      this.navCtrl.setRoot("CategoriasPage");
    },
    error => {});   
  }
  
}
