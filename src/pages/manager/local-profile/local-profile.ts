import { Component, ElementRef, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Local } from '../../../models/local';
import { Tobacco } from '../../../models/tobacco';
import { LocalProvider } from '../../../providers/locals/local';
import { LocalReview } from '../../../models/localreview';

/**
* Generated class for the LocalProfilePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-local-profile',
  templateUrl: 'local-profile.html',
})
export class LocalProfilePage {
  
  following;
  
  rate;
  
  @Input('readonly') blockRating:boolean = false;
  
  followers: number;
  reviews: number;
  average: number;
  titlePremium:String = 'Tabaco Premium';
  title:String = 'Tabaco Normal';
  local:any = {};
  
  premiumTobaccos:Tobacco[] = [];
  normalTobaccos:Tobacco[] = [];
  
  constructor(private _lp: LocalProvider, public navCtrl: NavController, public navParams: NavParams) {
    // if(this.navParams && this.navParams.data){
    //   this.local = this.navParams.data;
    //   console.log(this.local);
    //   if(this.local && this.local.tobaccos){
    //     this.local.tobaccos.forEach(tobacco => {
    //       if(tobacco.brand.isPremium){
    //         this.premiumTobaccos.push(tobacco);
    //       }else{
    //         this.normalTobaccos.push(tobacco);
    //       }
    //     });
    //   }
    // }
  }
  
  ionViewDidLoad() {
  }
  
  follow(){
    this._lp.postFollow(this.local).subscribe((review: LocalReview) => {
      this.loadInfo();      
    });
  }
  
  onClickRating(event){
    this._lp.postReview(this.local, event).subscribe((review: LocalReview) => {
      this.loadInfo();      
    });
  }
  
  ionViewWillEnter(){
    if(this.navParams && this.navParams.data){
      this._lp.getLocalById(this.navParams.data).subscribe((res: Local) => {
        this.local = res;
        this.titlePremium = `${this.titlePremium} - ${this.local.premiumTobaccoPrice}€`;
        this.title = `${this.title} - ${this.local.tobaccoPrice}€`;
        if(this.local && this.local.tobaccos){
          this.loadInfo();
          this.local.tobaccos.forEach(tobacco => {
            if(tobacco.brand.isPremium){
              this.premiumTobaccos.push(tobacco);
            }else{
              this.normalTobaccos.push(tobacco);
            }
          });
        }
      }, (error:any) => {
        this.navCtrl.pop();
      });
    }else{
      this.navCtrl.pop();
    }
  }
  
  loadInfo(){
    this._lp.getUserInfoFromLocal(this.local).subscribe((res:any) => {
      this.followers = res.local.followers;
      console.log(this.followers);
      this.reviews = res.local.reviews;
      this.average = res.local.average;
      if(res.currentUser.follow){
        this.following = true;
      }else{
        this.following = false;
      }
      if(res.currentUser.review){
        this.rate = res.currentUser.review.rating;
      }
    },(err) => {
      console.log(err);
    });
  }
  
}
