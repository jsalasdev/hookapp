import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {IonicStorageModule} from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePageModule } from '../pages/home/home.module';
import { ListPage } from '../pages/list/list';
import { MapPageModule } from '../pages/map/map.module';
import { UserProfilePageModule } from '../pages/user/user-profile/user-profile.module';

import { ManageLocalPageModule } from '../pages/manager/list-manage-local/manage-local.module';

import { TabsPageModule } from '../pages/tabs/tabs.module';
import { IntroPageModule } from '../pages/intro/intro.module';
import { LoginPageModule } from '../pages/login/login.module';
import { Facebook } from '@ionic-native/facebook';
import { UserProvider } from '../providers/users/user';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { LocalProfilePageModule } from '../pages/manager/local-profile/local-profile.module';
import { CreateLocalPageModule } from '../pages/manager/create-local/create-local.module';
import { SelectLocationPageModule } from '../pages/manager/select-location/select-location.module';
import { LocalProvider } from '../providers/locals/local';
import { UserSelectTypePageModule } from '../pages/user/user-select-type/user-select-type.module';
import { SelectTobaccoPageModule } from '../pages/manager/select-tobacco/select-tobacco.module';
import { TobaccoProvider } from '../providers/locals/tobacco';
import { EditLocalTobaccoListPageModule } from '../pages/manager/edit-local-tobacco-list/edit-local-tobacco-list.module';
import { RoulettePageModule } from '../pages/roulette/roulette.module';

// export function jwtOptionsFactory(storage) {
//   return {
//       tokenGetter: () => {
//           //return storage.get('TOKEN');
//       }
//   }
// }

@NgModule({
  declarations: [
    MyApp,
    ListPage
  ],
  imports: [
    HttpModule,
    SelectLocationPageModule,
    HttpClientModule,
    CreateLocalPageModule,
    BrowserModule,
    HomePageModule,
    TabsPageModule,
    MapPageModule,
    UserProfilePageModule,
    ManageLocalPageModule,
    LocalProfilePageModule,
    IntroPageModule,
    LoginPageModule,
    UserSelectTypePageModule,
    SelectTobaccoPageModule,
    EditLocalTobaccoListPageModule,
    RoulettePageModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  //   JwtModule.forRoot({
  //     jwtOptionsProvider: {
  //         provide: JWT_OPTIONS,
  //         useFactory: jwtOptionsFactory
  //     }
  // })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    UserProvider,
    LocalProvider,
    TobaccoProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
