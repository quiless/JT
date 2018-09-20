import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { user } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/internal/Observable';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  header = new Headers();
  options = new RequestOptions();
  public currentUser:user;
  
  constructor(public http: Http,
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
    this.header.append('Access-Control-Allow-Origin' , '*');
    this.header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    this.header.append('Accept','application/json');
    this.header.append('content-type','application/json');
    this.options = new RequestOptions({
      headers: this.header
    });
   
    this.authState.subscribe(user => {
      this.currentUser = <user>user;
    })
  }

  get authState(){
   /**return  
   this.afAuth.authState.subscribe((auth)=>{
      if (auth)
        return this.getUser(auth.uid);
      else 
        return undefined;
    },(error)=>{
      return reject(error);
    });**/
    return  this.afAuth.authState.switchMap(auth  => {
      if (auth) {
        return this.getUser(auth.uid);
      } else return new EmptyObservable();
    });
  }

  getUser(key:string) {  
    return this.db.object('users/'+key).snapshotChanges()
    .map(c => {
      return { key: c.key, ...c.payload.val() };
    });
  };

  teste(entity: user) {    
    return new Promise((resolve, reject) => {
      this.http.post("https://us-central1-justtap-8e195.cloudfunctions.net/teste",JSON.stringify(entity),this.options)
      .toPromise()
      .then((response) =>
      {
        resolve(response.json());
      })
      .catch((error) =>
      {
        reject(error.json());
      });
    });
  };

  signIn(key:string){
    return new Promise((resolve, reject) => {
      this.http.post("https://us-central1-justtap-8e195.cloudfunctions.net/generateCustomToken",JSON.stringify({key:key}),this.options)
      .toPromise()
      .then((response) =>
      {
        var result = response.json();        
        resolve(this.afAuth.auth.signInWithCustomToken(result));
        /**.then(()=>{
          return this.getUser(key);
        }));**/
      })
      .catch((error) =>
      {
        reject(error.json());
      });
    });  
  }

  logout(){
    return this.afAuth.auth.signOut();
  }

  updateFirstAndLastNameCurrentUser(firstName: string,lastName:string) {
    return this.db.object(`/users/${this.currentUser.key}`).update({"firstName": firstName,"lastName":lastName});
  }

}
