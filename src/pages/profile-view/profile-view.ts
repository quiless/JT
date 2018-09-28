import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import 'rxjs/add/operator/map';
/**
 * Generated class for the ProfileViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-view',
  templateUrl: 'profile-view.html',
})
export class ProfileViewPage {
  entity:any;
  constructor(public navCtrl: NavController, 
    public userProvider:UserProvider,
    public navParams: NavParams) {
      console.log(navParams.data);
   
    this.entity ={...navParams.data.user};

    this.userProvider.getUserProfile(navParams.data.user.key,navParams.data.profile.uid).then((data)=>{
      this.entity.profile={ ...data[0] };
      console.log(this.entity);
    },(error)=>{
      console.log("error");
    });
    //this.entity={};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileViewPage');
  }

}
