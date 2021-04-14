import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class CarritoService {
  url = `${environment.url}/cart/add_item`;
  urlB = `${environment.url}/cart/get_details`;
  urlC = `${environment.url}/cart/remove_all`;
  urlD = `${environment.url}/cart/update_item`;
  urlE = `${environment.url}/cart/remove_item`;
  urlF = `${environment.url}/order/get_orders`;
  urlG = `${environment.url}/order/create`;


  constructor(private http: HttpClient) { }

  postCart(body: any) {
    return this.http.post(this.url, body).toPromise();
  }

  postDetails(session_id: any) {
    return this.http.post(this.urlB, session_id).toPromise();
  }

  deleteAll(body: any) {
    return this.http.request('delete',this.urlC, {body}).toPromise();
  }

  putCart(body: any) {
    return this.http.put(this.urlD, body).toPromise();
  }

  deleteCart(body: any) {
    return this.http.request('delete',this.urlE, {body}).toPromise();
  }

  getOrders(session_id: any){
    return this.http.post(this.urlF, session_id).toPromise();
  }
  createOrder(body: any){
    return this.http.post(this.urlG, body).toPromise();
  }

}
