import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProvider } from '../../providers/user/user';
import { map } from 'rxjs/operators';
import { AuthProvider } from '../../providers/auth/auth';
import { UtilsService } from '../../services/utilsService';


/**
 * Generated class for the PendingApprovalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending-approvals',
  templateUrl: 'pending-approvals.html',
})
export class PendingApprovalsPage {
  pendingApprovals:Observable<any>;
  profiles:Array<any>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public userProvider:UserProvider,
    public utils:UtilsService,
    public auth: AuthProvider) {
    
    this.auth.getProfiles().subscribe((result : any) => {
      if(result != undefined && result != null){
        this.profiles = result;
        console.log("profiles",this.profiles);
      }
    }, error => {
      console.log(error);
    });
    this.pendingApprovals = this.userProvider.myPendingsToApproval.snapshotChanges().pipe(map(actions=> actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    })));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingApprovalsPage');
  }

  reject(pendingApproval){
    this.utils.loading(()=>{
    return this.userProvider.deletePendingToApprovalReferences(pendingApproval).then(()=>{
        this.utils.notify(pendingApproval.user.firstName + " rejected!");
      });
    });
  }

  approve(pendingApproval){
    if(this.profiles == undefined || this.profiles.length ==0){
      this.utils.alert("Oops!","You cant do this, because you dont have profiles to share.");
      return;
    }
    let alert = this.alertCtrl.create();
    alert.setTitle('What profile do you want share?');

    this.profiles.forEach((profile)=>{
      alert.addInput({
        type: 'radio',
        label: profile.ProfileName,
        value: profile,
        checked: false
      });
    }); 
  
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if(!data){
          this.utils.alert("Oops!","Select a profile and confirm!");
          return;
        }

        this.utils.loading(()=>{
          return this.userProvider.acceptPendingToApproval(pendingApproval,{
            ProfileName:data.ProfileName,
            uid: data.uid
          }).then(()=>{
            this.utils.notify(pendingApproval.user.firstName + " accepted!");
          });
        });
       
      }
    });

    alert.present();
  }


 

}
