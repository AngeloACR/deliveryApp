import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-lista-productos",
  templateUrl: "./lista-productos.component.html",
  styleUrls: ["./lista-productos.component.scss"]
})
export class ListaProductosComponent implements OnInit {
  @Input()
  productos: any[];

  @Output()
  edit = new EventEmitter<any>();

  @Output()
  delete = new EventEmitter<any>();

  @Output()
  volver = new EventEmitter<any>();

  productosLength: any;

  constructor() {}

  ngOnInit() {
    console.log("Opening restaurants list");
    if (this.productos) {
      this.productosLength = this.productos.length;
      console.log(this.productos.length);
    }
  }

  editar(event, restaurant) {
    this.edit.emit(restaurant.key);
  }

  borrar(event, producto) {
    this.delete.emit(producto.key);
  }

  volverCategorias() {
    this.volver.emit();
  }
}
