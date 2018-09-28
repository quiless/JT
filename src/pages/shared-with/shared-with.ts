import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProvider } from '../../providers/user/user';
import { map } from 'rxjs/operators';
import { AuthProvider } from '../../providers/auth/auth';
import { UtilsService } from '../../services/utilsService';


/**
 * Generated class for the SharedWithPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shared-with',
  templateUrl: 'shared-with.html',
})
export class SharedWithPage {
  sharedWith:Observable<any>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public userProvider:UserProvider,
    public utils:UtilsService,
    public auth: AuthProvider) {

    this.sharedWith = this.userProvider.iSharedWith.snapshotChanges().pipe(map(actions=> actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    })));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharedWithPage');
  }

  viewProfile(shared){
    
  }
}
