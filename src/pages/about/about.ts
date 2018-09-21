import { Component } from '@angular/core';
import { NavController,App  } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SignInPage } from '../sign-in/sign-in';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public app:App ,public navCtrl: NavController,public auth:AuthProvider) {

  }

  logout(){
   
    this.auth.logout().then(()=>{
      console.log("after logout");
      this.app.getRootNav().setRoot(SignInPage);
    });
  }
}
