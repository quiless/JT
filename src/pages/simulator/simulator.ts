import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the SimulatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-simulator',
  templateUrl: 'simulator.html',
})
export class SimulatorPage {

  simulations:Array<any>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public afs: AngularFirestore,
    public db: AngularFireDatabase) {
    this.simulations =[{
      name:"Simulation a Request Profile",
      fn:this.SimulationRequestProfile.bind(this)
    }];
  }

  SimulationRequestProfile(){
    let target="-LMsEBF4049LEzg2pfv7"; //Kelvin
    let currentUser={
      "key":"-LNBvnx66rCpYOErveps",
      "countryCode" : "+1",
      "firstName" : "Ahmed",
      "fullPhoneNumber" : "+1201-719-3845",
      "lastName" : "Mahmoud",
      "phoneNumber" : "201-719-3845"
    };    

    this.db.object(`users/${target}`).snapshotChanges()
    .map(c => {
      
      //Pega as informações do target;
      let targetUser:any = { key: c.key, ...c.payload.val() };

      return this.afs.collection('users').doc(`${target}`).collection("pendingsToApproval").add({
        user:{
          key:currentUser.key,
          firstName:currentUser.firstName,
          lastName:currentUser.lastName        
        },
        date:new Date().toJSON()
      }).then(()=>{
        return this.afs.collection('users').doc(`${currentUser.key}`).collection("requests").add({
          user:{
            key:targetUser.key,
            firstName:targetUser.firstName,
            lastName:targetUser.lastName        
          },
          date:new Date().toJSON()
        });
      });
    }).subscribe((data)=>{
      console.log("success");
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SimulatorPage');
  }

}
