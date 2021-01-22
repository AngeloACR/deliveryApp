import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-lista-categorias",
  templateUrl: "./lista-categorias.component.html",
  styleUrls: ["./lista-categorias.component.scss"]
})
export class ListaCategoriasComponent implements OnInit {
  @Input()
  categorias: any[];

  @Output()
  edit = new EventEmitter<any>();

  @Output()
  delete = new EventEmitter<any>();

  @Output()
  verProductos = new EventEmitter<any>();

  @Output()
  volver = new EventEmitter<any>();

  categoriasLength: any;

  constructor() {}

  ngOnInit() {
    console.log("Opening restaurants list");
    if (this.categorias) {
      this.categoriasLength = this.categorias.length;
      console.log(this.categorias.length);
    }
  }

  editar(event, restaurant) {
    this.edit.emit(restaurant.key);
  }

  borrar(event, categoria) {
    this.delete.emit(categoria.key);
  }

  productos(event, categoria) {
    this.verProductos.emit(categoria.key);
  }

  volverRestaurantes() {
    this.volver.emit();
  }
}
