import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { LocalProvider } from '../../providers/locals/local';
import { Local } from '../../models/local';
import { styles } from '../../assets/tempconf/conf';
import { map } from 'rxjs/operator/map';
import { LocalProfilePage } from '../manager/local-profile/local-profile';

declare var google: any;

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
  
  myPositionMarker: any;
  
  currentLocals: Local[] = [];
  
  lat: number = 37.5339978;
  lng: number = -5.9296598;
  zoom: number = 7;
  
  showSearchBar:Boolean = false;
  
  constructor(private _lp: LocalProvider, private zone: NgZone, public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public loadingCtrl: LoadingController) {
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
          this.getMarkers(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        }
      })
    }
    
    getMarkers(latitude, longitude){
      console.log('GET MARKERS');
      this._lp.getLocalsByLocation(longitude, latitude, 300)
      .subscribe((locals: Local[]) => {
        this.currentLocals = locals;
        
        for(let i = 0; i< this.currentLocals.length; i++){
          let url;
          let size;
          if(this.currentLocals[i].isPremium){
            url = '..\\..\\assets\\imgs\\markers\\teteria-premium.png';
            size = 50;
          }else{
            url = '..\\..\\assets\\imgs\\markers\\teteria-no-premium.png'
            size = 40;
          }
          console.log(this.currentLocals[i]);
          const icon = {
            url: url, // url
            scaledSize: new google.maps.Size(size, size), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
          };
          
          let position = {
            lat: this.currentLocals[i].location.coordinates[0],
            lng: this.currentLocals[i].location.coordinates[1]
          };
          
          let marker = new google.maps.Marker({
            title: this.currentLocals[i].name,
            icon: icon,
            position: position,
            map: this.map,
          });
          
          google.maps.event.addListener(marker, 'click', () => { 
            let contentString = this.getProfileTemplate(locals[i]);
            
            var infowindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 200
            });
            this.map.setCenter(marker.getPosition());
            infowindow.open(this.map, marker);
            
            google.maps.event.addListenerOnce(infowindow, 'domready', () => {
              document.getElementById('infoClick').addEventListener('click', () => {
                this.goToLocalProfile(locals[i]);
              });
            });
          });
          this.markers.push(marker);
        }
      });
    }
    
    goToLocalProfile(local:Local){
      this.navCtrl.push(LocalProfilePage, local._id);
    }
    
    getProfileTemplate(local:Local){
      let contentString;
      if(local.isPremium){
        contentString = `<h1>${local.name.toUpperCase()}</h1>
        <button style="width:100%; background: #fcba04; border-radius:4px; font-family:verdana; margin-bottom:10px; padding: 10px;" ion-button color="warning" *ngIf="local.isPremium==true">
        <ion-icon name="checkmark-circle"></ion-icon>                                
        <i class='far fa-handshake'></i>&nbsp;<b> LOCAL VERIFICADO </b>
        </button>
        <br>
        
        <b>Cachimbas disponibles: </b> ${local.availableHookahs}<br>
        <b>Precio cachimba normal: </b> ${local.tobaccoPrice}€<br>
        <b>Precio cachimba premium: </b> ${local.premiumTobaccoPrice}€<br>
        <p id="infoClick">Ver perfil</p>`;
      }else{
        contentString = `<h1>${local.name.toUpperCase()}</h1>
        <p style="color:#fcba04" id="infoClick"><b>Ver perfil</b></p>`
      }
      return contentString;
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
      this.myPositionMarker = marker;
      // this.markers.push(marker);
      this.map.setCenter(position);
      this.map.setZoom(17);
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
        console.log(pos.lat + ' ' + pos.lng);
        this.getMarkers(pos.lat, pos.lng);
        
        // this.loading.dismiss();
        
      }).catch((error) => {
        console.log('Error getting location', error);
        this.loading.dismiss();
      });
    }
    
    clearMarkers(){
      this.myPositionMarker = null;
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
        zoom: 5.5,
        mapTypeControlOptions: {
          mapTypeIds: ['Styled']
        },
        mapTypeId: 'Styled'
      });  
      let styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
      this.map.mapTypes.set('Styled', styledMapType);
    } 
    
  }
  