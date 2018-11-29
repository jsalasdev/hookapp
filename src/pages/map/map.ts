import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  
  lat: number = 37.5339978;
  lng: number = -5.9296598;
  zoom: number = 7;
  
  @ViewChild('bar') searchBar: Searchbar;
  
  searchTerm: string = '';
  
  showSearchBar:Boolean = true;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    console.log('TAB MAPA');
    if(this.showSearchBar){
      console.log('Focus');
      this.searchBar.setFocus();
    }    
  }

  getTerms(){
    console.log(this.searchTerm);
  }
  
}
