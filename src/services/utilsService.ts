/* Angular */
import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class UtilsService {

    GlobalVar={
        openViaPush:false
    };
    constructor(public toastCtrl: ToastController,public loadingCtrl: LoadingController,public alertCtrl:AlertController){

        
    }

    
    loading(fn){
        let loading = this.loadingCtrl.create({
        content: 'Please wait...'
        });

        loading.present();
        fn().then(()=>{
            loading.dismiss();
        },(error)=>{
            loading.dismiss();
        });
    }
    
    notify(message,duration=3000) {
        const toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        return toast.present();
    }
    
    alert(title,subTitle) {
        let alert = this.alertCtrl.create({
          title: title,
          subTitle: subTitle,
          buttons: ['Dismiss']
        });
        alert.present();
      }

      guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }
    
    get isCordovaAvailable() {
        if (!(<any>window).cordova) {
            return false;
        }
        return true;
    };

}