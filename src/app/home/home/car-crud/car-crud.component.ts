import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { CategoriaService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-car-crud',
  templateUrl: './car-crud.component.html',
  styleUrls: ['./car-crud.component.css']
})
export class CarCrudComponent implements OnInit {
  searchItem: string = "";
  products = [];
  details: any;
  sessionId: any;

  constructor(
    private product: ProductsService,
    private category: CategoriaService,
    private carrito: CarritoService,

  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("user_data")) {
      let data = JSON.parse(localStorage.getItem("user_data"));
      console.log(data);
      this.sessionId = data.session_id;
      this.getCart(this.sessionId);
    }
  }

  getCart(sessionId: any) {
    this.carrito.postDetails({ session_id: sessionId }).then((resp: any) => {
      console.log(resp);

      this.details = resp.data;
    }).catch((err) => {
      console.error(err);
    })
  }

  async updateQuantity(quantity: number, itemId: any) {
    const body = await {
      session_id: this.sessionId,
      item_id: itemId == null ? 1 : itemId,
      item_quantity: quantity
    };
    console.log(body);
    await this.carrito.putCart(body).then((resp: any) => {
      console.info(resp);
      this.getCart(this.sessionId);
    }).catch((err: any) => {
      console.error(err);
    });
  }

  async deleteProduct(itemId: any) {
    const body = await {
      session_id: this.sessionId,
      item_id: itemId == null ? 1 : itemId,
    };
    console.log(body);
    await this.carrito.deleteCart(body).then((resp: any) => {
      console.info(resp);
      this.getCart(this.sessionId);
    }).catch((err: any) => {
      console.error(err);
    });
  }

}
