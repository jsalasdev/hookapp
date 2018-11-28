import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageLocalPage } from './manage-local';

@NgModule({
  declarations: [
    ManageLocalPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageLocalPage),
  ],
})
export class ManageLocalPageModule {}
