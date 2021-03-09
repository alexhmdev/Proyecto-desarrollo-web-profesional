import { Component, OnInit } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { CategoriaService } from "src/app/services/categories.service";
import { ProductsService } from "src/app/services/products.service";

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: "app-list-products",
  templateUrl: "./list-products.component.html",
  styleUrls: ["./list-products.component.css"],
})
export class ListProductsComponent implements OnInit {
  options = ["comida", "bebidas", "ejemplo"];
  task: Task = {
    name: "Indeterminate",
    completed: false,
    color: "primary",
    subtasks: [],
  };
  searchItem: any;
  categories: any;
  products: any;
  categoriesFilter: any[];
  constructor(
    private product: ProductsService,
    private category: CategoriaService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.category
      .getAll()
      .then((resp: any) => {
        console.log(resp);
        resp.data.categories.forEach((element) => {
          this.task.subtasks.push({
            name: element.description,
            completed: false,
            color: "accent",
          });
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  getProducts(licencia?: any) {
    if (licencia == undefined) {
      this.product
        .getProducts()
        .then((resp: any) => {
          console.log(resp);
          this.products = resp.data.items;
        })
        .catch((err: any) => {
          console.error(err);
        });
    } else {
      this.product
        .getProducts(licencia)
        .then((resp: any) => {
          console.log(resp);
          this.products = resp.data.items;
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
  }

  getProductByCategory() {
    let arrFilter = [];
    this.task.subtasks.forEach((element, index) => {
      if (element.completed) {
        arrFilter.push(element.name);
      } else {
        arrFilter.splice(index, 1);
      }
    });
    console.info(arrFilter);
  }
}
