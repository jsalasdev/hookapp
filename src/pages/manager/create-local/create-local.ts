import { Component } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SelectLocationPage } from '../select-location/select-location';
import { LocalProvider } from '../../../providers/locals/local';
import { Local } from '../../../models/local';


/**
* Generated class for the CreateLocalPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-create-local',
  templateUrl: 'create-local.html',
})
export class CreateLocalPage {
  
  todo = {};  
  form: FormGroup;
  location:any;
  
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController,private _lp: LocalProvider, private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      availableHookahs: [''],
      location: ['', Validators.required],
      tobaccoPrice:['',Validators.required],
      premiumTobaccoPrice:['']
    });
  }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateLocalPage');
  }
  
  goToSelectLocation(){
    this.navCtrl.push(SelectLocationPage, {
      callback: this.getLocation
    });
    
    // setTimeout(() => {
    //   this.form.controls['location'].setValue('test');
    //   console.log('hecho');
    // },1000);
    
  }
  
  getLocation = (data) => {
    return new Promise((resolve, reject) => {
      if(data!==undefined){
        this.location = data;
        this.form.controls['location'].setValue(data.address);
        resolve();
      }else{
        console.log('ERROR');
        reject();
      }      
    });
  }
  
  sendData(value:Object){
    // console.log(value);
    console.log('CREATE-LOCAL: ', this.location);
    let newLocal = new Local({
      name: value['name'],
      availableHookahs: value['availableHookahs'],
      premiumTobaccoPrice: value['premiumTobaccoPrice'],
      tobaccoPrice: value['tobaccoPrice'],
      location :{
        description: this.location.address,
        latLng: {
          lat: this.location.geometry.latitude,
          lng: this.location.geometry.longitude
        }
      }
    });
    
    this._lp.addLocal(newLocal).subscribe((local: Local) => {
      this.presentToast();
    }, error => {
      this.presentAlert();
      console.log(error);
    });
  }
  
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'El local fué añadido correctamente',
      duration: 1200
    });
    
    toast.onDidDismiss(() => {
      this.navCtrl.pop();
    });
    
    toast.present();
  }
  
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error en el servidor',
      subTitle: 'Ocurrió un error inesperado, pruebe en unos minutos...',
      buttons: ['Ok']
    });
    alert.present();
  }
  
  fakeSendData(){
    let newLocal = new Local({
      name: 'Sibara',
      availableHookahs: 25,
      premiumTobaccoPrice: 10,
      tobaccoPrice: 7,
      location :{
        description: 'Calle maniaflores',
        latLng: {
          lat: 13.3123,
          lng: 3.12312
        }
      }
    });
    
    this._lp.addLocal(newLocal).subscribe((local: Local) => {
      this.presentToast();
    }, error => {
      this.presentAlert();
      console.log(error);
    });
    
  }
  
}
