import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { EatsDestinationComponent } from "../../components/eats-destination/eats-destination.component";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { CheckoutService } from "../../services/checkout.service";
import { PedidosService } from "../../services/pedidos.service";
import { CommonService } from "../../services/common.service";

@Component({
  selector: "app-checkout-eats",
  templateUrl: "./checkout-eats.component.html",
  styleUrls: ["./checkout-eats.component.scss"]
})
export class CheckoutEatsComponent implements OnInit {
  pedido: any;
  isPayment: boolean = false;
  origen: any;
  destino: any;
  productos: any;
  montoCarrito: number;
  montoCarrera: number;
  montoTotal: number;
  constructor(
    private translate: TranslateService,
    private common: CommonService,
    private auth: AuthService,
    private router: Router,
    private checkout: CheckoutService,
    private pedidos: PedidosService
  ) {
    this.translate.setDefaultLang("spanish");
    this.translate.use("spanish");
  }

  ngOnInit() {
    this.pedido = this.checkout.pedido;
    this.productos = this.pedido.carrito.productos;
    this.montoCarrito = +this.pedido.carrito.montoTotal;
    this.montoCarrera = +this.pedido.fee;
    this.montoTotal = this.montoCarrera + this.montoCarrito;
    this.origen = this.pedido.origin.vicinity;
    this.destino = this.pedido.destination.vicinity;
  }

  pagar() {
    this.isPayment = true;
  }

  finishCheckout(paymentInfo) {
    if (paymentInfo.status) {
      let aux = {
        key: this.pedido.key,
        method: paymentInfo.method
      };
      this.pedidos.pagarPedido(aux);
    }
  }
}
