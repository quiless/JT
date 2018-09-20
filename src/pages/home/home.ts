import { Component,  } from '@angular/core';
import { NavController, ActionSheetController, Alert, AlertController, Events } from 'ionic-angular';
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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  scopes: LinkedInLoginScopes[] = ['r_basicprofile'];
  linkedinConnected = false;
  linkedinProfile = new Linkedin();
  twitterProfile = new TwitterModel();
  instagramProfile = new InstagramModel();
  instagramConnected = false;
  public lstSocials = [];

  private oauthInstagram: OauthCordova = new OauthCordova();
  private instagramProvider: Instagram = new Instagram({
    clientId: "3ddbc48123db48c0a089453510d3aadb",      
    redirectUri: 'http://localhost',  
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
    private auth: AuthProvider) {
    console.log(this.social);

    this.lstSocials.push({icon : 'call'});
    this.currentUser = auth.currentUser;
    
  }

  connectInstagram(){

    if (this.instagramProfile.username == undefined) {
      this.oauthInstagram.logInVia(this.instagramProvider).then((success : any)=> {
        this.userService.getInstagramUserInfo(success.access_token).then(result => {
          var resultado = JSON.parse(result.data);
          this.instagramProfile.username = resultado.data.username;
          this.instagramConnected = true;
          this.userService.pushLst({icon:'logo-instagram', IsActive : false});
          var json = {icon:'logo-instagram', IsActive : false}
          this.events.publish('updateSocials', json );
        }, error => {
          console.log(error);
        });
        console.log(success);
      }, error => {
        console.log(error);
      });
    } else {
      this.instagramProfile = new InstagramModel();
      this.userService.spliceLst("logo-instagram");	
      this.events.publish('removeSocials', 'social : logo-instagram');
    }
    
  }

  connectTwitter(){
    if (this.twitterProfile.userId == undefined){
      var alerta = this.alert.create();
      this.twitterConnect.login().then((result : any) => {
        this.twitterProfile = result;
        this.userService.pushLst({icon:'logo-twitter', IsActive : false});
        var json = {icon: 'logo-twitter', IsActive : false}
        this.events.publish('updateSocials', json );
      }, error => {
        console.log(error);
      });
    } else {
      this.twitterProfile = new TwitterModel();
      this.userService.spliceLst("logo-twitter");	
      this.events.publish('removeSocials', 'social : logo-twitter');
    }
    
  }



  connectLinkediIn(){
    var alerta = this.alert.create();
    if (this.linkedinProfile.id == undefined){
      this.linkedIn.login(this.scopes, false).then(result => {
        this.linkedIn.getRequest('people/~').then(profile => {
          this.linkedinProfile = profile;
          this.linkedinProfile.url = profile.siteStandardProfileRequest.url;
          this.userService.pushLst({icon:'logo-linkedin', IsActive : false});
          var json = {icon:'logo-linkedin', IsActive : false}
          this.events.publish('updateSocials', json);
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
      this.userService.spliceLst("logo-linkedin");
      this.events.publish('removeSocials', 'social : logo-linkedin');	
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
