import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  sessionId: any;
  ordenes: any;
  ordenesContados: any = 0;

  constructor(private _productoService: CarritoService) { }

  ngOnInit(): void {
    if (localStorage.getItem("user_data")) {
      let data = JSON.parse(localStorage.getItem("user_data"));
      console.log(data);
      this.sessionId = data.session_id;
    }
    this.obtenerOrdenes();
  }


  obtenerOrdenes() {
    console.log(this.sessionId)
    this._productoService.getOrders({session_id: this.sessionId}).then((res: any) => {
      if (res.status == "error") {
        console.error(res);
      } else {
        this.ordenes = res.data.orders;
        this.ordenesContados = res.data.orders.length;

        console.log(this.ordenesContados)
      }

    }).catch((err: any) => {
      console.log(err
      )
    })
  }
}
