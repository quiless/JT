import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
/**
 * Generated class for the ProfileSharingConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-sharing-confirmation',
  templateUrl: 'profile-sharing-confirmation.html',
})
export class ProfileSharingConfirmationPage {

  myPendingRequests:Observable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userProvider: UserProvider) {

                //this.myPendingRequests = userProvider.myPendingRequests.valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileSharingConfirmationPage');
  }

}
