import { Injectable } from "@angular/core";
import { AngularFireFunctions } from "@angular/fire/functions";

@Injectable({
  providedIn: "root"
})
export class PushService {
  constructor(private functions: AngularFireFunctions) {}

  pushAceptarCarrera(carrera) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushAceptarCarrera");

    // Create an Observable and pass any data you want to the function
    const obs = push({ carrera: carrera });

    obs.subscribe(async res => {});
  }
  pushAceptarDelivery(pedido) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushAceptarDelivery");

    // Create an Observable and pass any data you want to the function
    const obs = push({ pedido: pedido });

    obs.subscribe(async res => {});
  }
  pushRechazarCarrera(carrera) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushRechazarCarrera");

    // Create an Observable and pass any data you want to the function
    const obs = push({ carrera: carrera });

    obs.subscribe(async res => {});
  }
  pushRechazarDelivery(pedido) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushRechazarDelivery");

    // Create an Observable and pass any data you want to the function
    const obs = push({ pedido: pedido });

    obs.subscribe(async res => {});
  }
  pushDeliveryEnDestino(pedido) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushDeliveryEnDestino");

    // Create an Observable and pass any data you want to the function
    const obs = push({ pedido: pedido });

    obs.subscribe(async res => {});
  }
  pushDeliveryEnOrigen(pedido) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushDeliveryEnOrigen");

    // Create an Observable and pass any data you want to the function
    const obs = push({ pedido: pedido });

    obs.subscribe(async res => {});
  }
  pushConductorEnDestino(carrera) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushConductorEnDestino");

    // Create an Observable and pass any data you want to the function
    const obs = push({ carrera: carrera });

    obs.subscribe(async res => {});
  }
  pushConductorEnOrigen(carrera) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushConductorEnOrigen");

    // Create an Observable and pass any data you want to the function
    const obs = push({ carrera: carrera });

    obs.subscribe(async res => {});
  }
  pushDeliveryEnCamino(pedido) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushDeliveryEnCamino");

    // Create an Observable and pass any data you want to the function
    const obs = push({ pedido: pedido });

    obs.subscribe(async res => {});
  }
  pushConductorEnCamino(carrera) {
    // Use the function name from Firebase
    let push = this.functions.httpsCallable("pushConductorEnCamino");

    // Create an Observable and pass any data you want to the function
    const obs = push({ carrera: carrera });

    obs.subscribe(async res => {});
  }
}
