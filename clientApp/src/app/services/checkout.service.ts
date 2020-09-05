import { Injectable } from "@angular/core";
import { Stripe } from "@ionic-native/stripe/ngx";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CheckoutService {
  pk: "pk_live_XvPpkPKcx9fReOm80cX2Edcs";
  pedido: any;
  carrera: any;
  paymentMethod: any;

  constructor(private stripe: Stripe, private http: HttpClient) {
    this.stripe.setPublishableKey(this.pk);
  }

  async createCardToken(card) {
    try {
      let token = await this.stripe.createCardToken(card);
      console.log(token);
      return token;
    } catch (error) {
      console.error(error);
    }
  }

  makePayment(amount, currency, token) {
    let endpoint =
      "https://us-central1-shoppr-c97a7.cloudfunctions.net/payWithStripe";
    return this.http.post(endpoint, {
      amount: amount,
      currency: currency,
      token: token.id
    });
  }

  async setPedido(pedido) {
    this.pedido = pedido;
  }
  async setCarrera(carrera) {
    this.carrera = carrera;
  }
}
