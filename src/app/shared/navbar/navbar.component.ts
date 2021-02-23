import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name: any;

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("user_data")){

      let data = JSON.parse(localStorage.getItem("user_data"));
      console.log(data);
      
      this.name = data.customer.first_name;
    }
  }

}
