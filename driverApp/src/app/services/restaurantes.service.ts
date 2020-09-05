import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RestaurantesService {
  public restaurantes: any;
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  async setRestaurants() {
    let snapshot = await this.getRestaurants()
      .valueChanges()
      .pipe(take(1))
      .toPromise();

    snapshot.forEach((snap: any) => {
      this.restaurantes = [];
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
    });
    return new Promise((resolve, reject) => {
      resolve("done");
    });
  }

  getRestaurants() {
    return this.db.list("restaurants");
  }

  addRestaurant(restInfo) {
    // create or update passenger
    this.db.list("restaurants").push(restInfo);
  }

  updateRestaurantInfo(restInfo) {}

  updateRestaurantCategories(categories) {}

  updateRestaurantItems(items) {}

  deleteRestaurant() {}
}
