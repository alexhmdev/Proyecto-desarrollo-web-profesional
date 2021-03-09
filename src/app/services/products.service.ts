import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  url = `${environment.url}/catalogs/items/by_text/`;
  urlB = `${environment.url}/catalogs/items/by_category/`;

  constructor(private http: HttpClient) {}

  getProducts(licencia) {
    // if (licencia == undefined) {
    //   console.log("sin filtro");
    //   return this.http.get(this.url).toPromise();
    // } else {

    // }

    return this.http.get(this.url + licencia).toPromise();
  }

  getProductsByCategory(categories: Array<any>) {
    let categorias = categories.toString();
    console.log(categorias.replace(/,/g, ";"));
    return this.http.get(this.urlB + categorias.replace(/,/g, ";")).toPromise();
  }
}
