import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { PresentationPage } from '../presentation/presentation';
import { SignInPage } from '../sign-in/sign-in';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
  }

  ionViewDidLoad() {
  
  }

}
