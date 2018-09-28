import { Component,  } from '@angular/core';
import { NavController, ActionSheetController, Alert, AlertController, Events, ModalController, IonicPage } from 'ionic-angular';
import { LinkedIn, LinkedInLoginScopes } from '@ionic-native/linkedin';
import { Linkedin } from '../../models/linkedin'
import { InstagramModel } from '../../models/Instagram'
import { Instagram } from "ng2-cordova-oauth/core";  
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { UserService } from '../../services/userService'
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { TwitterModel } from '../../models/Twitter'
import { AuthProvider } from '../../providers/auth/auth';
import { user } from '../../models/user';
import { UserProvider } from '../../providers/user/user';
import { ProfileSharingConfirmationPage } from '../profile-sharing-confirmation/profile-sharing-confirmation';

import { ShareModalComponent } from '../../modals/share-modal/share-modal';

/**
 * Generated class for the MainProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-profile',
  templateUrl: 'main-profile.html',
})
export class MainProfilePage {

  scopes: LinkedInLoginScopes[] = ['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'];
  linkedinConnected = false;
  linkedinProfile = new Linkedin();
  twitterProfile = new TwitterModel();
  instagramProfile = new InstagramModel();
  instagramConnected = false;
  public lstSocials = [];

  private oauthInstagram: OauthCordova = new OauthCordova();
  private instagramProvider: Instagram = new Instagram({
    clientId: "d9e955bb371a4b1da4718ed0a5c76ebe",      
    redirectUri: 'http://localhost',  // Let is be localhost for Mobile Apps
    responseType: 'token',   
    appScope: ['basic','public_content'] 
  });
  private apiResponseInstagram;

  social = [
    {Id : 1, Name: "Facebook"},
    {Id : 2, Name: "Twitter"},
    {Id : 3, Name: "Whatsapp"},
    {Id : 4, Name: "Linkedin"},
    {Id : 5, Name: "Google+"},
    {Id : 6, Name: "Skype"},
    {Id : 7, Name: "Instagram"},
  ]
  currentUser:user;
  constructor(private events : Events, 
    private twitterConnect : TwitterConnect, 
    private userService : UserService, 
    private userProvider:UserProvider,
    private alert : AlertController, 
    private linkedIn: LinkedIn, 
    public navCtrl: NavController, 
    private actionSheetController : ActionSheetController,
    public modalController: ModalController,
    private auth: AuthProvider) {

    this.lstSocials.push({icon : 'call'});
    this.currentUser = auth.currentUser;    
  }

  share(){
    let guaritaModal = this.modalController.create(ShareModalComponent);
    guaritaModal.present();
  }

  connectInstagram(){
    if (this.instagramProfile.username == undefined) {
      this.oauthInstagram.logInVia(this.instagramProvider).then((success : any)=> {
        console.log("loginVia success",success);
        this.userService.getInstagramUserInfo(success.access_token).then((result : any) => {
          
       
          var resultado = JSON.parse(result.data);
          console.log(resultado);
          this.instagramProfile.username = resultado.data.username;
          this.instagramConnected = true;     
          result.icon = 'logo-instagram';
          result.name = 'instagram';
          this.userService.pushLst(result);
          var json = {icon:'logo-instagram', IsActive : false}
          this.events.publish('updateSocials', json );
          this.auth.updateInstagram(resultado.data);
        }, error => {
          console.log(error);
        });
        console.log(success);
      }, error => {
        console.log(error);
      });
    } else {
      this.instagramProfile = new InstagramModel();
      this.auth.removeInstagram();
      this.userService.spliceLst("logo-instagram");	
      this.events.publish('removeSocials', {social : 'logo-instagram', name: 'instagram'});
    }
    
  }

  connectTwitter(){
   
    //let profileModal = this.modalCtrl.create(ProfileSharingConfirmationPage);
    //profileModal.present();
    //this.userProvider.RequestProfileSharing("-LNBvnx66rCpYOErveps");

    
    if (this.twitterProfile.userId == undefined){
      var alerta = this.alert.create();
      this.twitterConnect.login().then((result : any) => {
        this.twitterProfile = result;
        console.log(result);
        result.icon = 'logo-twitter';
        result.name = 'twitter';
        this.userService.pushLst(result);
        var json = {icon: 'logo-twitter', IsActive : false}
        this.events.publish('updateSocials', json );      
        this.auth.updateTwitter(result);
      }, error => {
        console.log(error);
      });
    } else {
      this.twitterProfile = new TwitterModel();
      this.auth.removeTwitter();
      this.userService.spliceLst("logo-twitter");	
      this.events.publish('removeSocials', { social : 'logo-twitter', name : 'twitter'});
    }
     /****/
  }
  
  ionViewDidLoad(){
    this.auth.getInstagram().subscribe((result : any) => {
      if(result != undefined && result != null){
        this.instagramProfile = result;
      }
    }, error => {
      console.log(error);
    });

    this.auth.getTwitter().subscribe((result : any) => {
      if(result != undefined && result != null){
        this.twitterProfile = result;
      }
    }, error => {
      console.log(error);
    });

    this.auth.getLinkedin().subscribe((result : any) => {
      if(result != undefined && result != null){
        this.linkedinProfile = result;
      }
    }, error => {
      console.log(error);
    });
  }



  connectLinkediIn(){
    var alerta = this.alert.create();
    if (this.linkedinProfile.id == undefined){
      this.linkedIn.login(this.scopes, false).then(result => {
        console.log("linkedin result",result);
        this.linkedIn.getRequest('people/~').then((profile : any) => {
          console.log("linkedin profile",profile);
          this.linkedinProfile = profile;
          this.linkedinProfile.url = profile.siteStandardProfileRequest.url; 
          profile.icon = 'logo-linkedin';
          profile.name = 'linkedin';       
          this.userService.pushLst(profile);
          var json = {icon:'logo-linkedin', IsActive : false}
          this.events.publish('updateSocials', json);
          this.auth.updateLinkedin(this.linkedinProfile);
        }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
        alerta.setMessage("Caiu no erro");
        alerta.present();
      });
    } else {
      this.linkedIn.logout();
      this.linkedinProfile = new Linkedin();
      var nullLinkedin = { id : "", firstName: "", headline : "", lastName : "", url : "", siteStandardProfileRequest: {}}
      this.auth.removeLinkedin();
      this.userService.spliceLst("logo-linkedin");
      this.events.publish('removeSocials', {social : 'logo-linkedin', name : 'linkedin'});	
    }   
  }

  // showAction(){
  //   console.log("clicou");
  //   let actionSheet = this.actionSheetController.create({
  //     buttons: [      
  //       {
  //         text: 'Facebook',
  //         handler: () => {
  //           this.fb.login(null).then(response => {
  //             console.log(response);
  //           }, error => {
  //             console.log(error);
  //           });
  //         }
  //       },
  //       {
  //         text: 'Twitter',
  //         handler: () => {
  //         }
  //       },
  //       {

  //         text: 'Whatsapp',
  //         handler: () => {
  //         }
  //       },
  //       {
  //         text: 'Linkedin',
  //         handler: () => { 
  //         }
  //       },
  //       {
  //         text: 'Google+',
  //         handler: () => { 
  //         }
  //       },
  //       {
  //         text: 'Skype',
  //         handler: () => { 
  //         }
  //       },
  //       {
  //         text: 'Instagram',
  //         handler: () => { 
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  //   //actionSheet.present();
  // }



}
