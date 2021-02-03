import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url = `${environment.url}/security/create_account`
  constructor(private http: HttpClient) { }


  postRegister(body: any) {
    return this.http.post(this.url, body).toPromise()
  }
}
