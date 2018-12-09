import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  
  
  map: any;
  markers: any;
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
    this.loading = this.loadingCtrl.create();
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
          // let position = {
          //     lat: results[0].geometry.location.lat,
          //     lng: results[0].geometry.location.lng
          // };
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
      // this.loading.present();
      this.clearMarkers();//remove previous markers
      
      this.geolocation.getCurrentPosition().then((resp) => {
        let pos = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        };
        
        this.addMarkerPosition(pos);
        // this.loading.dismiss();
        
      }).catch((error) => {
        console.log('Error getting location', error);
        this.loading.dismiss();
      });
    }
    
    clearMarkers(){
      for (var i = 0; i < this.markers.length; i++) {
        console.log(this.markers[i])
        this.markers[i].setMap(null);
      }
      this.markers = [];
    }
    
    loadMap(){
      this.map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: { lat: 39.9998916, lng: -3.302208 },
        disableDefaultUI: true,
        scrollwheel: false,
        scaleControl: false,
        draggable: false,
        zoom: 5.5
      });  }
      
    }
    