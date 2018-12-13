import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalProfilePage } from './local-profile';

@NgModule({
  declarations: [
    LocalProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(LocalProfilePage),
  ],
})
export class LocalProfilePageModule {}
