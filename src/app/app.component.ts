import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, MenuController, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProfilePage } from '../pages/user/user-profile/user-profile';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';
import { User } from '../models/user';
import { LoginPage } from '../pages/login/login';
import { ManageLocalPage } from '../pages/manager/list-manage-local/manage-local';
import { IntroPage } from '../pages/intro/intro';
import { LocalProfilePage } from '../pages/manager/local-profile/local-profile';
import { UserSelectTypePage } from '../pages/user/user-select-type/user-select-type';
import { RoulettePage } from '../pages/roulette/roulette';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  pages: Array<{title: string, component: any, index:number}>;
  pagesOwner: Array<{title: string, component: any, index:number}>;

  body: any;
  user = {} as User;
  
  constructor(
    private zone: NgZone,
    private alertCtrl: AlertController,
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _st: Storage
    ) {
      this.initializeApp();
      
      this.pages = [
        { title: 'Inicio', component: TabsPage , index: 0},
        { title: 'Mis locales favoritos', component: ManageLocalPage , index: 1 },
        { title: 'Ruleta', component: RoulettePage, index: 0 },
        //cambiar por tabspage y el indice de manage locales
        // { title: 'Recetas', component: null, index: 0},
        // { title: 'Tabacos', component: null, index: 0},
        // { title: 'Mi perfil', component: LocalProfilePage, index: 0}        
      ];
      this.pagesOwner = [
        { title: 'Mis locales', component: ManageLocalPage , index: 0}   
      ];
    }
    
    initializeApp() {
      this.platform.ready().then(() => {
        this._st.get('intro').then((result) => {
          if (result) {
            this._st.get('session').then((result) => {
              console.log(result);
              if(result){
                //TABSPAGE
                this.user = JSON.parse(result).user;
                this.rootPage = TabsPage;
              }else{
                //LOGINPAGE
                this.rootPage = LoginPage;
              }
            });
          } else {
            //INTROPAGE
            this.rootPage = IntroPage;
            this._st.set('intro', true);
          }
        });
        
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }
    
    openPage(page) {
      if(page.component){
        this.menu.close();
        this.nav.setRoot(page.component, {
          index: page.index,
          role: this.user.userType
        });
      }else{
        this.alertCtrl.create({
          title: "Lo sentimos",
          subTitle: "Esta funcionalidad estará pronto...",
          buttons: ["OK"]
        }).present();
      }
    }
    
    menuClosed() {
    }
    
    menuOpened() {   
      console.log('MENU OPEN'); 
      let res = JSON.parse(localStorage.getItem('session'));
      if(res && res.user){
        this.zone.run(() => {
          this.user = res.user;
        });          
      }
    }
    
    logout(){
      this._st.remove('session').then(res => {
        this.nav.setRoot(LoginPage);
        this.menu.close();
      });
      localStorage.removeItem('session');
    }
    
  }
  