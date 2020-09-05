import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RestaurantesService {
  public restaurantes: any;
  constructor(private db: AngularFireDatabase, private auth: AuthService) {}

  async setRestaurants() {
    try {
      let uid = await this.auth.getUId();
      console.log("here2");
      let snapshotAux = await this.getRestaurants()
        .snapshotChanges()
        .pipe(take(1))
        .toPromise();
      this.restaurantes = [];
      snapshotAux.forEach((snap: any) => {
        let key = snap.key;
        let val = snap.payload.val();
        let aux = { key, ...val };
        if (aux.ownerId == uid) {
          this.restaurantes.push(aux);
        }
      });

      /*       let snapshot = await this.getRestaurants()
        .valueChanges()
        .pipe(take(1))
        .toPromise();

      snapshot.forEach((snap: any) => {
        console.log(snap);
        this.restaurantes.push({
          id: snap.restaurantId,
          name: snap.name,
          address: snap.address,
          lat: snap.lat,
          long: snap.long,
          tlf: snap.tlf,
          icon: "ios-arrow-dropright",
          iconText: "Read more",
          firebase_url: snap.firebase_url,
          category: snap.category,
          description: snap.description
        });
        console.log(this.restaurantes);
      }); */
      return new Promise((resolve, reject) => {
        resolve("done");
      });
    } catch (error) {
      console.log(error.toString());
    }
  }

  getRestaurants() {
    return this.db.list("restaurants");
  }

  // get driver by id
  getRestaurant(id) {
    return this.db.object("restaurants/" + id);
  }

  addRestaurant(restInfo) {
    // create or update passenger
    this.db.list("restaurants").push(restInfo);
  }

  updateRestaurant(restInfo) {
    this.db.object("/restaurants" + restInfo.$key).update({
      name: restInfo.name,
      address: restInfo.address,
      lat: restInfo.lat,
      long: restInfo.long,
      tlf: restInfo.tlf,
      icon: "ios-arrow-dropright",
      iconText: "Read more",
      firebase_url: restInfo.firebase_url,
      category: restInfo.category,
      description: restInfo.description
    });
  }

  deleteRestaurant(item) {
    this.db.object("/restaurants/" + item.key).remove();
  }
}
