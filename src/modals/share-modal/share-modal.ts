import { AuthProvider } from '../../providers/auth/auth'
import { Component, NgZone } from '@angular/core';
import { NavParams, Events, NavController, LoadingController, AlertController, ModalController, ViewController, ToastController } from 'ionic-angular';
import { UtilsService } from '../../services/utilsService';



@Component({
  selector: 'component-share-modal',
  templateUrl: 'share-modal.html'
})

export class ShareModalComponent {

  elementType : 'url' | 'canvas' | 'img' = 'url';
  numberQrcode : string;

  constructor(
    private auth : AuthProvider,
    private alert : AlertController,
    private navParams : NavParams,
    private viewController : ViewController,
    private navCtrl: NavController, 
    public modalController : ModalController, 
    public alertController : AlertController,
    public utils:UtilsService,
    public loadingController : LoadingController) {

      this.numberQrcode = this.utils.guid();
      console.log(this.numberQrcode);

      this.auth.saveShareUid(this.numberQrcode);
      (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  dismiss(){
    this.viewController.dismiss();
  }

  ionViewDidLoad(){
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }
 
}