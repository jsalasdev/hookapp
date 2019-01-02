import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Local } from '../../../models/local';
import { TobaccoBrand } from '../../../models/tobaccobrand';
import { User } from '../../../models/user';
import { LocalProvider } from '../../../providers/locals/local';
import { Tobacco } from '../../../models/tobacco';
import { TobaccoProvider } from '../../../providers/locals/tobacco';

@IonicPage()
@Component({
  selector: 'page-edit-local-tobacco-list',
  templateUrl: 'edit-local-tobacco-list.html',
})
export class EditLocalTobaccoListPage {
  
  local: Local;
  brand: TobaccoBrand;
  user: User;
  
  tobaccos: Tobacco[];
  
  constructor(private toastCtrl: ToastController, private _tp: TobaccoProvider, private _lp: LocalProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.tobaccos = [];
    let data = this.navParams.data;
    if(data){
      this.local = data.local;
      this.brand = data.brand;
    }
  }
  
  ionViewWillEnter(){
    this._tp.getTobaccosFromBrand(this.brand._id).subscribe((tobaccos:Tobacco[]) =>{
      this.tobaccos = tobaccos;
    });
  }
  
  ionViewDidLoad() {
  }
  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1200
    });
    
    toast.present();
  }
  
  checkedOptions(id, event){
    let idx = this.local.tobaccos.indexOf(id);
    if (idx > -1) {
      this.local.tobaccos.splice(idx, 1);
    } else {
      this.local.tobaccos.push(id);
    }
  }
  
  updateTobaccos(){
    this._lp.updateLocal(this.local).subscribe((updatedLocal: Local) => {
      this.local = updatedLocal;
      this.presentToast('Actualizado correctamente.');
    }, (err) => {
      this.presentToast('Error al actualizar, espere unos minutos...');
    });
  }
  
}
