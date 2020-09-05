import { Component, OnInit, ViewChild } from "@angular/core";
import { PedidosListComponent } from "../../components/pedidos-list/pedidos-list.component";
import { PedidosService } from "../../services/pedidos.service";
import { RestaurantesService } from "../../services/restaurantes.service";
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
    private res: RestaurantesService
  ) {}

  async ngOnInit() {}

  async togglePedidos(event, status) {
    this.dismissButtons();
    this.currentStatus = status;
    let pedidos = this.pedidosService.pedidos;
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
    this.pedidos = [];
    pedidos.forEach(pedido => {
      if (pedido.restaurantStatus == status) {
        this.pedidos.push(pedido);
      }
    });

    this.showPedidos = true;
    this.list.pedidos = this.pedidos;
    this.list.ngOnInit();
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
    await this.pedidosService.setPedidos(restaurantId);
    this.togglePedidos("", this.currentStatus);
    this.escogerRestaurant = false;
    this.buscarConductor = false;
    this.verPedidos = true;
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
    this.pedidosService.pedirConductor(
      this.pedido,
      data.distance,
      data.fee,
      data.driverId
    );
  }

  async actualizarPedidos() {
    await this.ngOnInit();
  }
}
