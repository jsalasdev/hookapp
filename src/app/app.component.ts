import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserFavoriteLocalPage } from '../pages/user/user-favorite-local/user-favorite-local';
import { UserProfilePage } from '../pages/user/user-profile/user-profile';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  pages: Array<{title: string, component: any}>;
  
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _st: Storage
    ) {
      this.initializeApp();
      
      // set our app's pages
      this.pages = [
        { title: 'Inicio', component: TabsPage },
        { title: 'Mis locales favoritos', component: UserFavoriteLocalPage },
        { title: 'Mi perfil', component: UserProfilePage },
        
      ];
    }
    
    initializeApp() {
      this.platform.ready().then(() => {
        this._st.get('intro').then((result) => {
          if (result) {
            //mirar si tabspage
            this.rootPage = TabsPage;
          } else {
            this.rootPage = IntroPage;
            this._st.set('intro', true);
          }
        });
        
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }
    
    openPage(page) {
      this.menu.close();
      this.nav.setRoot(page.component);
    }
  }
  