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

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements OnInit {
  @ViewChild(EatsDestinationComponent)
  eatsDest: EatsDestinationComponent;
  pedido: any;
  isPlaceSelection: boolean = false;
  isCarrito: boolean = false;
  isPayment: boolean = false;
  constructor(
    private translate: TranslateService,
    private auth: AuthService,
    private common: CommonService,
    private router: Router,
    private checkout: CheckoutService
  ) {
    this.translate.setDefaultLang("spanish");
    this.translate.use("spanish");
  }

  ngOnInit() {
    this.isCarrito = true;
    this.isPayment = false;
    this.isPlaceSelection = false;
  }

  selectLocation(pedido) {
    this.pedido = pedido;
    this.isCarrito = false;
    this.isPayment = false;
    this.isPlaceSelection = true;
  }

  selectPayment(location) {
    this.isCarrito = false;
    this.isPayment = true;
    this.isPlaceSelection = false;
  }
}
