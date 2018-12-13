import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  @ViewChild('slider') slider: Slides;
  slideIndex = 0;
  slides = [
    {
      title: '¿Quieres fumarte una cachimba?',
      imageUrl: 'assets/imgs/slides/hookah.jpg',
      description: 'Encuentra los sitios mejores valorados que están cerca tuya',
    },
    {
      title: '¿Eres gerente de un local con cachimbas?',
      imageUrl: 'assets/imgs/slides/hookah-bar.jpg',
      description: 'Da a conocer tu carta de sabores, precios y aumenta tus clientes...',
    }
  ];

  constructor(public navCtrl: NavController,private menu: MenuController) {
    this.menu.enable(false);
   }


  onSlideChanged() {
    this.slideIndex = this.slider.getActiveIndex();
    console.log('Slide changed! Current index is', this.slideIndex);
  }

  goToApp() {
    this.navCtrl.setRoot(LoginPage);
  }

  skip() {
    this.navCtrl.setRoot(LoginPage);
  }

}
