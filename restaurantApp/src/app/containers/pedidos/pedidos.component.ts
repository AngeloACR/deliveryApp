import { Component, OnInit, ViewChild } from "@angular/core";
import { PedidosListComponent } from "../../components/pedidos-list/pedidos-list.component";
import { PedidosService } from "../../services/pedidos.service";
import { RestaurantesService } from "../../services/restaurantes.service";
import { CommonService } from "../../services/common.service";
import { PushService } from "../../services/push.service";

@Component({
  selector: "app-pedidos",
  templateUrl: "./pedidos.component.html",
  styleUrls: ["./pedidos.component.scss"]
})
export class PedidosComponent implements OnInit {
  @ViewChild(PedidosListComponent) list: PedidosListComponent;
  pedido: any;
  restaurantId: any;
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
  isAceptar: boolean = false;
  isBuscar: boolean = false;
  isPedidos: boolean = true;
  escogerRestaurant: boolean = true;
  restaurantesReady = false;
  restaurantes: any;
  verPedidos: boolean = false;
  buscarConductor: boolean = false;
  pedidos: any;

  constructor(
    private pedidosService: PedidosService,
    private res: RestaurantesService,
    private push: PushService,
    private common: CommonService
  ) {}

  async ngOnInit() {}

  async togglePedidos(status) {
    this.dismissButtons();
    await this.pedidosService.setPedidos(this.restaurantId);
    this.currentStatus = status;
    switch (status) {
      case "accepted":
        this.isBuscar = true;
        this.acceptedButton = {
          actButton: true
        };
        break;
      case "pending":
        this.isAceptar = true;
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
    let pedidos = this.pedidosService.pedidos;
    this.pedidos = [];
    pedidos.forEach(pedido => {
      if (pedido.restaurantStatus == status) {
        this.pedidos.push(pedido);
      }
    });
    this.verPedidos = true;
  }

  dismissButtons() {
    this.isAceptar = false;
    this.isBuscar = false;
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
  async ionViewDidEnter() {
    await this.res.setRestaurants();
    this.restaurantes = this.res.restaurantes;
    this.restaurantesReady = true;
  }

  async mostrarPedidos(restaurantId) {
    this.restaurantId = restaurantId;
    this.escogerRestaurant = false;
    this.buscarConductor = false;
    await this.togglePedidos(this.currentStatus);
  }

  volverRestaurant() {
    this.escogerRestaurant = true;
    this.buscarConductor = false;
    this.verPedidos = false;
  }

  async volverPedidos() {
    await this.mostrarPedidos(this.restaurantId);
  }

  findDriver(pedido) {
    this.pedido = pedido;
    this.escogerRestaurant = false;
    this.buscarConductor = true;
    this.verPedidos = false;
  }

  solicitarCarrera(data) {
    let pedido = this.pedidosService.pedirConductor(
      this.pedido,
      data.distance,
      data.fee,
      data.driverId
    );
    this.push.pushCrearDelivery(pedido);
    this.common.showToast(
      "Delivery solicitado, espere a que el conductor confirme su disponibilidad"
    );
  }

  async actualizarPedidos(event, status) {
    await this.togglePedidos(status);
    this.list.pedidos = this.pedidos;
    this.list.ngOnInit();
  }
}
