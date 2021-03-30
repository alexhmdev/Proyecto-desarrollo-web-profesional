import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { CategoriaService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
export class TableBasicExample {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
@Component({
  selector: 'app-car-crud',
  templateUrl: './car-crud.component.html',
  styleUrls: ['./car-crud.component.css']
})
export class CarCrudComponent implements OnInit {
  searchItem: string = "";
  task: Task = {
    name: "Indeterminate",
    completed: false,
    color: "primary",
    subtasks: [],
  };
  
  products = [];

  constructor(
    private product: ProductsService,
    private category: CategoriaService
  ) { }

  ngOnInit(): void {
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
 

}
