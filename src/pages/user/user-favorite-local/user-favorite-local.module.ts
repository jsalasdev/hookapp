import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFavoriteLocalPage } from './user-favorite-local';

@NgModule({
  declarations: [
    UserFavoriteLocalPage,
  ],
  imports: [
    IonicPageModule.forChild(UserFavoriteLocalPage),
  ],
})
export class UserFavoriteLocalPageModule {}
