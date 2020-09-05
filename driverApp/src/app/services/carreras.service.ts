import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { DEAL_STATUS_PENDING } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { Place } from "./place";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CarrerasService {
  public carreras: any;
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

  constructor(private db: AngularFireDatabase, private auth: AuthService) {}

  async setCarreras() {
    try {
      let uid = await this.auth.getUId();
      console.log(uid);
      let snapshotAux = await this.getCarreras()
        .snapshotChanges()
        .pipe(take(1))
        .toPromise();
      this.carreras = [];
      snapshotAux.forEach((snap: any) => {
        let key = snap.key;
        let val = snap.payload.val();
        let aux = { key, ...val };
        if (aux.driver == uid) {
          this.carreras.push(aux);
        }
      });
      return new Promise((resolve, reject) => {
        resolve("done");
      });
    } catch (error) {
      console.log(error.toString());
    }
  }

  getCarreras() {
    return this.db.list("deals/taxi");
  }

  // sort driver by rating & distance
  sortDriversList(drivers: Array<any>) {
    return drivers.sort((a, b) => {
      return a.rating - a.distance / 5 - (b.rating - b.distance / 5);
    });
  }

  // make deal to driver
  makeTaxiDeal(
    driverId,
    origin,
    destination,
    distance,
    fee,
    currency,
    note,
    paymentMethod,
    promocode,
    discount
  ) {
    let user = this.auth.getUserData();
    return this.db.object("deals/taxi/").set({
      client: user.uid,
      currency: currency,
      type: "Taxi",
      origin: origin,
      destination: destination,
      distance: distance,
      fee: fee,
      note: note,
      paymentMethod: paymentMethod,
      status: DEAL_STATUS_PENDING,
      createdAt: Date.now(),
      promocode: promocode,
      discount: discount
    });
  }

  aceptarCarreras(carrera) {
    this.db.object("/deals/taxi/" + carrera.key).update({
      status: "accepted"
    });
  }
  rechazarCarreras(carrera) {
    this.db.object("/deals/taxi/" + carrera.key).update({
      status: "rejected"
    });
  }

  // get deal by driverId
  getDriverDeal(driverId) {
    return this.db.object("deals/taxi/" + driverId);
  }

  // remove deal
  removeDeal(driverId) {
    return this.db.object("deals/taxi/" + driverId).remove();
  }

  getAll() {
    return this.trips;
  }

  setId(id) {
    return (this.id = id);
  }

  getId() {
    return this.id;
  }

  setCurrency(currency) {
    return (this.currency = currency);
  }

  getCurrency() {
    return this.currency;
  }

  setOrigin(vicinity, lat, lng) {
    let place = new Place(vicinity, lat, lng);
    return (this.origin = place.getFormatted());
  }

  getOrigin() {
    return this.origin;
  }

  setDestination(vicinity, lat, lng) {
    let place = new Place(vicinity, lat, lng);
    return (this.destination = place.getFormatted());
  }

  getDestination() {
    return this.destination;
  }

  setDistance(distance) {
    return (this.distance = distance);
  }

  getDistance() {
    return this.distance;
  }

  setFee(fee) {
    return (this.fee = fee);
  }

  getFee() {
    return this.fee;
  }

  setNote(note) {
    return (this.note = note);
  }

  getNote() {
    return this.note;
  }

  setPromo(promocode) {
    return (this.promocode = promocode);
  }
  getPromo() {
    return this.promocode;
  }

  setDiscount(discount) {
    return (this.discount = discount);
  }
  getDiscount() {
    return this.discount;
  }

  setPaymentMethod(method) {
    return (this.paymentMethod = method);
  }

  getPaymentMethod() {
    return this.paymentMethod;
  }

  setVehicle(vehicle) {
    return (this.vehicle = vehicle);
  }

  getVehicle() {
    return this.vehicle;
  }

  setIcon(icon) {
    return (this.icon = icon);
  }

  getIcon() {
    return this.icon;
  }

  setAvailableDrivers(vehicles) {
    console.log(vehicles);
    this.availableDrivers = vehicles;
  }

  getAvailableDrivers() {
    return this.availableDrivers;
  }

  getTrip(id) {
    return this.db.object("trips/" + id);
  }

  getTrips() {
    let user = this.auth.getUserData();
    console.log(user);
    return this.db.list("trips", res =>
      res.orderByChild("passengerId").equalTo(user.uid)
    );
  }

  cancelTrip(id) {
    return this.db.object("trips/" + id).update({ status: "canceled" });
  }

  rateTrip(tripId, stars) {
    return this.db.object("trips/" + tripId).update({
      rating: parseInt(stars)
    });
  }
}
