import { Component, OnInit } from '@angular/core';

import {MatInputModule} from '@angular/material';
import { OrdersService } from 'src/app/services/orders.service';
import { ConsoleReporter } from 'jasmine';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  totalPedido = 0;
  pedidoTemp = [];

  productos = [
    {
      nombre: 'Papas Fritas',
      precio: 4
    },

    {
      nombre: 'Hamburguesa',
      precio: 5
    },

    {
      nombre: 'Pescado',
      precio: 7
    }

];

  nombreApp = 'Comilonas';

  constructor(private readonly servicioPedidos: OrdersService) { }

  ngOnInit() {
  }

  public agregar(unProducto: any): void {
    this.servicioPedidos.createPedido(unProducto);
    this.totalPedido = this.totalPedido + unProducto.precio;
    this.pedidoTemp.push(unProducto);
    console.log(this.totalPedido, this.pedidoTemp);
  }

  quitarArticulo(renglon: number) {
    this.pedidoTemp.splice()
  }

}
