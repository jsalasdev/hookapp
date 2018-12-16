import { Headers, Http, RequestOptions} from '@angular/http';
import { ENDPOINT } from '../../assets/tempconf/conf';
import {Storage} from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Local } from '../../models/local';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class LocalProvider {
    
    token:string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TG9naW4iOnRydWUsInVzZXJUeXBlIjoiVFlQRV9TT0NJQUwiLCJzdGF0ZSI6dHJ1ZSwiaG9va2FoQ291bnRlciI6MCwiZmF2b3JpdGVMb2NhbHMiOltdLCJfaWQiOiI1YzBlYzM2MDIyZDI0MTRhZDg3OTcwMTgiLCJmaXJzdE5hbWUiOiJKZXPDunMiLCJsYXN0TmFtZSI6IlNhbGFzIiwicGljdHVyZSI6Imh0dHBzOi8vcGxhdGZvcm0tbG9va2FzaWRlLmZic2J4LmNvbS9wbGF0Zm9ybS9wcm9maWxlcGljLz9hc2lkPTgwMjkwOTAxNjcyMTMzOCZoZWlnaHQ9MTAwJndpZHRoPTEwMCZleHQ9MTU0NzA2MzM5MSZoYXNoPUFlUlNxZzF0YkhUUmY1U0MiLCJwcm92aWRlcklkIjoiODAyOTA5MDE2NzIxMzM4IiwicHJvdmlkZXIiOiJmYWNlYm9vayIsIl9fdiI6MH0sImlhdCI6MTU0NDg3NjIwMSwiZXhwIjoxNTQ1MDQ5MDAxfQ.YM25X1hhiy3r4p5bO83dKdmnD9KMrrdJKt9jA4D1gfI';
    
    constructor(private storage: Storage, private http:Http){
    }
    
    addLocal(local:Local): Observable<Local>{
        let url = `${ENDPOINT}/locals`;
        let session = JSON.parse(localStorage.getItem("session"));
        // this.token = session.token;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', this.token);
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
        this.token = session.token;
        let headers = new Headers();
        headers.append('token', this.token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options)
        .map(res => {
            return res.json()['locals'];
        })
        .catch(this.handleError);
    }
    
    getFavoriteLocals(): Observable<Local[]>{
        let url = `${ENDPOINT}/users/favorite-locals`;
        let session = JSON.parse(localStorage.getItem("session"));
        this.token = session.token;
        let headers = new Headers();
        headers.append('token', this.token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options)
        .map(res => {
            console.log(res.json());
            return res.json()['user'].favoriteLocals;
        })
        .catch(this.handleError);
    }
    
    deleteLocal(local: Local): Observable<Local> {
        let url = `${ENDPOINT}/locals/${local._id}`;
        let session = JSON.parse(localStorage.getItem("session"));
        this.token = session.token;
        let headers = new Headers();
        headers.append('token', this.token);
        let options = new RequestOptions({headers: headers});

        return this.http.delete(url, options)
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