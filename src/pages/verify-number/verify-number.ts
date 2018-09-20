import { Component,ViewChild, QueryList, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController, Loading } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { user } from '../../models/user';
import { SmsVerificationProvider } from '../../providers/sms-verification/sms-verification';

/**
 * Generated class for the VerifyNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify-number',
  templateUrl: 'verify-number.html',
})
export class VerifyNumberPage {
  @ViewChildren('inputNumbers') inputNumbers: QueryList<any>;

  countryCode:string="+55";
  phoneNumber:string="11 9 9677-8823";

  timeToWait:any=120;  
  time:any=0;

  dig1:string=undefined;
  dig2:string=undefined;
  dig3:string=undefined;
  dig4:string=undefined;
  dig5:string=undefined;
  dig6:string=undefined;

  inputNumberFocus:any =0;
  loading:Loading=undefined;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public auth:AuthProvider,
    public smsVerification:SmsVerificationProvider,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController) {
    this.countryCode = navParams.data.countryCode;
    this.phoneNumber = navParams.data.phoneNumber;

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  ionViewDidLoad() {  
    this.startTime();    
  }
  
  ionViewDidEnter(){
    setTimeout(x=>{
      this.inputNumbers.toArray()[0].setFocus();
    },150);
  }

  confirm(){
    this.loading.present();
    this.smsVerification.checkSmsVerification(this.phoneNumber,this.countryCode,this.dig1 + this.dig2 + this.dig3 + this.dig4+this.dig5+this.dig6)
    .then((data)=>{
      console.log(data);
      this.auth.signIn((<any>data).key).then((user)=>{
        console.log("Signin",user);
        this.loading.dismiss();
      },(error)=>{
        console.log("error",error);
      });
    },(error)=>{      
      this.loading.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: error.message,
        buttons: ['Dismiss']
      });
      alert.present();

      for(var x =0;x<6;x++)
        this.inputNumbers.toArray()[x].clearTextInput();
    });
  }

  startTime(){      
    this.time = this.timeToWait;
    this.timerTick();
  }

  onFocus(idx){
    //clearInput
    setTimeout(x=>{      
      if(this.inputNumbers != undefined)
        this.inputNumbers.toArray()[idx].clearTextInput();
    },50);   
    
    this.inputNumberFocus = idx;
  }
  changeFocus(){
    setTimeout(x=>{      
      if(this.inputNumberFocus+1 < 6)
        this.inputNumbers.toArray()[this.inputNumberFocus + 1].setFocus();
    },50);   
    return true;
  }

  timerTick(){
    setTimeout(x => 
      {
          if(this.time <= 0) { }
          this.time -= 1;
          if(this.time>0){
            this.timerTick();
          } 
      }, 1000);
  }
  

  sendSmsVerificationCodeAgain(){
    
    for(var x =0;x<6;x++)
      this.inputNumbers.toArray()[x].clearTextInput();
      
    this.loading.present();

    this.smsVerification.sendSmsVerification(this.phoneNumber,this.countryCode)
    .then(data => {
      this.startTime();
     this.loading.dismiss();
    }, function (error) {
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Something is wrong. Please try again!',
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

}
