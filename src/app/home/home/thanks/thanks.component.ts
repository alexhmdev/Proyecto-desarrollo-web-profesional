import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() venta: any;
  ngOnInit(): void {
  }

  home(){
    this.router.navigate(['/home/products'])
  }
}
