import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Local } from '../../../models/local';
import { CreateLocalPage } from '../create-local/create-local';

/**
* Generated class for the ManageLocalPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-manage-local',
  templateUrl: 'manage-local.html',
})
export class ManageLocalPage {
  
  option:string;
  
  myLocals: Local[] = [];
  favoriteLocals: Local[] = [];
  

  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.option = 'mylocals';
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageLocalPage');
    
    for(let i = 0;i<30;i++){
      let local = new Local({
        name: 'Sibara',
        locality: 'Dos Hermanas',
        createdAt: Date.now()
      });
      this.myLocals.push(local);
    }
  }

  goToCreate(){
    this.navCtrl.push(CreateLocalPage);
  }
  
}
