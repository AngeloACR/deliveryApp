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

  @Output()
  actualizar = new EventEmitter<any>();

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
    this.pedidosService.aceptarPedidos(pedido);
    this.push.pushAceptarDelivery(pedido);
    this.common.showToast(
      "Delivery aceptado, espere a que esté listo para llevarlo a su destino"
    );
    this.actualizar.emit();
  }
  rechazarPedido(event, pedido) {
    this.pedidosService.rechazarPedidos(pedido);
    this.push.pushRechazarDelivery(pedido);
    this.common.showToast("Delivery rechazado");
    this.actualizar.emit();
  }
}
