import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectLocationPage } from './select-location';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    SelectLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectLocationPage),
  ],
  providers:[
    Geolocation
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class SelectLocationPageModule {}
