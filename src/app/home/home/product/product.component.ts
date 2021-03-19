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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  searchItem: string = "";
  options = ["comida", "bebidas", "ejemplo"];
  task: Task = {
    name: "Indeterminate",
    completed: false,
    color: "primary",
    subtasks: [],
  };
  categories: any;
  products = [];
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

  getProducts() {
    setTimeout(() => {
      this.product
        .getProducts(this.searchItem)
        .then((resp: any) => {
          if (!resp.data) {
            console.log("no hay mas datos");
          }
          // console.log(resp);
          this.products = resp.data.items;
        })
        .catch((err: any) => {
          console.error(err);
        });
    }, 100);
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
    this.product
      .getProductsByCategory(arrFilter)
      .then((resp: any) => {
        this.products = resp.data.items;
      })
      .catch((err: any) => {});
  }
}
