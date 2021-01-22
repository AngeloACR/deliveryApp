import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PedidosService } from "../../services/pedidos.service";
import { CommonService } from "../../services/common.service";
import { PushService } from "../../services/push.service";

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

  @Input()
  isBuscar: boolean;

  @Output()
  actualizar = new EventEmitter<any>();

  @Output()
  volver = new EventEmitter<any>();

  @Output()
  buscar = new EventEmitter<any>();

  pedidosLength: any;

  constructor(
    private pedidosService: PedidosService,
    private push: PushService,
    private common: CommonService
  ) {}

  ngOnInit() {
    console.log("Opening pedidos list");
    if (this.pedidos) {
      this.pedidosLength = this.pedidos.length;
      console.log(this.pedidosLength);
    }
  }

  aceptarPedido(event, pedido) {
    console.log("here");
    this.pedidosService.aceptarPedidos(pedido);
    this.push.pushAceptarPedido(pedido);
    this.common.showToast(
      "Pedido aceptado, espere por la confirmación del pago para procesarlo"
    );
    this.actualizar.emit();
  }
  rechazarPedido(event, pedido) {
    console.log("here2");
    this.pedidosService.rechazarPedidos(pedido);
    this.push.pushRechazarPedido(pedido);
    this.common.showToast("Pedido rechazado");
    this.actualizar.emit();
  }

  volverRestaurantes() {
    this.volver.emit();
  }

  buscarConductor(event, pedido) {
    this.buscar.emit(pedido);
  }
}
