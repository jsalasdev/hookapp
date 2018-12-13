import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';

/**
* Generated class for the SelectLocationPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-select-location',
  templateUrl: 'select-location.html',
})
export class SelectLocationPage {
  
  callback:any;
  
  map: any;
  markers: any;
  localMarker: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  loading: any;
  
  lat: number = 37.5339978;
  lng: number = -5.9296598;
  zoom: number = 7;
  
  showSearchBar:Boolean = false;
  
  constructor(private zone: NgZone, public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public loadingCtrl: LoadingController) {
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.markers = [];
    this.localMarker = undefined;
    this.loading = this.loadingCtrl.create();
    this.callback = this.navParams.get('callback');
  }
  
  ionViewDidLoad() {
    this.loadMap();
  }
  
  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
      });
    }
    
    selectSearchResult(item){
      this.clearMarkers();
      this.autocompleteItems = [];
      this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
        if(status === 'OK' && results[0]){
          this.addMarkerPosition(results[0].geometry.location);
        }
      })
    }
    
    addMarkerPosition(position:any){
      const icon = {
        url: "https://static.thenounproject.com/png/8205-200.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      };
      let marker = new google.maps.Marker({
        position: position,
        map: this.map,
        icon: icon
      });
      this.markers.push(marker);
      this.map.setCenter(position);
      this.map.setZoom(14);
    }
    
    tryGeolocation(){
      this.clearMarkers();
      
      this.geolocation.getCurrentPosition().then((resp) => {
        let pos = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        };
        
        this.addMarkerPosition(pos);
        
      }).catch((error) => {
        console.log('Error getting location', error);
        this.loading.dismiss();
      });
    }
    
    clearMarkers(){
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    }
    
    loadMap(){
      console.log('ENTRA LOAD MAP');
      this.map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: { lat: 39.9998916, lng: -3.302208 },
        disableDefaultUI: true,
        zoom: 5.5
      });  
      
      this.map.addListener('click', (event) => {
        let position = new google.maps.LatLng(event.latLng.lat(),event.latLng.lng());
        if(this.localMarker){
          this.localMarker.setPosition(position);
        }else{
          this.localMarker = new google.maps.Marker({
            position: position,
            map: this.map
          });
        }
      });
    }
    
    saveLocation(){
      if(this.localMarker!==undefined){
        let position = this.localMarker.getPosition();
        this.getLocationData(position, (data) => {
          data.geometry.latitude = position.lat();
          data.geometry.longitude = position.lng();
          this.callback(data).then(() => {
            this.navCtrl.pop();
          });
          
        });
      }     
    }
    
    getLocationData(position, callback){
      let data;
      this.geocoder.geocode({'location': position}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            data = {              
              address: results[0].formatted_address,
              geometry: {
                latitude: position.lat(),
                longitude: position.lng()
              }
            }
          } else {
            data = undefined;
          }
        } else {
          data = undefined;
        }
        
        callback(data);
      });
    }
    
    
    // ionViewDidLoad() {
    //   setTimeout(() => {
    //     this.callback('test').then(() => { this.navCtrl.pop() });
    //   },1000);
    // }
    
  }
  