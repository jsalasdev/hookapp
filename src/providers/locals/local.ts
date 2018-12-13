import { Headers, Http, RequestOptions} from '@angular/http';
import { ENDPOINT } from '../../assets/tempconf/conf';
import {Storage} from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Local } from '../../models/local';

@Injectable()
export class LocalProvider {
    
    constructor(private storage: Storage, private http:Http){
    }
    
    addLocal(local:Local){
            return this.storage.get('session').then(resp =>{
                let url = `${ENDPOINT}/locals`;
                
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TG9naW4iOnRydWUsInVzZXJUeXBlIjoiVFlQRV9TT0NJQUwiLCJzdGF0ZSI6dHJ1ZSwiaG9va2FoQ291bnRlciI6MCwiZmF2b3JpdGVMb2NhbHMiOltdLCJfaWQiOiI1YzBlYzM2MDIyZDI0MTRhZDg3OTcwMTgiLCJmaXJzdE5hbWUiOiJKZXPDunMiLCJsYXN0TmFtZSI6IlNhbGFzIiwicGljdHVyZSI6Imh0dHBzOi8vcGxhdGZvcm0tbG9va2FzaWRlLmZic2J4LmNvbS9wbGF0Zm9ybS9wcm9maWxlcGljLz9hc2lkPTgwMjkwOTAxNjcyMTMzOCZoZWlnaHQ9MTAwJndpZHRoPTEwMCZleHQ9MTU0NzA2MzM5MSZoYXNoPUFlUlNxZzF0YkhUUmY1U0MiLCJwcm92aWRlcklkIjoiODAyOTA5MDE2NzIxMzM4IiwicHJvdmlkZXIiOiJmYWNlYm9vayIsIl9fdiI6MH0sImlhdCI6MTU0NDcyNDM1MSwiZXhwIjoxNTQ0ODk3MTUxfQ.GSwm0BnYnftevdqDDvyCqUbKXzuRhRWcjSIA73wQGEU');
                let options = new RequestOptions({headers: headers});
                return this.http.post(url, local, options)
                .toPromise();
            });
        
    }
    
}