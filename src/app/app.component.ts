import { Component } from '@angular/core';
import { Platform,App, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { PresentationPage } from '../pages/presentation/presentation';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignInPage } from '../pages/sign-in/sign-in';
import { VerifyNumberPage } from '../pages/verify-number/verify-number';
import { AuthProvider } from '../providers/auth/auth';
import { HomePage } from '../pages/home/home';
import { user } from '../models/user';
import { SplashPage } from '../pages/splash/splash';
import { Storage } from '@ionic/storage';
import { ProfileSharingConfirmationPage } from '../pages/profile-sharing-confirmation/profile-sharing-confirmation';
import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SplashPage;

  constructor(public app:App,platform: Platform, statusBar: StatusBar,auth:AuthProvider,user:UserProvider,public storage:Storage,public modalCtrl: ModalController) {
    let splashTimeout;
    let executeFirstTime=false;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      splashTimeout = setTimeout(()=>{
        // this.navCtrl.popToRoot();
          // might try this instead
          this.storage.get("tutorialExecuted").then((data)=>{
            if(data == undefined || data==false)
              this.app.getRootNav().setRoot(PresentationPage);
            else
              this.app.getRootNav().setRoot(SignInPage);
          },(error)=>{
            this.app.getRootNav().setRoot(PresentationPage);
          });
      },3000);
    });
    
   
    auth.authState
    .subscribe(
      u => {
        console.log("app component",u);        
        if(u && (<user>u).key != undefined){
          if(splashTimeout != undefined)
            clearTimeout(splashTimeout);
            
          if (u && (!(<user>u).firstName || !(<user>u).lastName) ) {
            this.rootPage = SignUpPage;
          }else{
            this.rootPage = HomePage;
          }
        }
        else {
          this.rootPage = SignInPage;
        }
      },
      () => {
        //this.rootPage = SignInPage;
      }
    );

    /**auth.testSearch.subscribe((data)=>{
      console.log("value changed");
      let profileModal = this.modalCtrl.create(ProfileSharingConfirmationPage);
      profileModal.present();
    });**/
   
  }
}
