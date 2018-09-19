/* Angular */
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';


@Injectable()
export class UserService {

    token = "";
    lstSocials = [];

    constructor(private http: HTTP){
        this.lstSocials.push({icon:'call', IsActive : false});
    }


    getInstagramUserInfo(token){
        console.log(token);
        return this.http.get('https://api.instagram.com/v1/users/self/?access_token=' + token, null,null);
    }

    pushLst(item){
        this.lstSocials.push(item);
    }

    spliceLst(item){
        this.lstSocials.splice(this.lstSocials.findIndex(e => e.icon === item),1);
    }



}