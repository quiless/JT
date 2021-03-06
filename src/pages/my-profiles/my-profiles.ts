import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UserService } from '../../services/userService'
import { Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
@Component({
  selector: 'my-profiles',
  templateUrl: 'my-profiles.html'
})
export class MyProfilesPage {
  elementType = 'url';
  value = 'Techiediaries';

  socials : any = [];
  profiles : any = [];

  constructor(private auth : AuthProvider, private alertController : AlertController, public navCtrl: NavController, private userService : UserService, private events : Events) {
    
    
    events.subscribe('updateSocials', (json) =>{
      //this.socials.push(json);
    });

    events.subscribe('removeSocials', (data) =>{

      this.profiles.forEach((profile)=> {
        if(data.name == 'instagram'){
          delete profile.instagram;
        } else if (data.name == 'linkedin'){
          delete profile.linkedin;
        } else if (data.name == 'twitter'){
          delete profile.twitter;
        } else if (data.name == 'phone'){
          delete profile.phone;
        }
      });
      this.auth.updateProfiles(this.profiles);
    });
  }

  ionViewDidLoad(){
    this.auth.getProfiles().subscribe((result : any) => {
      if(result != undefined && result != null){
        this.profiles = result;
        console.log("profiles",this.profiles);
      }
    }, error => {
      console.log(error);
    });

    this.socials = this.userService.lstSocials;
    console.log(this.socials, "SOCIALS");
  }
  
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  

  addProfile(){
    let alert = this.alertController.create({
      inputs: [
        {
          name: 'name',
          type: 'text'
        }],
      title : "Nome do perfil",
      buttons: [   
        {
          text: 'Cancelar',
          handler: () => {
            return;
          }
        },   
        {
          text: 'Criar',
          handler: (data) => {
            this.profiles.push({
              uid:this.guid(),
              elementType: 'url', 
              value : '', 
              ProfileName : data.name, socials : {}});
            this.auth.updateProfiles(this.profiles);
          }
        }]
    });
    alert.present();
  }

  deleteProfile(profile, index){
    let alert = this.alertController.create({
      
        buttons: [      
          {
            text: 'Cancelar',
            handler: () => {
              return;
            }
          },
          {
            text: 'Excluir',
            handler: () => {     
              this.profiles.splice(index, 1);
              this.auth.removeProfile(index);
              
            }
          }
        ]
      });
      alert.setMessage("Deseja excluir o perfil?");
      alert.present();

  }

  changeStatus(profile, social, index, indexParent){
  
    if (social.name == 'linkedin'){
      if(profile.linkedin == null || profile.linkedin == undefined){
        profile.linkedin = social;
        this.auth.updateProfiles(this.profiles);
      } else {
        delete profile.linkedin;
        this.auth.updateProfiles(this.profiles);
      }
    } else if (social.name == 'instagram'){
      if(profile.instagram == null || profile.instagram == undefined){
        profile.instagram = social;
        this.auth.updateProfiles(this.profiles);
      } else {
        delete profile.instagram;
        this.auth.updateProfiles(this.profiles);
      }
    } else if (social.name == 'twitter'){
      if(profile.twitter == null || profile.twitter == undefined){
        profile.twitter = social;
        this.auth.updateProfiles(this.profiles);
      } else {
        delete profile.twitter;
        this.auth.updateProfiles(this.profiles);
      }
    } else {
      if(profile.phone == null || profile.phone == undefined){
        profile.phone = social;
        this.auth.updateProfiles(this.profiles);
      } else {
        delete profile.phone;
        this.auth.updateProfiles(this.profiles);
      }
    }
    //this.profiles[indexParent].socials[index].IsActive = !this.profiles[indexParent].socials[index].IsActive;

    // if (social.IsActive == true){
    //   social.IsActive = false;
    // } else {
    //   social.IsActive = true;
    // }
    // console.log(this.profiles);
  }


  setSocialButtonClass(profile,social){
    if(social.name == 'instagram' &&  profile.instagram != undefined){   
      return "social-enabled";
    }  else if (social.name == 'linkedin' &&  profile.linkedin != undefined) {
      return "social-enabled";
    } else if (social.name == 'twitter' &&  profile.twitter != undefined) {
      return "social-enabled";
    } else if (social.name == 'phone' &&  profile.phone != undefined){
      return "social-enabled";
    }
    return "social-disabled";
  }

}
