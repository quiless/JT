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


  profiles : any = [];
  // profiles : any = [
  //     { ProfileName : "Social", socials: [ {IsActive : false, icon : "logo-linkedin"}, 
  //     {IsActive : false, icon : "logo-twitter"}]},
  //     { ProfileName : "Business", socials: [{IsActive : false, icon : "logo-linkedin"}, 
  //     {IsActive : false, icon : "logo-twitter"}]}
  // ]


  constructor(private alertController : AlertController, public navCtrl: NavController, private userService : UserService, private events : Events) {
    events.subscribe('updateSocials', (json) =>{
      console.log(json);
      this.profiles.forEach((profile)=> {
        console.log(profile);
        console.log("TA DANDO PUSH");
        profile.socials.push(json);
      })
    });

    events.subscribe('removeSocials', (data) =>{
      this.profiles.forEach((profile)=> {
        profile.socials.splice(profile.socials.findIndex(e => e.icon === data.social),1);
      })
    });
  }

  ionViewDidLoad(){
  }

  createQRCode(profile){
    console.log("clicou");
    if(profile.value == ""){
      profile.value = "aaaaa";
    } else {
      profile.value =    "";
    }
    console.log(profile);
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
            this.profiles.push({elementType: 'url', value : '', ProfileName : data.name, socials : this.userService.lstSocials.map(x => Object.assign({}, x))})
          }
        }]
    });
    alert.present();
  }

  deleteProfile(profile, index){
    console.log("chamou delete");
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
              
              this.profiles.splice(index);
            }
          }
        ]
      });
      alert.setMessage("Deseja excluir o perfil?");
      alert.present();

  }

  changeStatus(social, index, indexParent){
    this.profiles[indexParent].socials[index].IsActive = !this.profiles[indexParent].socials[index].IsActive;
    console.log(this.profiles);
    // if (social.IsActive == true){
    //   social.IsActive = false;
    // } else {
    //   social.IsActive = true;
    // }
    // console.log(this.profiles);
  }

}
