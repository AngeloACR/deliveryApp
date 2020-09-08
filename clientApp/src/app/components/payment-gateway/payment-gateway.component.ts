import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../services/auth.service";
import { CheckoutService } from "../../services/checkout.service";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-payment-gateway",
  templateUrl: "./payment-gateway.component.html",
  styleUrls: ["./payment-gateway.component.scss"]
})
export class PaymentGatewayComponent implements OnInit {
  @Input() amount: number;
  @Output() paymentComplete = new EventEmitter<any>();

  paymentMethod: FormGroup;
  method: any;
  ccData: FormGroup;
  expAux: any;
  currency: any;
  isCash: boolean = false;
  isCC: boolean = false;
  isBank: boolean = false;
  methodSelected: boolean = false;

  constructor(private checkout: CheckoutService) {}

  ngOnInit() {
    this.initForm();
    this.currency = "usd";
  }

  initForm() {
    this.paymentMethod = new FormGroup({
      method: new FormControl("")
    });
    this.ccData = new FormGroup({
      number: new FormControl(""),
      expMonth: new FormControl(""),
      expYear: new FormControl(""),
      cvc: new FormControl("")
    });
  }

  async processPayment() {
    try {
      let paymentInfo;
      switch (this.method) {
        case "cash":
          paymentInfo = {
            status: true,
            method: this.method
          };
          break;

        case "creditcard":
          this.isCC = true;

          let dataAux = this.ccData.value;
          let card = {
            number: dataAux.number,
            expMonth: dataAux.expMonth,
            expYear: dataAux.expYear,
            cvc: dataAux.cvc
          };
          let token = await this.checkout.createCardToken(card);
          let data = this.checkout
            .makePayment(this.amount, this.currency, token)
            .toPromise();
          paymentInfo = {
            status: true,
            method: this.method,
            data: data
          };
          break;

        default:
          this.isBank = true;
          paymentInfo = {
            status: true,
            method: this.method
          };

          break;
      }
      this.paymentComplete.emit(paymentInfo);
    } catch (error) {
      let aux = {
        status: false,
        error: error.toString()
      };
      this.paymentComplete.emit(aux);

      console.log(error);
    }
  }

  togglePayment() {
    this.isCash = false;
    this.isCC = false;
    this.isBank = false;
    let dataAux = this.paymentMethod.value;
    this.method = dataAux.method;
    switch (this.method) {
      case "cash":
        this.isCash = true;

        break;

      case "creditcard":
        this.isCC = true;

        break;

      default:
        this.isBank = true;

        break;
    }
    this.methodSelected = true;
  }

  lengthValidator(maxCharacters) {}
}
