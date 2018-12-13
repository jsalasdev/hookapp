import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateLocalPage } from './create-local';

@NgModule({
  declarations: [
    CreateLocalPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateLocalPage),
  ]
})
export class CreateLocalPageModule {}
