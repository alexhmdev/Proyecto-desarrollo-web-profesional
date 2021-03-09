import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  url = `${environment.url}/catalogs/items/by_text/`;

  constructor(private http: HttpClient) {}

  getProducts(licencia?: string) {
    if (licencia == undefined) {
      console.log("sin filtro");
      return this.http.get(this.url).toPromise();
    } else {
      console.log("con filtro");
      return this.http.get(this.url + licencia).toPromise();
    }
  }
}
