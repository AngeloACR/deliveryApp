import { Injectable } from "@angular/core";
import { AngularFireFunctions } from "@angular/fire/functions";

@Injectable({
  providedIn: "root"
})
export class PushService {
  constructor(private functions: AngularFireFunctions) {}

  pushCrearCarrera(carrera) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushCrearCarrera");

    // Create an Observable and pass any data you want to the function
    const obs = push({ carrera: carrera });

    obs.subscribe(async res => {});
  }
  pushCrearPedido(pedido) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushCrearPedido");

    // Create an Observable and pass any data you want to the function
    const obs = push({ pedido: pedido });

    obs.subscribe(async res => {});
  }
  pushCancelarCarrera(carrera) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushCancelarCarrera");

    // Create an Observable and pass any data you want to the function
    const obs = push({ carrera: carrera });

    obs.subscribe(async res => {});
  }
  pushCancelarPedido(pedido) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushCancelarPedido");

    // Create an Observable and pass any data you want to the function
    const obs = push({ pedido: pedido });

    obs.subscribe(async res => {});
  }
  pushCarreraPagada(carrera) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushCarreraPagada");

    // Create an Observable and pass any data you want to the function
    const obs = push({ carrera: carrera });

    obs.subscribe(async res => {});
  }
  pushPedidoPagado(pedido) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushPedidoPagado");

    // Create an Observable and pass any data you want to the function
    const obs = push({ pedido: pedido });

    obs.subscribe(async res => {});
  }
}
