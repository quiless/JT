import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UserService } from '../../services/userService'
import { Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
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
      }
    }, error => {
      console.log(error);
    });

    this.socials = this.userService.lstSocials;
    console.log(this.socials, "SOCIALS");
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
            this.profiles.push({elementType: 'url', value : '', ProfileName : data.name, socials : {}});
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


  setIconStyle(profile,social){
    var style;
    if(social.name == 'instagram'){   
      style = {'color' : profile.instagram == undefined ? '' : '#0077B5'};
    }  else if (social.name == 'linkedin') {
      style = {'color' : profile.linkedin == undefined ? '' : '#0077B5'};
    } else if (social.name == 'twitter') {
      style = {'color' : profile.twitter == undefined ? '' : '#0077B5'};
    } else if (social.name == 'phone'){
      style = {'color' : profile.phone == undefined ? '' : '#0077B5'};
    }
    return style;
  }

}
