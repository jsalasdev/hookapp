import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Local } from '../../../models/local';
import { TobaccoProvider } from '../../../providers/locals/tobacco';
import { TobaccoBrand } from '../../../models/tobaccobrand';
import { EditLocalTobaccoListPage } from '../edit-local-tobacco-list/edit-local-tobacco-list';

/**
* Generated class for the SelectTobaccoPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-select-tobacco',
  templateUrl: 'select-tobacco.html',
})
export class SelectTobaccoPage {
  
  item: Local;
  
  brands: TobaccoBrand[];
  
  constructor(private toast: ToastController, private _tp: TobaccoProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.data;
    this.brands = [];
    console.log(this.item);
  }
  
  ionViewDidLoad() {
  }
  
  presentToast() {
    let toast = this.toast.create({
      message: 'No hay sabores disponibles',
      duration: 1200
    });
    
    toast.present();
  }

  ionViewWillEnter(){
    this._tp.getBrands().subscribe((res: TobaccoBrand[]) => {
      this.brands = res;
    }, (err) => {
      console.log(err);
    });
    
  }
  
  cardTapped(card:TobaccoBrand){
    if(card.tobaccos.length == 0){
      this.presentToast();
    }else{
      let data = {
        local: this.item,
        brand: card
      }
      this.navCtrl.push(EditLocalTobaccoListPage,data);
    }
  }
  
}
