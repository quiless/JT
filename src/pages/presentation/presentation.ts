import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PresentationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html',
})
export class PresentationPage {

  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PresentationPage');
  }

  start(){
    this.storage.set("tutorialExecuted",true).then(()=>{
      this.app.getRootNav().setRoot(SignInPage);
    });
  }
}
