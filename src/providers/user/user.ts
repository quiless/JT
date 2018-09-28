import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { user } from '../../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
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

  get myPendingsToApproval(){
    return this.afs.collection('users').doc(this.auth.currentUser.key).collection("pendingsToApproval");
  }

  get myRequests(){
    return this.afs.collection('users').doc(this.auth.currentUser.key).collection("requests");
  }

  get iSharedWith(){
    return this.afs.collection('users').doc(this.auth.currentUser.key).collection("sharedWith");
  }

  get myContacts(){
    return this.afs.collection('users').doc(this.auth.currentUser.key).collection("contacts");
  }

  deletePendingToApprovalReferences(pendingToApproval){
    return new Promise((resolve,reject)=>{
      this.afs.collection('users').doc(pendingToApproval.user.key)
      .collection("requests",ref=>ref.where("user.key","==",this.auth.currentUser.key))
      .get()
      .subscribe(data=>{                  
        let promises=[];
        data.docs.forEach(doc=>{
          console.log("delete doc",doc.ref.id);
          promises.push(this.afs.collection('users').doc(pendingToApproval.user.key)
                                .collection("requests").doc(doc.ref.id).delete());
        })
        resolve(Promise.all(promises).then(()=>{
          return this.myPendingsToApproval.doc(pendingToApproval.id).delete();
        }));
      },(error)=>{
        reject(error);
      }); 
    });    
  }

  acceptPendingToApproval(pendingToApproval,profile){
    return this.afs.collection('users').doc(this.auth.currentUser.key)
    .collection("sharedWith")
    .add({
      user:pendingToApproval.user,
      sharedProfile:profile,
      date:new Date().toJSON()
    }).then(()=>{
      console.log("add in contacts",pendingToApproval.user.key);
      return this.afs.collection('users').doc(pendingToApproval.user.key)
              .collection("contacts")
              .add({
                      date:new Date().toJSON(),
                      profile:profile,
                      user: {
                        key:this.auth.currentUser.key,
                        firstName:this.auth.currentUser.firstName,
                        lastName:this.auth.currentUser.lastName        
                      }}).then(()=>{
                        return this.deletePendingToApprovalReferences(pendingToApproval);
                      });
    });
    /**return this.myPendingsToApproval.doc(pendingToApproval.id).delete()
    .then((data)=>{
      return new Promise((resolve,reject)=>{
        this.afs.collection('users').doc(pendingToApproval.user.key)
        .collection("requests",ref=>ref.where("user.key","==",this.auth.currentUser.key))
        .get()
        .subscribe(data=>{                  
          let promises=[];
          data.docs.forEach(doc=>{
            console.log("delete doc",doc.ref.id);
            promises.push(this.afs.collection('users').doc(pendingToApproval.user.key)
                                  .collection("requests").doc(doc.ref.id).delete());
          })
          resolve(Promise.all(promises));
        },(error)=>{
          reject(error);
        }); 
      });
    });**/
  }

  getUserProfile(userKey:any,profileUid:any){
    return new Promise((resolve,reject)=>{
       this.db.list(`/users/${userKey}/profiles`,ref=>ref.orderByChild("uid").equalTo(profileUid)).snapshotChanges()
       .map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
        .subscribe((data)=>{
          resolve(data);
        },(error)=>{
          reject(error);
        });
    });  
  }
  
  RequestProfileSharing(target:string){
    console.log("RequestProfileSharing",target);
    return new Promise((resolve,reject)=>{
        let subscription1 = this.db.object(`users/${target}`).snapshotChanges()
        .map(c => {      
          //Pega as informações do target;
          return { key: c.key, ...c.payload.val() }; 
        }).subscribe((data)=>{ 
          if(data != undefined){
            console.log("subscrive",data);
            let targetUser = <any>data;
  
            this.afs.collection('users').doc(`${target}`).collection("pendingsToApproval").add({
              user:{
                key:this.auth.currentUser.key,
                firstName:this.auth.currentUser.firstName,
                lastName:this.auth.currentUser.lastName        
              },
              date:new Date().toJSON()
            }).then(()=>{
              return this.afs.collection('users').doc(`${this.auth.currentUser.key}`).collection("requests").add({
                user:{
                  key:targetUser.key,
                  firstName:targetUser.firstName,
                  lastName:targetUser.lastName        
                },
                date:new Date().toJSON()
              });
            }).then(x=>{
              console.log("success");
              subscription1.unsubscribe();
              resolve("success");
            });
          }else{
            subscription1.unsubscribe();
            reject("User not found");
          }   
        },(error)=>{
          reject(error);
        },()=>{          
          subscription1.unsubscribe();
        });

    });
    

    /**
    return this.afs.collection('users').doc(`${target}`).collection("pendingsToApproval").add({
      user:this.auth.currentUser.key,
      date:new Date().toJSON()
    }).then(()=>{
      return this.afs.collection('users').doc(`${this.auth.currentUser.key}`).collection("requests").add({
        user:target,
        date:new Date().toJSON()
      });
    });**/
  }
}
