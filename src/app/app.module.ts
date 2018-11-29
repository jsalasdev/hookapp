import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePageModule } from '../pages/home/home.module';
import { ListPage } from '../pages/list/list';
import { MapPageModule } from '../pages/map/map.module';
import { UserProfilePageModule } from '../pages/user/user-profile/user-profile.module';
import { UserFavoriteLocalPageModule } from '../pages/user/user-favorite-local/user-favorite-local.module';
import { ManageLocalPageModule } from '../pages/manager/list-manage-local/manage-local.module';
import { LocalProfilePageModule } from '../pages/local-profile/local-profile.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';



@NgModule({
  declarations: [
    MyApp,
    ListPage
  ],
  imports: [
    BrowserModule,
    HomePageModule,
    TabsPageModule,
    MapPageModule,
    UserProfilePageModule,
    UserFavoriteLocalPageModule,
    ManageLocalPageModule,
    LocalProfilePageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
