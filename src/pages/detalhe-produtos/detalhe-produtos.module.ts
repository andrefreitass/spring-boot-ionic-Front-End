import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheProdutosPage } from './detalhe-produtos';

@NgModule({
  declarations: [
    DetalheProdutosPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheProdutosPage),
  ],
})
export class DetalheProdutosPageModule {}
