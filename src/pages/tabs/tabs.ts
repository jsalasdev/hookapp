import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Tabs } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MapPage } from '../map/map';
import { ManageLocalPage } from '../manager/list-manage-local/manage-local';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = MapPage;

  @ViewChild('myTabs') tabRef: Tabs;

  index:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private menu: MenuController) {
      this.menu.enable(true);
      
  }

  ionViewDidLoad() {
    this.index = this.navParams.get('index');
    if(this.index){
      this.tabRef.select(this.index);
    }
  }

}
