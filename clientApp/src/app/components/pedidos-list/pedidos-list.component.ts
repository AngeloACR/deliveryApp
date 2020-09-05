import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PedidosService } from "../../services/pedidos.service";

@Component({
  selector: "app-pedidos-list",
  templateUrl: "./pedidos-list.component.html",
  styleUrls: ["./pedidos-list.component.scss"]
})
export class PedidosListComponent implements OnInit {
  @Input()
  pedidos: any[];

  @Input()
  isPago: boolean;

  @Output()
  makePago = new EventEmitter<any>();

  pedidosLength: any;

  constructor(private pedidosService: PedidosService) {}

  ngOnInit() {
    console.log("Opening pedidos list");
    if (this.pedidos) {
      this.pedidosLength = this.pedidos.length;
      console.log(this.pedidosLength);
    }
  }

  pagar(event, item) {
    this.makePago.emit(item);
  }
}
