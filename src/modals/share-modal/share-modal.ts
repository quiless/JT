
import { Component, NgZone } from '@angular/core';
import { NavParams, Events, NavController, LoadingController, AlertController, ModalController, ViewController, ToastController } from 'ionic-angular';



@Component({
  selector: 'component-share-modal',
  templateUrl: 'share-modal.html'
})

export class ShareModalComponent {

  

  constructor(
   
    private alert : AlertController,
    private navParams : NavParams,
    private navCtrl: NavController, 
    public modalController : ModalController, 
    public alertController : AlertController,
    public loadingController : LoadingController) {

    
     
  }

 
}