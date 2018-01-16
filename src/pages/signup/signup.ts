import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { Response } from '@angular/http/src/static_response';


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
    public estadoService: EstadoService) {

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

  signupUser(){
    console.log("Formulario Enviado com Sucesso");
  }


  //Padrao do Frame Work, para desabilitar na tela inicial o MENU lateral
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    }

}
