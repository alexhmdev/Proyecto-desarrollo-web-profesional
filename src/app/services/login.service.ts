import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = `${environment.url}/security/login`
  constructor(private http: HttpClient) { }


  postLogin(body: any) {
      console.log(body);
      
      
    return this.http.post(this.url, body).toPromise();
  }
 
}
