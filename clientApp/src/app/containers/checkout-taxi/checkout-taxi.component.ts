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
import { CommonService } from "../../services/common.service";
import { CarrerasService } from "../../services/carreras.service";

@Component({
  selector: "app-checkout-taxi",
  templateUrl: "./checkout-taxi.component.html",
  styleUrls: ["./checkout-taxi.component.scss"]
})
export class CheckoutTaxiComponent implements OnInit {
  carrera: any;
  isPayment: boolean = false;
  origen: any;
  destino: any;
  montoCarrera: number;
  montoTotal: number;
  constructor(
    private translate: TranslateService,
    private auth: AuthService,
    private router: Router,
    private common: CommonService,
    private checkout: CheckoutService,
    private carreras: CarrerasService
  ) {
    this.translate.setDefaultLang("spanish");
    this.translate.use("spanish");
  }

  ngOnInit() {
    this.carrera = this.checkout.carrera;
    this.montoCarrera = this.carrera.fee;
    this.montoTotal = this.montoCarrera;
    this.origen = this.carrera.origin.vicinity;
    this.destino = this.carrera.destination.vicitiny;
  }
  pagar() {
    this.isPayment = true;
  }

  finishCheckout(paymentInfo) {
    if (paymentInfo.status) {
      let aux = {
        key: this.carrera.key,
        method: paymentInfo.method
      };
      this.carreras.pagarCarrera(aux);
    }
  }
}
