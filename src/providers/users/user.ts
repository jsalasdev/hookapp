import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { ENDPOINT } from '../../assets/tempconf/conf';
import {Storage} from '@ionic/storage';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { DEV_TOKEN } from '../../assets/tempconf/conf';

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
    
    getUserById(id):Observable<User>{
        let url = `${ENDPOINT}/users/${id}`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let headers = new Headers();
        headers.append('token', token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options)
        .map(res => {
            return res.json()['user'];
        })
        .catch(this.handleError);
    }
    
    update(user: User): Observable<User>{
        let url = `${ENDPOINT}/users`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', token);
        let options = new RequestOptions({headers: headers});
        let data = {
            userType: user.userType
        }
        return this.http.put(url, data, options)
        .map(res => {
            return res.json()['local'];
        })
        .catch(this.handleError);
    }
    
    private handleError (error: Response | any) {
        console.log("Handle Error");
        let errMsg: string;
        if (error instanceof Response) {
            const err = error || '';
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            console.log(error.status);
            console.log(error.type);
            console.log(error.message);
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    
}