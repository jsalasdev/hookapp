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
  mode:string;
  editLocal: Local;
  metaTitle:string;
  hasMusic;
  
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController,private _lp: LocalProvider, private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.mode = this.navParams.data.mode;
    this.editLocal = this.navParams.data.local;
    this.metaTitle = this.mode=='creation'?'Crear Local':'Editar Local';
    if(this.mode=='edit' && this.editLocal){
      this.form = this.formBuilder.group({
        name: [this.editLocal.name, Validators.required],
        availableHookahs: [this.editLocal.availableHookahs],
        location: [this.editLocal.location.description, Validators.required],
        tobaccoPrice:[this.editLocal.tobaccoPrice,Validators.required],
        premiumTobaccoPrice:[this.editLocal.premiumTobaccoPrice],
        hasMusic: [this.editLocal.hasMusic],
        hasAir: [this.editLocal.hasAirConditioner],
        hasSoccer: [this.editLocal.hasSoccer],
        localSpace:[this.editLocal.localSpace]
      });
      // this.form.controls['location'].setValue(this.editLocal.location.description);
    }else{
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        availableHookahs: [''],
        location: ['', Validators.required],
        tobaccoPrice:['',Validators.required],
        premiumTobaccoPrice:[''],
        hasMusic: [false],
        hasAir: [false],
        hasSoccer: [false],
        localSpace:['']
      });
    }
  }
  
  
  ionViewDidLoad() {
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
    switch(this.mode){
      case 'creation':
      let newLocal = new Local({
        name: value['name'],
        availableHookahs: value['availableHookahs'],
        premiumTobaccoPrice: value['premiumTobaccoPrice'],
        tobaccoPrice: value['tobaccoPrice'],
        hasMusic: value['hasMusic'],
        hasAir: value['hasAir'],
        localSpace: value['localSpace'],
        hasSoccer: value['hasSoccer'],
        location :{
          description: this.location.address,
          coordinates: [this.location.geometry.latitude,
            this.location.geometry.longitude]
          }
        });
        this._lp.addLocal(newLocal).subscribe((local: Local) => {
          this.presentToast();
        }, error => {
          this.presentAlert();
        });
        break;
        case 'edit':
        this.editLocal.name = value['name'];
        this.editLocal.availableHookahs = value['availableHookahs'],
        this.editLocal.premiumTobaccoPrice = value['premiumTobaccoPrice'],
        this.editLocal.tobaccoPrice = value['tobaccoPrice'],
        this.editLocal.hasMusic = value['hasMusic'],
        this.editLocal.hasAirConditioner = value['hasAir'],
        this.editLocal.localSpace = value['localSpace'],
        this.editLocal.hasSoccer = value['hasSoccer'],
        this.editLocal.location.description = this.location!==undefined ? this.location.address : this.editLocal.location.description;
        this.editLocal.location.coordinates[0] = this.location!==undefined && this.location.geometry!==undefined ? this.location.geometry.latitude : this.editLocal.location.coordinates[0];
        this.editLocal.location.coordinates[1] = this.location!==undefined && this.location.geometry!==undefined ? this.location.geometry.longitude : this.editLocal.location.coordinates[1];
        
        this._lp.updateLocal(this.editLocal).subscribe((updatedLocal:Local) => {
          if(updatedLocal){
            let toast = this.toastCtrl.create({
              message: 'Actualizado correctamente',
              duration: 1200
            });            
            toast.present();
          }else{
            this.presentAlert();
          }
        }, (err) => {
          this.presentAlert();
        });
        
        break;
      }
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
  