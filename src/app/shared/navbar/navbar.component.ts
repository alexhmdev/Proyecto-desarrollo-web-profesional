import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;  
   showFiller = false;
  name: any;

  constructor( private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem("user_data")){

      let data = JSON.parse(localStorage.getItem("user_data"));
      console.log(data);
      
      this.name = data.customer.first_name;
    } else {
      this.name = 'Log in'
    }
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/register']);
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogConfirmMenu, {restoreFocus: false});

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }
}

@Component({
  selector: 'dialog-from-menu-dialog',
  templateUrl: 'dialog-confirm-logout.html',
})
export class DialogConfirmMenu {
  constructor(private router:Router){}
  logOut(){
    localStorage.clear();
    this.router.navigate(['/register']);
  }
}