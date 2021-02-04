import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPassService {

  url = `${environment.url}/security/request_recovery_code`
  urlValidateCode = `${environment.url}/security/validate_recovery_code`
  urlChangePass = `${environment.url}/security/validate_recovery_code`
  constructor(private http: HttpClient) { }


  postRecovery(body: any) {
    return this.http.post(this.url, body).toPromise()
  }
  postValidateCode(body: any) {
    return this.http.post(this.urlValidateCode, body).toPromise();
  }
  postChangePass(body: any) {
    return this.http.post(this.urlChangePass, body).toPromise();
  }
}
