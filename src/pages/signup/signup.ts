import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu:MenuController,) {
  }

  signupUser(){
    console.log("Formulario Enviado com Sucesso");
  }

  //metodo por enquanto nao utilizado
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  //Padrao do Frame Work, para desabilitar na tela inicial o MENU lateral
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    }

}
