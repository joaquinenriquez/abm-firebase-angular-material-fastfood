import { FormControl, FormGroup} from '@angular/forms';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Observable} from 'rxjs' ;
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private listadoPedidos: AngularFirestoreCollection<any>;
  pedidos: Observable<any[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.listadoPedidos = afs.collection<any>('pedidos');
    this.pedidos = this.listadoPedidos.snapshotChanges().pipe(map(
      actions => actions.map (a => {
        const data = a.payload.doc.data() as any;
        const id =  a.payload.doc.id;
        return {id, ...data};
      })
    ));
  }

  formulario = new FormGroup ( {
    nombreCliente: new FormControl(''),
    numeroPedido: new FormControl(''),
    pedido: new FormControl(''),
    completado: new FormControl(false)
  });

  getPedido() {
    return this.pedidos;
  }

  updatePedido(pedido: any) {
    return this.listadoPedidos.doc(pedido.id).update(pedido);
  }

  deletePedidio(id: string) {
    return this.listadoPedidos.doc(id).delete();
  }

  public createPedido(pedido: any) {
    return this.listadoPedidos.add(pedido);
  }

}
