import { Http, URLSearchParams} from '@angular/http';
import { ENDPOINT } from '../../assets/tempconf/conf';
import {Storage} from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {
    
    constructor(private storage: Storage, private http:Http){
    }
    
    loginWithFacebook(accessToken:string){
        let body = new URLSearchParams();
        body.set('access_token', accessToken);
        let url = `${ENDPOINT}/login`;
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // let options = new RequestOptions({headers: headers});
        return this.http.post(url, body)
        .toPromise();
    }
    
}