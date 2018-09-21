/* Angular */
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { AuthProvider } from '../providers/auth/auth'
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';

@Injectable()
export class UserService {

    token = "";
    lstSocials = [];

    constructor(private http: HTTP, private auth : AuthProvider){

        this.auth.getInstagram().subscribe((result : any) => {
    
            var contains = this.lstSocials.findIndex(e => e.icon === 'logo-instagram');
            if(result != undefined && result != null && contains == -1){
                result.icon = 'logo-instagram';
                result.name = 'instagram';
                this.lstSocials.push(result);
            }
          }, error => {
            console.log(error);
          });
      
          this.auth.getTwitter().subscribe((result : any) => {
            var contains = this.lstSocials.findIndex(e => e.icon === 'logo-twitter');
   
            if(result != undefined && result != null && contains == -1){
                result.icon = 'logo-twitter'
                result.name = 'twitter';
                this.lstSocials.push(result);
            }
          }, error => {
            console.log(error);
          });
      
          this.auth.getLinkedin().subscribe((result : any) => {
            var contains = this.lstSocials.findIndex(e => e.icon === 'logo-linkedin');
        
            if(result != undefined && result != null && contains == -1){
                result.icon = 'logo-linkedin';
                result.name = 'linkedin';
                this.lstSocials.push(result);
            }
          }, error => {
            console.log(error);
          });


        this.lstSocials.push({icon:'call', name : 'phone'});
    }


    getInstagramUserInfo(token){
        console.log(token);
        return this.http.get('https://api.instagram.com/v1/users/self/?access_token=' + token, null,null);
    }

    pushLst(item){
        var contains = this.lstSocials.findIndex(e => e.icon === item.icon);
        if (contains == -1){
            
            this.lstSocials.push(item);
        }
    }

    spliceLst(item){
        this.lstSocials.splice(this.lstSocials.findIndex(e => e.icon === item),1);
    }
}