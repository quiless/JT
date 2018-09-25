import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { user } from '../../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { AuthProvider } from '../auth/auth';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { DateTime } from 'ionic-angular';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  constructor(private db: AngularFireDatabase,
    public auth:AuthProvider,
    private afs: AngularFirestore) {
  }

  get myPendingRequests(){
    return this.afs.collection('users').doc(this.auth.currentUser.key).collection("pendingRequests");
  }

  get myRequests(){
    return this.afs.collection('users').doc(this.auth.currentUser.key).collection("requests");
  }


  RequestProfileSharing(target:string){
    return this.afs.collection('users').doc(`${target}`).collection("pendingsToApproval").add({
      user:this.auth.currentUser.key,
      date:new Date().toJSON()
    }).then(()=>{
      return this.afs.collection('users').doc(`${this.auth.currentUser.key}`).collection("requests").add({
        user:target,
        date:new Date().toJSON()
      });
    });
  }
}
