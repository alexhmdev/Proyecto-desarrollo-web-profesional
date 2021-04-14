import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { CarritoService } from "src/app/services/carrito.service";
import { NavbarService } from "src/app/services/navbar.service";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  
  @ViewChild("menuTrigger") menuTrigger: MatMenuTrigger;
  @Input() set  getCart(value){
    if(value){
      this.ngOnInit()
    }
  }
  @Output() salida = new EventEmitter()
  showFiller = false;
  value:any
  name: any;
  cartItems: number = 0;
  constructor(
    private router: Router,
    private routerLink: ActivatedRoute,
    private dialog: MatDialog,
    private carrito: CarritoService,
    private navService: NavbarService
  ) {
    this.value = this.routerLink.snapshot.queryParamMap.get("termino") ? this.routerLink.snapshot.queryParamMap.get("termino") : '';
  }

  ngOnInit(): void {
    if (localStorage.getItem("user_data")) {
      let data = JSON.parse(localStorage.getItem("user_data"));
      console.log(data);

      this.name = data.customer.first_name;
      this.carrito
        .postDetails({ session_id: data.session_id })
        .then((resp: any) => {
          console.log(resp);
          this.cartItems = resp.data.items_quantity;
        });
    } else {
      this.name = "Log in";
    }
  }
  home(){
    this.router.navigate(['/home/products'])
  }
  checkSession() {
    if (!localStorage.getItem("user_data")) {
      this.name = "Log in";
    }
  }

  deleteCart() {
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    console.log(user_data.session_id);
    this.carrito.deleteAll({ session_id: user_data.session_id });
  }

  clearSearch(){
    this.value = '';
    if(this.router.url === '/home/products' || this.router.url.substring(0,14) === "/home/products"){
    this.searchItem({"key": "Enter"})
    } 
  }
  searchItem(event: any){
    
    if (event.key === "Enter") {
      if(this.router.url === '/home/products' || this.router.url.substring(0,14) === "/home/products"){
        this.salida.emit(this.value)
      } 
      else {this.router.navigate(['/home/products'], {queryParams: {termino: this.value}})}
    } else if(event === "Search") {
      this.salida.emit(this.value)
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogConfirmMenu, {
      restoreFocus: false,
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }
}

@Component({
  selector: "dialog-from-menu-dialog",
  templateUrl: "dialog-confirm-logout.html",
})
export class DialogConfirmMenu {
  constructor(private router: Router) {}
  logOut() {
    localStorage.clear();
    location.replace("/home/products");
  }
}
