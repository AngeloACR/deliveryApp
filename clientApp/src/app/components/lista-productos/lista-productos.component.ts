import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CarritoService } from "../../services/carrito.service";
import { CommonService } from "../../services/common.service";
@Component({
  selector: "app-lista-productos",
  templateUrl: "./lista-productos.component.html",
  styleUrls: ["./lista-productos.component.scss"]
})
export class ListaProductosComponent implements OnInit {
  @Input()
  productos: any[];

  @Output()
  volver = new EventEmitter<any>();

  qtys: any;
  productosLength: any;

  constructor(private common: CommonService, private carrito: CarritoService) {}

  ngOnInit() {
    this.qtys = [];
    console.log("Opening restaurants list");
    if (this.productos) {
      this.productos.forEach(producto => {
        this.qtys.push(0);
      });
      this.productosLength = this.productos.length;
      console.log(this.productos.length);
    }
  }

  agregarCarrito(event, producto, qty) {
    console.log(qty);
    this.carrito.addItem(producto, qty);
  }

  volverCategorias() {
    this.volver.emit();
  }
}
