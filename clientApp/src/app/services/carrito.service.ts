import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CarritoService {
  productos: any = [];
  montoTotal: number = 0;
  restaurant: any;
  constructor() {}

  getItems() {}

  addItem(item, qty) {
    let montoSubtotal = qty * item.price;
    let productExist = false;
    if (this.productos) {
      this.productos.forEach(producto => {
        if (producto.producto.key == item.key) {
          producto.qty += qty;
          producto.subtotal += montoSubtotal;
          productExist = true;
          return;
        }
      });
    }
    if (!productExist) {
      let aux = {
        producto: item,
        qty: qty,
        subtotal: montoSubtotal
      };
      this.productos.push(aux);
    }
    this.calcularTotal();
  }

  removeItem(item) {
    console.log(item);
    this.productos.forEach((aux, i) => {
      if (aux.producto.key == item.producto.key) {
        this.productos.splice(i, 1);
      }
    });
    this.calcularTotal();
  }

  setRestaurant(restaurant) {
    this.restaurant = restaurant;
    this.resetCart();
  }

  resetCart() {
    this.productos = [];
    this.montoTotal = 0;
  }

  calcularTotal() {
    this.montoTotal = 0;
    this.productos.forEach(aux => {
      this.montoTotal += aux.subtotal;
    });
  }
}
