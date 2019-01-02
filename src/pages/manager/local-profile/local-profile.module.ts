import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalProfilePage } from './local-profile';
import { AccordionListComponent } from '../../../components/accordion-list/accordion-list';
import { Ionic2RatingModule } from "ionic2-rating";

@NgModule({
  declarations: [
    LocalProfilePage,
    AccordionListComponent
  ],
  imports: [
    IonicPageModule.forChild(LocalProfilePage),
    Ionic2RatingModule
  ],
})
export class LocalProfilePageModule {}
