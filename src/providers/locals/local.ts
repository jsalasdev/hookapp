import { Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import { ENDPOINT, DEV_TOKEN } from '../../assets/tempconf/conf';
import {Storage} from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Local } from '../../models/local';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { LocalFollow } from '../../models/localfollow';
import { LocalReview } from '../../models/localreview';

@Injectable()
export class LocalProvider {
    
    constructor(private storage: Storage, private http:Http){
    }
    
    getLocalById(id):Observable<Local>{
        let url = `${ENDPOINT}/locals/${id}`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let headers = new Headers();
        headers.append('token', token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options)
        .map(res => {
            return res.json()['local'];
        })
        .catch(this.handleError);
    }
    
    getLocalsByLocation(longitude, latitude, radius): Observable<Local[]>{
        let url = `${ENDPOINT}/locals/locations`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let headers = new Headers();
        headers.append('token', token);
        let params = new URLSearchParams();
        params.append("latitude", latitude);
        params.append("longitude", longitude);
        params.append("radius", radius);
        let options = new RequestOptions({headers: headers});
        options.params = params;
        return this.http.get(url, options)
        .map(res => {
            return res.json()['locals'];
        })
        .catch(this.handleError);
    }
    
    getUserInfoFromLocal(local:Local): Observable<any>{
        let url = `${ENDPOINT}/locals/${local._id}/info`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let headers = new Headers();
        headers.append('token', token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options)
        .map(res => {
            return res.json()['info'];
        })
        .catch(this.handleError);
    }
    
    postFollow(local:Local): Observable<LocalFollow>{
        let url = `${ENDPOINT}/locals/${local._id}/follow`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let headers = new Headers();
        headers.append('token', token);
        let options = new RequestOptions({headers: headers});
        return this.http.put(url, null, options)
        .map(res => {
            return res.json()['follow'];
        })
        .catch(this.handleError);
    }
    
    postReview(local:Local,rating:any): Observable<LocalReview>{
        let url = `${ENDPOINT}/locals/${local._id}/review?rating=${rating}`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let headers = new Headers();
        headers.append('token', token);
        let options = new RequestOptions({headers: headers});
        return this.http.put(url,null, options)
        .map(res => {
            return res.json()['review'];
        })
        .catch(this.handleError);
    }
    
    addLocal(local:Local): Observable<Local>{
        let url = `${ENDPOINT}/locals`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', token);
        let options = new RequestOptions({headers: headers});
        return this.http.post(url, local, options)
        .map(res => {
            return res.json()['local'];
        })
        .catch(this.handleError);
    }
    
    getMyLocals(): Observable<Local[]>{
        let url = `${ENDPOINT}/locals`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let params = new URLSearchParams();
        params.append('type', 'my-locals');
        let headers = new Headers();
        headers.append('token', token);
        let options = new RequestOptions({headers: headers});
        options.params = params;
        return this.http.get(url, options)
        .map(res => {
            return res.json()['locals'];
        })
        .catch(this.handleError);
    }

    getLatestsLocals(): Observable<Local[]>{
        let url = `${ENDPOINT}/locals`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let params = new URLSearchParams();
        params.append('type', 'latests');
        let headers = new Headers();
        headers.append('token', token);
        let options = new RequestOptions({headers: headers});
        options.params = params;
        return this.http.get(url, options)
        .map(res => {
            return res.json()['locals'];
        })
        .catch(this.handleError);
    }

    getLocalsByFollows(): Observable<any[]>{
        let url = `${ENDPOINT}/locals`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let params = new URLSearchParams();
        params.append('type', 'top-followers');
        let headers = new Headers();
        headers.append('token', token);
        let options = new RequestOptions({headers: headers});
        options.params = params;
        return this.http.get(url, options)
        .map(res => {
            return res.json()['locals'];
        })
        .catch(this.handleError);
    }
    
    getFavoriteLocals(): Observable<Local[]>{
        let url = `${ENDPOINT}/users/favorite-locals`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let headers = new Headers();
        headers.append('token', token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options)
        .map(res => {
            return res.json()['user'].favoriteLocals;
        })
        .catch(this.handleError);
    }
    
    deleteLocal(local: Local): Observable<Local> {
        let url = `${ENDPOINT}/locals/${local._id}`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let headers = new Headers();
        headers.append('token', token);
        let options = new RequestOptions({headers: headers});
        return this.http.delete(url, options)
        .catch(this.handleError);
    }
    
    updateLocal(local: Local): Observable<Local> {
        let url = `${ENDPOINT}/locals/${local._id}`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', token);
        let options = new RequestOptions({headers: headers});
        return this.http.put(url, local, options)
        .map(res => {
            return res.json()['local'];
        })
        .catch(this.handleError);
    }
    
    private handleError (error: Response | any) {
        console.log("Handle Error");
        console.log(error);
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