import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from "ngx-paypal";

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  totalPrice: string;
  sessionDecrypted: any;
  private _productoService: any;
  datosCompra: any;
  compraExitosa: boolean;
  mostrarPago: boolean;
  
  constructor() { }

  ngOnInit(): void {
    this.initConfig()
  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: 'Adt8PG7veb1bas7VKF9tjadhw430t-LfRj96vXehx9a0W8lKGe5r4mR2lM9knIcaL7miRvkyZGSIIQ3V',
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
          session_id: this.sessionDecrypted,
          paypal_payment_details: data
        }
        this._productoService.registrarCompra(json).then((res: any) => {

          if (res.status == "error") {
          console.log(res);
          }
          if (res.status == "success") {

            this.datosCompra = res.original_request.paypal_payment_details;
            this.compraExitosa = true;
            this.mostrarPago = false;
            //obtener carrito
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
