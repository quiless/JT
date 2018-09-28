import { Component } from '@angular/core';
import { MenuController, NavController, App } from 'ionic-angular';
import { MainProfilePage } from '../main-profile/main-profile';
import { ProfileSharingConfirmationPage } from '../profile-sharing-confirmation/profile-sharing-confirmation';
import { MyProfilesPage } from '../my-profiles/my-profiles';
import { AuthProvider } from '../../providers/auth/auth';
import { SignInPage } from '../sign-in/sign-in';
import { ContactsPage } from '../contacts/contacts';
import { SharedWithPage } from '../shared-with/shared-with';
import { PendingApprovalsPage } from '../pending-approvals/pending-approvals';
import { SimulatorPage } from '../simulator/simulator';
import { UserProvider } from '../../providers/user/user';
import { map } from 'rxjs/operators';
import { UtilsService } from '../../services/utilsService';
import { environment } from '../../environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages: Array<any>
  currentPage:any = MainProfilePage;
  environment:any = environment;
  constructor(public app:App,
    private inAppBrowser:  InAppBrowser,
    private appAvailability : AppAvailability, 
    private device : Device,
    public menuCtrl: MenuController,
    public navCtrl:NavController,
    public auth:AuthProvider,
    public utils:UtilsService,
    public userProvider:UserProvider) {
     // used for an example of ngFor and navigation
     this.pages = [       
      { title: 'Home', component: MainProfilePage,icon:'home' },      
      { title: 'Contacts', component: ContactsPage,icon:'people' },
      { title: 'Setting Profiles', component: MyProfilesPage,icon:'settings' },
      { title: 'Pending Approvals', component: PendingApprovalsPage,icon:'checkmark' },
      { title: 'History', component: SharedWithPage,icon:'share-alt' }
    ];

    this.userProvider.myPendingsToApproval.valueChanges().subscribe(data=>{
      this.pages[3].badge=data.length;      
    });


    if(this.utils.GlobalVar.openViaPush)
      this.currentPage = PendingApprovalsPage;

    //this.userProvider.myPendingsToApproval.snapshotChanges().t
    /**
    this.userProvider.myPendingsToApproval.snapshotChanges().pipe(map(actions=> actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    }))).subscribe(data=>{
      console.log("subscribe",data);
    });**/

  }

  openPage(page){
    this.currentPage = page.component;
  }
  openMenu() {
    this.menuCtrl.open();
  }
  simulator(){
    this.currentPage = SimulatorPage
  }

  instagram(){   
    this.auth.logout().then(()=>{
      console.log("after logout");
      this.app.getRootNav().setRoot(SignInPage);
    });
  }

  linkedin(){   
    this.auth.logout().then(()=>{
      console.log("after logout");
      this.app.getRootNav().setRoot(SignInPage);
    });
  }

  twitter(){   
    this.auth.logout().then(()=>{
      console.log("after logout");
      this.app.getRootNav().setRoot(SignInPage);
    });
  }

  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string) {
    let app: string;
    if (this.device.platform === 'iOS') {
      app = iosSchemaName;
    } else if (this.device.platform === 'Android') {
      app = androidPackageName;
    } else {
      let browser =  new InAppBrowser().create(httpUrl + username, '_system');
      return;
    }

    this.appAvailability.check(app).then(
      () => { // success callback
        let browser = new InAppBrowser().create(appUrl + username, '_system');
      },
      () => { // error callback
        let browser = new InAppBrowser().create(httpUrl + username, '_system');
      }
    );
  }

  openInstagram() {
    this.launchExternalApp('instagram://', 'com.instagram.android', 'instagram://user?username=', 'https://www.instagram.com/', "g_skorupa");
  }

  openTwitter() {
    this.launchExternalApp('twitter://', 'com.twitter.android', 'twitter://user?screen_name=', 'https://twitter.com/', "g_skorupa");
  }

  openLinkedin() {
    this.launchExternalApp('linkedin://', 'com.linkedin.android', 'linkedin://profile/profile_id=?', 'https://linkedin.com/', "CNAdDIFRlo");
  }

  openLinkedin3() {
    this.launchExternalApp('linkedin://', 'com.linkedin.android', 'linkedin://profile/client_id=?', 'https://linkedin.com/', "CNAdDIFRlo");
  }

  logout(){   
    this.auth.logout().then(()=>{
      console.log("after logout");
      this.app.getRootNav().setRoot(SignInPage);
    });
  }
}
