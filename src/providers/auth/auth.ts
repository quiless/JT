import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { user } from '../../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  private usersRef = this.db.list<user>('users');
  constructor(private db: AngularFireDatabase) {
  }

  saveNewUser(entity: user) {    
//db.list('/items', ref => ref.orderByChild('size').equalTo('large'))
    //this.afs.collection("users").
    return new Promise((resolve, reject) => {
      this.usersRef.push(entity).then((data) => resolve(data),(error)=> reject(error));
    });
  };

  searchUser(phoneNumber:string){
   return this.db.list("users",ref=>ref.orderByChild('phoneNumber').equalTo(phoneNumber))
   .snapshotChanges()
   .map(changes => {
     return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
   })    
  }

}
