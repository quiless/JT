import { Component } from '@angular/core';
import { MenuController, NavController, App } from 'ionic-angular';
import { MainProfilePage } from '../main-profile/main-profile';
import { ProfileSharingConfirmationPage } from '../profile-sharing-confirmation/profile-sharing-confirmation';
import { MyProfilesPage } from '../my-profiles/my-profiles';
import { AuthProvider } from '../../providers/auth/auth';
import { SignInPage } from '../sign-in/sign-in';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages: Array<any>
  currentPage:any = MainProfilePage;

  constructor(public app:App,public menuCtrl: MenuController,public navCtrl:NavController,public auth:AuthProvider) {
     // used for an example of ngFor and navigation
     this.pages = [
       
      { title: 'Home', component: MainProfilePage,icon:'home' },
      { title: 'Profiles', component: MyProfilesPage,icon:'contact' }
    ];

  }

  openPage(page){
    this.currentPage = page.component;
  }
  openMenu() {
    this.menuCtrl.open();
  }

  logout(){   
    this.auth.logout().then(()=>{
      console.log("after logout");
      this.app.getRootNav().setRoot(SignInPage);
    });
  }
}
