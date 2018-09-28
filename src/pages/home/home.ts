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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages: Array<any>
  currentPage:any = MainProfilePage;
  environment:any = environment;
  constructor(public app:App,
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
      { title: 'Shared With...', component: SharedWithPage,icon:'share-alt' }
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

  logout(){   
    this.auth.logout().then(()=>{
      console.log("after logout");
      this.app.getRootNav().setRoot(SignInPage);
    });
  }
}
