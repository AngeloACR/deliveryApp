import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { DEAL_STATUS_PENDING } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { Place } from "./place";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PedidosService {
  private id: any;
  private trips: any;
  private currency: string;
  private origin: any;
  private destination: any;
  private distance: number;
  private fee: number;
  private note: string;
  private paymentMethod: any = "card";
  private vehicle: any;
  private promocode: any;
  private discount: any;
  // vehicle's icon
  private icon: any;
  private availableDrivers: Array<any> = [];

  public pedidos: any;
  constructor(private db: AngularFireDatabase, private auth: AuthService) {}

  async setPedidos() {
    try {
      let uid = await this.auth.getUId();
      let snapshotAux = await this.getPedidos()
        .snapshotChanges()
        .pipe(take(1))
        .toPromise();
      this.pedidos = [];
      snapshotAux.forEach((snap: any) => {
        let key = snap.key;
        let val = snap.payload.val();
        let aux = { key, ...val };
        if (aux.client == uid) {
          this.pedidos.push(aux);
        }
      });

      return new Promise((resolve, reject) => {
        resolve("done");
      });
    } catch (error) {
      console.log(error.toString());
    }
  }

  getPedidos() {
    return this.db.list("deals/eats");
  }

  /*  addPedido(restInfo) {
    // create or update passenger
    this.db.list("deals").push(restInfo);
  } */

  updatePedido(pedidoInfo, status) {
    this.db.object("/deals/eats" + pedidoInfo.key).update({
      status: status
    });
  }

  deletePedido(item) {
    this.db.object("/deals/eats" + item.key).remove();
  }
  // make deal to driver
  makeEatsDeal(
    origin,
    destination,
    distance,
    fee,
    currency,
    note,
    paymentMethod,
    products,
    total,
    promocode,
    discount
  ) {
    let user = this.auth.getUserData();
    let pedidoInfo = {
      client: user.uid,
      currency: currency,
      origin: origin,
      destination: destination,
      distance: distance,
      fee: fee,
      products: products,
      total: total,
      note: note,
      paymentMethod: paymentMethod,
      restaurantStatus: DEAL_STATUS_PENDING,
      driverStatus: DEAL_STATUS_PENDING,
      createdAt: Date.now(),
      promocode: promocode,
      discount: discount
    };
    return this.db.list("deals/eats").push(pedidoInfo);
  }

  aceptarPedidos(pedido) {
    this.db.object("/deals/eats/" + pedido.key).update({
      driverStatus: "accepted"
    });
  }
  rechazarPedidos(pedido) {
    this.db.object("/deals/eats/" + pedido.key).update({
      driverStatus: "rejected"
    });
  }
}
