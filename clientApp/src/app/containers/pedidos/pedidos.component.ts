import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { PedidosListComponent } from "../../components/pedidos-list/pedidos-list.component";
import { CheckoutService } from "../../services/checkout.service";
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
    private router: Router,
    private checkout: CheckoutService
  ) {}

  async ngOnInit() {
    await this.pedidosService.setPedidos();
    this.togglePedidos("", this.currentStatus);
  }

  async togglePedidos(event, status) {
    this.dismissButtons();
    this.currentStatus = status;
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
    this.list.pedidos = this.pedidos;
    this.list.ngOnInit();
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

  showSelection() {}
}
