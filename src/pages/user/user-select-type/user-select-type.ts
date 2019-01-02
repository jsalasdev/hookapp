import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { UserProvider } from '../../../providers/users/user';
import { User } from '../../../models/user';
import { TabsPage } from '../../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-user-select-type',
  templateUrl: 'user-select-type.html',
})
export class UserSelectTypePage {

  userType:string = 'TYPE_SOCIAL';

  user:User;

  constructor(private alertCtrl: AlertController, private _up: UserProvider, private _st: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.data.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSelectTypePage');
  }

  saveData(){
    if(this.user!==null){
      this.user.userType = this.userType;
      this._up.update(this.user)
      .subscribe((user:User)=>{
        this.navCtrl.setRoot(TabsPage);
      },(err) =>{
        this.presentAlert();
      });
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error en el servidor',
      subTitle: 'Ocurrió un error inesperado, pruebe en unos minutos...',
      buttons: ['Ok']
    });
    alert.present();
  }

}
