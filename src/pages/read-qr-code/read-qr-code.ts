import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { UtilsService } from '../../services/utilsService';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ReadQrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-read-qr-code',
  templateUrl: 'read-qr-code.html',
})
export class ReadQrCodePage {
  qrCodeData:any;
  elementType : 'url' | 'canvas' | 'img' = 'url';
  numberQrcode : string;

  constructor(private qrScanner: QRScanner,public navCtrl: NavController,public viewCtrl:ViewController, public navParams: NavParams,public utils:UtilsService,public auth: AuthProvider) {
    this.numberQrcode = this.utils.guid();
    this.auth.saveShareUid(this.numberQrcode);
  }

  ionViewDidLoad() {
    if(this.utils.isCordovaAvailable)
      this.scannerCode();
  }

  ionViewDidLeave() {
    if(this.utils.isCordovaAvailable)
      this.qrScanner.hide();
  }
  
  dismiss(){
    this.viewCtrl.dismiss(this.qrCodeData);
  }

  scannerCode() {
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            this.qrCodeData = text;
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            this.dismiss();
          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called
        } else if (status.denied) {
         this.utils.alert("Oops","We dont have permission to do this.");
         //this.dismiss();
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          this.utils.alert("Oops","We dont have permission to do this.");
          //this.dismiss();
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) =>{
          this.utils.alert("Oops","Something is wrong with us.");
          //this.dismiss();
      });
  }
}
