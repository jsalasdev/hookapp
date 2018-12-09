import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse} from '@ionic-native/facebook';

/**
* Generated class for the LoginPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  user:any = {};
  
  constructor(private fb: Facebook, public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  login(){
    console.log('CLICK LOGIN');
    this.fb.login(['public_profile', 'user_friends','email'])
    .then((res: FacebookLoginResponse) => {
      if(res.status==='connected'){
        console.log('Conectado.');
      }else{
        alert('Login failed');
      }      
    })
    .catch(e => {
      console.log(e);
    })
  }
  
}
