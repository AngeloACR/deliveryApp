import { Injectable } from "@angular/core";
import { AngularFireFunctions } from "@angular/fire/functions";

@Injectable({
  providedIn: "root"
})
export class PushService {
  constructor(private functions: AngularFireFunctions) {}

  pushCrearDelivery(pedido) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushCrearDelivery");

    // Create an Observable and pass any data you want to the function
    const obs = push({ pedido: pedido });

    obs.subscribe(async res => {});
  }
  pushAceptarPedido(pedido) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushAceptarPedido");

    // Create an Observable and pass any data you want to the function
    const obs = push({ pedido: pedido });

    obs.subscribe(async res => {});
  }
  pushCancelarDelivery(pedido) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushCancelarDelivery");

    // Create an Observable and pass any data you want to the function
    const obs = push({ pedido: pedido });

    obs.subscribe(async res => {});
  }
  pushPedidoListo(pedido) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushPedidoListo");

    // Create an Observable and pass any data you want to the function
    const obs = push({ pedido: pedido });

    obs.subscribe(async res => {});
  }
  pushRechazarPedido(pedido) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushRechazarPedido");

    // Create an Observable and pass any data you want to the function
    const obs = push({ pedido: pedido });

    obs.subscribe(async res => {});
  }
  pushPedidoEnProceso(pedido) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushPedidoEnProceso");

    // Create an Observable and pass any data you want to the function
    const obs = push({ pedido: pedido });

    obs.subscribe(async res => {});
  }
}
