import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';


@Component({
  selector: 'app-car-crud',
  templateUrl: './car-crud.component.html',
  styleUrls: ['./car-crud.component.css']
})
export class CarCrudComponent implements OnInit {
  @ViewChild("menuTrigger") menuTrigger: MatMenuTrigger;
  searchItem: string = "";
  products = [];
  details: any;
  sessionId: any;
  getCarNav = false;
  constructor(
    private carrito: CarritoService,
    private dialog: MatDialog,
    private router: Router
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
      this.getCarNav = true;
      setTimeout(() => {
        this.getCarNav = false;
      }, 500);
    }).catch((err: any) => {
      console.error(err);
    });
  }

  misPedidos(){
    this.router.navigate(['/home/pedido'])
  }

  async deleteProduct(itemId: any) {
      const dialogRef = this.dialog.open(DialogConfirmMenu, {
        restoreFocus: false,
      });
  
      // Manually restore focus to the menu trigger since the element that
      // opens the dialog won't be in the DOM any more when the dialog closes.
      dialogRef.afterClosed().subscribe(result => {
        if(result == true){
          const body =  {
            session_id: this.sessionId,
            item_id: itemId == null ? 1 : itemId,
          };
          console.log(body);
           this.carrito.deleteCart(body).then((resp: any) => {
            console.info(resp);
            this.getCart(this.sessionId);
            this.getCarNav = true;
            setTimeout(() => {
              this.getCarNav = false;
            }, 500);
          }).catch((err: any) => {
            console.error(err);
          });
        }
      });
   
  }

  clearCart(){
    const dialogRef = this.dialog.open(DialogConfirmMenu, {
        restoreFocus: false,
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result == true){
          this.carrito.deleteAll({session_id: this.sessionId}).then((resp: any) => {
            console.log(resp);
            this.getCart(this.sessionId);
            this.getCarNav = true;
            setTimeout(() => {
              this.getCarNav = false;
            }, 500);
    }).catch((err: any) => {
      console.error(err);
      
    });
        }
      });
   
  }

}
@Component({
  selector: "dialog-from-menu-dialog",
  templateUrl: "dialog-confirm-logout.html",
})
export class DialogConfirmMenu {
  constructor(private router: Router) {}
  confirm(){
    return true
  }
}
