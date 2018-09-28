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
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { UtilsService } from '../services/utilsService';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Keyboard } from '@ionic-native/keyboard';
import { environment } from '../environments/environment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = environment.rootPage;

  constructor(public app:App,
              public platform: Platform, 
              public oneSignal : OneSignal, 
              public statusBar: StatusBar,
              public auth:AuthProvider,
              public utils:UtilsService,
              public keyboard:Keyboard,
              public screenOrientation: ScreenOrientation,
              public user:UserProvider,
              public storage:Storage,
              public modalCtrl: ModalController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      
      if(utils.isCordovaAvailable){
        screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);

        keyboard.onKeyboardShow().subscribe(()=>{
          window.document.querySelector('body').classList.add('keyboard-open');
        });

        keyboard.onKeyboardHide().subscribe(()=>{
          window.document.querySelector('body').classList.remove('keyboard-open');
        });
      }
       

      var notificationOpenedCallback = function(jsonData) {

        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };
      

      if(utils.isCordovaAvailable){
        this.oneSignal.startInit("168dccb8-f88b-4788-ba20-470f8c0ad32d", "723897753446");
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
        this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
        this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
        this.oneSignal.endInit();
      }
   
      /**
      splashTimeout = setTimeout(()=>{
        // this.navCtrl.popToRoot();
          // might try this instead
        
      },4000);**/
    });

    if(environment.enableFirebaseAuthState){
      auth.authState
      .subscribe(
        u => {            
          if(u && (<user>u).key != undefined){          
            if((<user>u).oneSignal == undefined && utils.isCordovaAvailable){
              oneSignal.getIds().then((data)=>{
                auth.updateOneSignalInfo(data);
              });            
            }   
          
            if (u && (!(<user>u).firstName || !(<user>u).lastName) ) {
              this.rootPage = SignUpPage;
            }else{
              this.rootPage = HomePage;
            }
          }
          else {
            this.goToLoginPage();
          }
        },
        () => {
          //this.rootPage = SignInPage;
          this.goToLoginPage();
        }
      );
    }

    /**auth.testSearch.subscribe((data)=>{
      console.log("value changed");
      let profileModal = this.modalCtrl.create(ProfileSharingConfirmationPage);
      profileModal.present();
    });**/
   
  }

  goToLoginPage(){
    this.storage.get("tutorialExecuted").then((data)=>{
      if(data == undefined || data==false)
        this.app.getRootNav().setRoot(PresentationPage);
      else
        this.app.getRootNav().setRoot(SignInPage);
    },(error)=>{
      this.app.getRootNav().setRoot(PresentationPage);
    });
  }

  onPushReceived(payload: OSNotificationPayload) {
    //console.log('Push recevied:',payload);
    //this._this.utils.
    this.utils.notify(payload.body + ". Go to the Pendding Approvals to see!");
  }
  
  onPushOpened(payload: OSNotificationPayload) {
    //console.log('Push opened: ',payload);
    this.utils.GlobalVar.openViaPush=true;
  }
}
