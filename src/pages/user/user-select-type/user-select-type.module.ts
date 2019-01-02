import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSelectTypePage } from './user-select-type';

@NgModule({
  declarations: [
    UserSelectTypePage,
  ],
  imports: [
    IonicPageModule.forChild(UserSelectTypePage),
  ],
})
export class UserSelectTypePageModule {}
