import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, ModalController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProvider } from '../../providers/user/user';
import { map } from 'rxjs/operators';
import { AuthProvider } from '../../providers/auth/auth';
import { UtilsService } from '../../services/utilsService';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { UserService } from '../../services/userService';
import { ProfileViewPage } from '../profile-view/profile-view';
import { ReadQrCodePage } from '../read-qr-code/read-qr-code';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {
  contacts:Observable<any>;
  constructor(private auth: AuthProvider, 
    private navParam:NavParams,
    private modalCtrl:ModalController,
    private alert: AlertController, 
    public navCtrl: NavController, 
    private userService: UserService, 
    public userProvider:UserProvider,
    public utils:UtilsService,
    private events: Events) {
      this.contacts = this.userProvider.myContacts.snapshotChanges().pipe(map(actions=> actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })));

    
  }

 

  ionViewDidLoad() {
   



  }

  addContacts() {

  }



  

  presentAlert(title, subTitle) {
    let alert = this.alert.create({
      title: title,
      subTitle: subTitle,
      buttons: [{
        text: 'OK'}]
    });
    alert.present();
  }


  viewProfile(contact){
    this.navCtrl.push(ProfileViewPage,contact)
  }

  scannerCode(){
    window.document.querySelector('body').classList.add('qrcode-on');
   
    let profileModal = this.modalCtrl.create(ReadQrCodePage);
    profileModal.onDidDismiss(data => {
      window.document.querySelector('body').classList.remove('qrcode-on');
      console.log("did load",data);
      if(data != undefined){
        this.auth.findUserWithShareCode(data).then((result)=>{
          if(result != undefined && (<Array<any>>result).length > 0){
            let targetUser:any = (<Array<any>>result)[0];
            
            if(targetUser.key == this.auth.currentUser.key){
              this.utils.notify("Sorry! You cant request your profile.");
              //this.auth.removeUserShareUid(targetUser.key);
              return;
            }

            this.userProvider.RequestProfileSharing(targetUser.key).then(()=>{
              return this.auth.removeUserShareUid(targetUser.key);
            }).then(()=>{
              this.utils.alert("Uhuul",`We sent your request to ${targetUser.firstName} ${targetUser.lastName}`);
            });
            //key
          }else{
            this.utils.notify("Sorry! We did not find this sharing code.");
          }
        });
      }
    });
    profileModal.present();
  }

}
