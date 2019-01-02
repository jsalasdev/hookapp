import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
import { UserProvider } from '../../providers/users/user';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { UserSelectTypePage } from '../user/user-select-type/user-select-type';
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
  
  constructor(private _st: Storage,private fb: Facebook, public navCtrl: NavController, public navParams: NavParams, private _us: UserProvider,
    private menu: MenuController) {
      this.menu.enable(false);
  }
  
  ionViewDidLoad() {
    
  }
  
  login(){
    this.fb.login(['public_profile', 'user_friends','email'])
    .then((res: FacebookLoginResponse) => {
      if(res.status==='connected'){
        if(res.authResponse){
          this._us.loginWithFacebook(res.authResponse.accessToken)
          .then(resp => {
          
            this._st.set('session', JSON.stringify(resp.json()));
            localStorage.setItem('session', JSON.stringify(resp.json()));



            if(resp.json().isNew){
              this.navCtrl.push(UserSelectTypePage, resp.json());
            }else{
              this.navCtrl.setRoot(TabsPage);
            }
          })
          .catch(err => {
            console.log('ERROR');
          });
        }else{
          alert('Login failed');  
        }        
      }else{
        alert('Login failed');
      }      
    })
    .catch(e => {
      console.log(e);
    })
  }
  
}
