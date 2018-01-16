import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/store.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente : ClienteDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public store: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.store.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.buscaEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response;
        //buscar imagem do bucket S3  
        this.imagemExiste();     
      },
    error => {});
    }
  }

  imagemExiste(){
    this.clienteService.buscaImagemBucket(this.cliente.id).subscribe(response => {
      this.cliente.imagemUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`
    },
    error => {});
  }

}
