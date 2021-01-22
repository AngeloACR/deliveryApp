import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { PedidosListComponent } from "../../components/pedidos-list/pedidos-list.component";
import { CheckoutService } from "../../services/checkout.service";
import { CommonService } from "../../services/common.service";
import { PedidosService } from "../../services/pedidos.service";
@Component({
  selector: "app-pedidos",
  templateUrl: "./pedidos.component.html",
  styleUrls: ["./pedidos.component.scss"]
})
export class PedidosComponent implements OnInit {
  @ViewChild(PedidosListComponent) list: PedidosListComponent;

  currentStatus = "pending";

  pendingButton: any = {
    actButton: false
  };
  acceptedButton: any = {
    actButton: false
  };
  rejectedButton: any = {
    actButton: false
  };
  showPedidos: boolean = false;
  isPago: boolean = false;
  pedidos: any;

  constructor(
    private pedidosService: PedidosService,
    private common: CommonService,
    private router: Router,
    private checkout: CheckoutService
  ) {}

  async ngOnInit() {
    this.togglePedidos(this.currentStatus);
  }

  async togglePedidos(status) {
    this.dismissButtons();
    this.currentStatus = status;
    await this.pedidosService.setPedidos();
    let pedidos = this.pedidosService.pedidos;
    switch (status) {
      case "accepted":
        this.isPago = true;
        this.acceptedButton = {
          actButton: true
        };
        break;
      case "pending":
        this.pendingButton = {
          actButton: true
        };
        break;

      default:
        this.rejectedButton = {
          actButton: true
        };
        break;
    }
    this.pedidos = [];
    pedidos.forEach(pedido => {
      if (pedido.driverStatus == status) {
        this.pedidos.push(pedido);
      }
    });

    this.showPedidos = true;
  }

  dismissButtons() {
    this.isPago = false;
    this.showPedidos = false;
    this.pendingButton = {
      actButton: false
    };
    this.acceptedButton = {
      actButton: false
    };
    this.rejectedButton = {
      actButton: false
    };
  }

  goToPayment(item) {
    this.checkout.pedido = item;
    this.router.navigateByUrl("/checkouteats");
  }

  async actualizarPedidos(event, status) {
    await this.togglePedidos(status);
    this.list.pedidos = this.pedidos;
    this.list.ngOnInit();
  }
}
