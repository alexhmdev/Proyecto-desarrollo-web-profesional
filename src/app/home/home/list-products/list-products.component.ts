import { Component, OnInit } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { ActivatedRoute } from "@angular/router";
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
    private category: CategoriaService,
    private routerLink: ActivatedRoute
    ) {
    this.searchItem = this.routerLink.snapshot.queryParamMap.get("termino")
    
    }

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

  getProducts(termino?: any) {
    console.log(termino, this.searchItem);
    if(termino == '') this.searchItem = ''
      this.product
        .getProducts(termino ? termino :  this.searchItem ? this.searchItem : '')
        .then((resp: any) => {
          this.task.subtasks.forEach((element, index) => {
            element.completed = false;
          });
          if (!resp.data) {
            console.log("no hay mas datos");
            this.products = []
          }
          // console.log(resp);
          this.products = resp.data.items;
        })
        .catch((err: any) => {
          console.error(err);
        });
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
