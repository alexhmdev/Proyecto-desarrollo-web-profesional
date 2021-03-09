import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
    url = `${environment.url}/catalogs/categories`

  constructor( private http: HttpClient) { }

  getAll(){
    return this.http.get(`${this.url}`).toPromise();
  }

}
