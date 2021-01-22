import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CommonService } from "../../services/common.service";

@Component({
  selector: "app-lista-restaurant",
  templateUrl: "./lista-restaurant.component.html",
  styleUrls: ["./lista-restaurant.component.scss"]
})
export class ListaRestaurantComponent implements OnInit {
  @Input()
  restaurantes: any[];

  @Output()
  edit = new EventEmitter<any>();

  @Output()
  delete = new EventEmitter<any>();

  @Output()
  verCategorias = new EventEmitter<any>();

  @Output()
  volver = new EventEmitter<any>();

  restaurantesLength: any;

  constructor(private common: CommonService) {}

  ngOnInit() {
    console.log("Opening restaurants list");
    if (this.restaurantes) {
      this.restaurantesLength = this.restaurantes.length;
    }
  }

  editar(event, restaurant) {
    this.edit.emit(restaurant.key);
  }

  borrar(event, restaurant) {
    this.delete.emit(restaurant.key);
  }

  categorias(event, restaurant) {
    console.log(restaurant);
    this.verCategorias.emit(restaurant);
  }
}
