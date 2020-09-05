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
  isAceptar: boolean;

  @Output()
  actualizar = new EventEmitter<any>();

  pedidosLength: any;

  constructor(private pedidosService: PedidosService) {}

  ngOnInit() {
    console.log("Opening pedidos list");
    if (this.pedidos) {
      this.pedidosLength = this.pedidos.length;
      console.log(this.pedidosLength);
    }
  }

  aceptarPedido(event, pedido) {
    this.pedidosService.aceptarPedidos(pedido);
    this.actualizar.emit();
  }
  rechazarPedido(event, pedido) {
    this.pedidosService.rechazarPedidos(pedido);
    this.actualizar.emit();
  }
}
