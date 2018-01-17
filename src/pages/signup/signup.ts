import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { Response } from '@angular/http/src/static_response';
import { ClienteService } from '../../services/domain/cliente.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


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
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu:MenuController,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertControle: AlertController) {

      this.grupoFormulario = this.formBuilder.group({
        nome:['Andre Freitas',[Validators.required, Validators.minLength(5),Validators.maxLength(80)]],
        email:['andrefreitass@gmail.com',[Validators.required,Validators.email]],
        tipo:['0',[Validators.required]],
        cpfOuCnpj:['02912849144',[Validators.required,Validators.minLength(11),Validators.maxLength(14)]],
        senha:['123456',[Validators.required]],
        logradouro : ['Rua to teste', [Validators.required]],
        numero : ['123', [Validators.required]],
        complemento : ['A', []],
        bairro : ['Mestre D', []],
        cep : ['73380050', [Validators.required]],
        telefone1 : ['993271771', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]]

      });
  }

    //metodo para buscar cidade e estado no banco de dados
    ionViewDidLoad() {
      this.estadoService.findAll().subscribe(response => {
        this.estados = response;
        this.grupoFormulario.controls.estadoId.setValue(this.estados[0].id);
        this.atualizaCidades();
      },
      error => {})
    }

    atualizaCidades(){
      let estado_id = this.grupoFormulario.value.estadoId;
      this.cidadeService.findAll(estado_id).subscribe(response => {
        this.cidades = response;
        this.grupoFormulario.controls.cidadeId.setValue(null);
      },
      error => {})
    }
    //Metodo para enviar o formulario para criar um usuario
  signupUser(){
    console.log("Formulario Enviado com Sucesso");
    console.log(this.grupoFormulario.value);
    this.clienteService.inserir(this.grupoFormulario.value)
    .subscribe(response => {
      this.mensagemSucesso();
    },
    error => {});
  }

  mensagemSucesso(){
    let alerta = this.alertControle.create({
      title: 'Sucesso!',
      message: 'Cadastro Efetuado com Sucesso',
      enableBackdropDismiss: false,
      buttons:[{
        text: 'Ok',
        //vai desempilhar as paginas
        handler: () => {
          this.navCtrl.pop();
        }
      }
      ]
    });
    alerta.present();
  }


  //Padrao do Frame Work, para desabilitar na tela inicial o MENU lateral
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    }



}
