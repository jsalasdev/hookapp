import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import { ENDPOINT } from '../../assets/tempconf/conf';
import {Storage} from '@ionic/storage';
import { Local } from '../../models/local';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { TobaccoBrand } from '../../models/tobaccobrand';
import { Tobacco } from '../../models/tobacco';
import { DEV_TOKEN } from '../../assets/tempconf/conf';

@Injectable()
export class TobaccoProvider{
        
    constructor(private storage: Storage, private http:Http){
    }

    getTobaccosFromBrand(id): Observable<Tobacco[]>{
        let url = `${ENDPOINT}/tobaccos/brands`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let headers = new Headers();
        headers.append('token', token);
        let params = new URLSearchParams();
        params.append("id", id);
        let options = new RequestOptions({headers: headers});
        options.params = params;
        return this.http.get(url, options)
        .map(res => {
            return res.json()['brands']['tobaccos'];
        })
        .catch(this.handleError);
    }

    getBrands(): Observable<TobaccoBrand[]>{
        let url = `${ENDPOINT}/tobaccos/brands`;
        let session = JSON.parse(localStorage.getItem("session"));
        let token = session?session.token:DEV_TOKEN;
        let headers = new Headers();
        headers.append('token', token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options)
        .map(res => {
            return res.json()['brands'];
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