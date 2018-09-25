import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UserService } from '../../services/userService'
import { Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {



  constructor(private qrScanner: QRScanner, private auth: AuthProvider, private alert: AlertController, public navCtrl: NavController, private userService: UserService, private events: Events) {

    window.document.querySelector('ion-app').classList.add('transparentBody')
  }

  ionViewDidLeave() {
    this.qrScanner.hide();
    this.hideCamera(); 
  }

  ionViewWillLeave(){
    this.hideCamera(); 
 }

  ionViewDidLoad() {
   



  }

  addContacts() {

  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  
  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  scannerCode() {
    this.showCamera();


    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
        if (status.authorized) {
          // camera permission was granted

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.presentAlert(text,text);
            this.hideCamera(); 
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
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



}
