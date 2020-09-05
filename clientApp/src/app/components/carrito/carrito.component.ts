import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { CarritoService } from "../../services/carrito.service";
@Component({
  selector: "app-carrito",
  templateUrl: "./carrito.component.html",
  styleUrls: ["./carrito.component.scss"]
})
export class CarritoComponent implements OnInit {
  @Output()
  selectDestino = new EventEmitter<any>();
  @Output()
  completarPedido = new EventEmitter<any>();
  qtys: any;
  productos: any;
  productosLength: any;

  montoTotal: any;

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.qtys = [];
    this.productos = this.carritoService.productos;
    this.montoTotal = this.carritoService.montoTotal;
    console.log(this.montoTotal);
    if (this.productos) {
      this.productos.forEach(producto => {
        this.qtys.push(producto.qty);
      });
      this.productosLength = this.productos.length;
      console.log(this.productos);
    }
  }

  actualizar(event, index) {
    console.log(`Initial qty: ${this.productos[index].qty}`);
    let price = this.productos[index].producto.price;
    let subtotal = this.qtys[index] * price;
    this.productos[index].qty = this.qtys[index];
    this.productos[index].subtotal = subtotal;
    this.carritoService.calcularTotal();
    this.montoTotal = this.carritoService.montoTotal;
  }

  eliminar(event, item) {
    this.carritoService.removeItem(item);
    this.ngOnInit();
  }

  destino() {
    this.selectDestino.emit();
  }

  completar() {
    this.completarPedido.emit();
  }
}
