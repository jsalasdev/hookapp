import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { LocalProvider } from '../../providers/locals/local';
import { Local } from '../../models/local';
import { LocalProfilePage } from '../manager/local-profile/local-profile';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  latestsLocals:Local[] = [];
  topLocals:any[] = [];
  
  constructor(private _lp: LocalProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad(){
  }
  
  ionViewWillEnter(){
    this._lp.getLatestsLocals().subscribe((locals: Local[]) => {
      this.latestsLocals = locals;
    });
    this._lp.getLocalsByFollows().subscribe((locals: any[])=> {
      this.topLocals = locals;
    });
  }
  
  openProfile(data:any){
    this.navCtrl.push(LocalProfilePage, data._id || data.local._id);
  }
  
}
