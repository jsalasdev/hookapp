import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Local } from '../../../models/local';
import { CreateLocalPage } from '../create-local/create-local';
import { LocalProvider } from '../../../providers/locals/local';
import { SelectTobaccoPage } from '../select-tobacco/select-tobacco';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LocalProfilePage } from '../local-profile/local-profile';

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
  
  data:any;
  
  isOwner:boolean = true;

  myLocals: Local[];
  favoriteLocals: Local[];
  
  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController, private _lp: LocalProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.data;
    this.option = 'mylocals';
    if(this.data.role){
      if(this.data.role=='TYPE_OWNER'){
        if(this.data.index==0){
          this.option = 'mylocals';
          this.isOwner = true;
        }else{
          this.option = 'favoritelocals';
          this.isOwner = true;
        }
      }else{
        this.option = 'favoritelocals';
        this.isOwner = false;
      }
    }
    this.myLocals = [];
    this.favoriteLocals = [];
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageLocalPage');
  }
  
  ionViewWillEnter(){
    this._lp.getMyLocals().subscribe((locals: Local[]) => {
      console.log(locals);
      this.myLocals = locals;
    }, error => {
      console.log(error);
    });
    
    this._lp.getFavoriteLocals().subscribe((locals: Local[]) => {
      console.log(locals);
      this.favoriteLocals = locals;
    }, error => {
      console.log(error);
    });
    
  }
  
  goToCreate(){
    this.navCtrl.push(CreateLocalPage,{mode: 'creation'});
  }
  
  deleteLocal(item:Local, index:any){
    let alert = this.alertCtrl.create({
      title: 'Eliminar local',
      message: '¿Está seguro de eliminar el local?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this._lp.deleteLocal(item).subscribe((local: Local) => {
              this.myLocals.splice(index, 1);
              this.presentToast('middle','Local eliminado correctamente.')            
            }, error => {
              this.presentToast('middle','Error al intentar eliminar.')            
              
            });
          }
        }
      ]
    });
    alert.present();
  }
  
  presentToast(position:string, msg:string){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: position
    });  
    toast.present();
  }
  
  editMenu(item:Local){
    this.navCtrl.push(SelectTobaccoPage, item);
  }
  
  editLocal(item:Local){
    this.navCtrl.push(CreateLocalPage,{mode: 'edit', local: item});
  }
  
  openProfile(item:Local){
    this.navCtrl.push(LocalProfilePage, item._id);
  }

}
