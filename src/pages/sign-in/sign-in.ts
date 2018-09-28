import { Component,  Renderer, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { user } from '../../models/user';
import { VerifyNumberPage } from '../verify-number/verify-number';
import { SmsVerificationProvider } from '../../providers/sms-verification/sms-verification';
import { environment } from '../../environments/environment';
import { UtilsService } from '../../services/utilsService';
import { Sim } from '@ionic-native/sim';


/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  verificationId: string = '';
  phoneMask: any = { mask: '00/00/0000', len: 10 };
  countryCode: string = undefined;
  phoneNumber: string = undefined;
  simInfo: any;
  cards: any;

  loading: Loading = undefined;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private renderer: Renderer, 
    private elementRef: ElementRef,
    public auth: AuthProvider,
    public smsVerification: SmsVerificationProvider,
    public alertCtrl: AlertController,
    public utils: UtilsService,
    public sim: Sim,
    public loadingCtrl: LoadingController) {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });




  }

  async getSimData() {
    try {
      let simPermission = await this.sim.requestReadPermission();
      if (simPermission == "OK") {
        let simData = await this.sim.getSimInfo();
        this.simInfo = simData;
        this.cards = simData.cards;

        if (simData.phoneNumber != null && simData.phoneNumber != undefined && simData.countryCode == "br") {
          console.log("br");

          console.log(simData);
          this.countryCode = "+55";
          this.phoneMask.mask = "(00) 0000-00000";
          this.phoneMask.len = 15;
          this.phoneNumber = simData.phoneNumber.substring(2, simData.phoneNumber.length);
          this.phoneNumber = "(" + this.phoneNumber.substr(0,2) + ') ' + this.phoneNumber.substr(2,4) + '-' + this.phoneNumber.substr(6,this.phoneNumber.length);
        } else {
          this.countryCode = "+1";
          console.log(this.countryCode);
          this.phoneMask.len = 12;
          this.phoneMask.mask = "000-000-0000";
          this.phoneNumber = simData.phoneNumber;
          this.phoneNumber = this.phoneNumber.substr(1,3) + '-' + this.phoneNumber.substr(4,3) + '-' + this.phoneNumber.substr(7,this.phoneNumber.length);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  ionViewDidLoad() {
    this.getSimData();
  }

  ionViewDidEnter() {

  }

  onCountryChange() {
    this.phoneNumber = undefined;
    if (this.countryCode == "+55") {
      this.phoneMask.mask = "(00) 0000-00000";
      this.phoneMask.len = 15;
    }
    else {
      this.phoneMask.mask = "000-000-0000";
      this.phoneMask.len = 12;
    }
  }

  send() {
    /**
    let u:user = new user();
    u.phoneNumber="11996778823";
    u.countryCode="+55";

    //this.auth.saveNewUser(u).then((data)=>{console.log("sucess",data),(error)=>{console.log("error",error);}});
    this.auth.searchUser("11996778824").subscribe((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error)
    });**/
    /**
 
    
     return;
 **/

    if (this.phoneNumber == undefined
      || (this.countryCode == "+55" && this.phoneNumber.length < 15)
      || (this.countryCode == "+1" && this.phoneNumber.length < 12)) {
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Your verification code could not be sent! Make sure the phone number is correct.',
        buttons: ['Dismiss']
      });
      alert.present();
      return;
    }


    if (environment.simulateSignIn) {
      this.utils.loading(() => {
        return this.auth.signIn(environment.simulateSignInWithUserKey).then((data) => {
          this.utils.notify("Success signin");
        }, (error) => {
          this.utils.alert("Oops", "An error  has occured when we try auto login!")
        });
      });
    } else {
      this.loading.present();
      this.smsVerification.sendSmsVerification(this.phoneNumber, this.countryCode)
        .then(data => {
          this.loading.dismiss();
          if (data == undefined || (<any>data).success == false) {
            let alert = this.alertCtrl.create({
              title: 'Oops',
              subTitle: 'Your verification code could not be sent! Make sure the phone number is correct.',
              buttons: ['Dismiss']
            });
            alert.present();
            return;
          }
          this.navCtrl.push(VerifyNumberPage, {
            countryCode: this.countryCode,
            phoneNumber: this.phoneNumber
          });
        }, function (error) {
          console.log(error);
          this.loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Oops',
            subTitle: 'Your verification code could not be sent! Make sure the phone number is correct.',
            buttons: ['Dismiss']
          });
          alert.present();
        });
    }


    /**this.navCtrl.push(VerifyNumberPage, {
      "carrier" : "Claro",
      "is_cellphone" : true,
      "message" : "Mensagem de texto enviada para +55 1-196-422-7508.",
      "seconds_to_expire" : 599,
      "success" : true,
      "uuid" : "b84cb8a0-9e57-0136-f6ab-1256b72f015a"
    });**/
    /**let teste:user = new user();
    teste.firstName="kelvin";
    teste.lastName="cleto";
    this.auth.save(teste);
    console.log("send",this.verificationId);**/
    //let completePhone:string = this.countryCode + " " + this.phoneNumber;
    //let applicationVerifier = new firebase.auth.
    //this.firebaseAuth.auth.signInWithPhoneNumber("+55 11 996778823",this.verificationId).then((data)=>{console.log("success",data);},(error)=>{console.log("error",error)});
  }
}
