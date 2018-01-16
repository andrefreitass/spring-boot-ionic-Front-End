import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';


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

  grupoFormulario: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu:MenuController,
    public formBuilder: FormBuilder) {

      this.grupoFormulario = this.formBuilder.group({
        nome:['',[Validators.required, Validators.minLength(5),Validators.maxLength(120)]],
        email:['',Validators.required,Validators.email],
        tipo:['',[Validators.required]],
        cpfOuCnpj:['',[Validators.required,Validators.minLength(11),Validators.maxLength(14)]],
        senha:['',[Validators.required]],
        logradouro : ['', [Validators.required]],
        numero : ['', [Validators.required]],
        complemento : ['', []],
        bairro : ['', []],
        cep : ['', [Validators.required]],
        telefone1 : ['', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]]

      });
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
