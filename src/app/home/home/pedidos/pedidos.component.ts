import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from "ngx-paypal";
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  totalPrice: string;
  sessionDecrypted: any;
  datosCompra: any;
  compraExitosa: boolean;
  mostrarPago: boolean = true;
  sessionId: any;
  data: any;
  getCarNav: boolean = false;
  constructor(private carrito: CarritoService) { }
  
  ngOnInit(): void {
    this.initConfig()
    if (localStorage.getItem("user_data")) {
      let data = JSON.parse(localStorage.getItem("user_data"));
      console.log(data);
      this.sessionId = data.session_id;
    }
    this.obtenerPedido()
  }
  obtenerPedido(){
    this.carrito.postDetails({session_id: this.sessionId}).then((data: any) => {
      console.log(data);
      this.data = data.data
      this.totalPrice = data.data.total
    }).catch((err: any) => {
      console.error(err);
    });
  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: 'AUYQ8sMf8j8X21eERCvCzBb6J3nuOeyd6_G3zXitlXlzWWWaXUCHuwX4wULaWF3gKlVsv0x6gD8Qe2El',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'MXN',
              value: this.totalPrice,
              breakdown: {
                item_total: {
                  currency_code: 'MXN',
                  value: this.totalPrice
                }
              }
            },
            items: [
              {
                name: 'Servicio',
                quantity: '1',
                unit_amount: {
                  currency_code: 'MXN',
                  value: this.totalPrice,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },

      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);

        let json = {
          session_id: this.sessionId,
          paypal_payment_details: data
        }
        this.carrito.createOrder(json).then((res: any) => {

          if (res.status == "error") {
          console.log(res);
          }
          if (res.status == "success") {

            this.datosCompra = res.original_request.paypal_payment_details;
            this.compraExitosa = true;
            this.mostrarPago = false;
            //obtener carrito
            this.getCarNav = true;
      setTimeout(() => {
        this.getCarNav = false;
      }, 500);
          }

        }).catch((err: any) => {
          console.log(err)
        })

      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
