import { Component, OnInit } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { CarritoService } from "src/app/services/carrito.service";
import { CategoriaService } from "src/app/services/categories.service";
import { ProductsService } from "src/app/services/products.service";

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  idProduct: any;
  productDetail: any;
  itemQuantity: number = 1;
  constructor(
    private carrito: CarritoService,
    private product: ProductsService,
    private routerLink: ActivatedRoute,
    private router: Router,
    private cookie: CookieService
  ) {
    this.idProduct = this.routerLink.snapshot.queryParamMap.get("idProducto");

    console.info(this.idProduct);
  }

  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto() {
    this.product
      .getProductsDetails(this.idProduct)
      .then((resp: any) => {
        console.log(resp);
        this.productDetail = resp.data.items[0];
      })
      .catch((err: any) => {});
  }
  agregarCarrito() {
    if (localStorage.getItem("user_data")) {
      let user_data = JSON.parse(localStorage.getItem("user_data"));
      console.log(user_data);
      let body = {
        session_id: user_data.session_id,
        item_id: this.idProduct,
        item_quantity: this.itemQuantity,
      };
      console.info(body);
      this.carrito
        .postCart(body)
        .then((resp: any) => {
          console.warn(resp);
          this.router.navigateByUrl("home/products");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      this.cookie.set(
        "ruta",
        `/home/product?idProducto=${(this, this.idProduct)}`
      );
      this.router.navigateByUrl("register");
    }
  }
}
