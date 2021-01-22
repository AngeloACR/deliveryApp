import { Component, OnInit, ViewChild, NgZone, Input } from "@angular/core";
import { NavController, LoadingController } from "@ionic/angular";
import { CarritoService } from "../../services/carrito.service";
import { PedidosService } from "../../services/pedidos.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { CommonService } from "../../services/common.service";
import { PushService } from "../../services/push.service";

@Component({
  selector: "app-review-pedido",
  templateUrl: "./review-pedido.component.html",
  styleUrls: ["./review-pedido.component.scss"]
})
export class ReviewPedidoComponent implements OnInit {
  title = "Carrito";

  restLocation: any;
  isCarrito: boolean;
  isPlaceSelection: boolean;
  destino: any;

  note: string = "";

  restaurantId: any;
  categoriaId: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private auth: AuthService,
    public router: Router,
    public zone: NgZone,
    private push: PushService,
    private common: CommonService,
    private carritoService: CarritoService,
    private pedidosService: PedidosService
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    this.isCarrito = true;
    this.isPlaceSelection = false;
    this.restLocation = {
      lat: this.carritoService.restaurant.location.lat,
      lng: this.carritoService.restaurant.location.lng,
      vicinity: this.carritoService.restaurant.location.vicinity
    };
  }

  setLocation(location) {
    this.destino = location;
    this.title = "Carrito";
    this.isCarrito = true;
    this.isPlaceSelection = false;
  }

  selectLocation() {
    this.title = "Destino";
    this.isCarrito = false;
    this.isPlaceSelection = true;
  }

  async completarPedido() {
    let productos = this.carritoService.productos;
    let montoTotal = this.carritoService.montoTotal;
    let carrito = {
      productos,
      montoTotal
    };
    let uid = await this.auth.getUId();
    let restaurantId = this.carritoService.restaurant.key;
    let pedido = this.pedidosService.makeEatsDeal(
      restaurantId,
      this.restLocation,
      this.destino,
      this.note,
      carrito
    );
    this.push.pushCrearPedido(pedido);
    this.common.showToast(
      "Pedido creado con exito, espere unos minutos por la respuesta del restaurant"
    );
    this.router.navigateByUrl("/restaurantes");
  }
}
