import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  name:string = undefined;
  lastName:string = undefined;
   
  loading:Loading=undefined;  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public auth:AuthProvider,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController) {
    
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  confirm(){
    if(!this.name || !this.lastName){
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'First name and Last name are required.',
        buttons: ['Dismiss']
      });
      alert.present();
      return;
    }
    this.loading.present();
    this.auth.updateFirstAndLastNameCurrentUser(this.name,this.lastName).then(()=>{
      this.loading.dismiss();
      this.auth.currentUser.firstName=this.name;
      this.auth.currentUser.lastName=this.lastName;
      //this.navCtrl.push(HomePage);
    },(error)=>{
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Something wrong is not right!',
        buttons: ['Dismiss']
      });
      alert.present();
      return;
    });
  }
}
