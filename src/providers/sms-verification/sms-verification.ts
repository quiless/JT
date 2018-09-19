import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the SmsVerificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SmsVerificationProvider {

  header = new Headers();
  options = new RequestOptions();
  constructor(public http: Http) {
    this.header.append('Access-Control-Allow-Origin' , '*');
    this.header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    this.header.append('Accept','application/json');
    this.header.append('content-type','application/json');
    this.options = new RequestOptions({
      headers: this.header
    });
  }

  sendSmsVerification(phonenumber:string,countrycode:string){
    let obj = {
      "phonenumber":phonenumber,
      "countrycode":countrycode
    };
    return new Promise((resolve, reject) => {
      this.http.post("https://us-central1-justtap-8e195.cloudfunctions.net/sendSmsVerification",JSON.stringify(obj),this.options)
      .toPromise()
      .then((response) =>
      {
        resolve(response.json());
      })
      .catch((error) =>
      {
        reject(error.json());
      });
    });
    
    
  }

  checkSmsVerification(phonenumber:string,countrycode:string,code:string){
    let obj = {
      "phonenumber":phonenumber,
      "countrycode":countrycode,
      "verification_code":code
    };

    return new Promise((resolve, reject) => {
      this.http.post("https://us-central1-justtap-8e195.cloudfunctions.net/checkSmsVerification",JSON.stringify(obj),this.options)
      .toPromise()
      .then((response) =>
      {
        resolve(response.json());
      })
      .catch((error) =>
      {
        reject(error.json());
      });
    });
  }
}
