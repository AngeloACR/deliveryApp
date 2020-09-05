import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { AuthService } from "./auth.service";

import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DriversService {
  user: any;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.user = this.authService.getUserData();
  }

  setUser(user) {
    this.user = user;
  }

  // get driver by id
  async getDriver() {
    console.log("Here");
    let uid = await this.authService.getUId();
    console.log(uid);
    let snap = await this.db
      .object("drivers/" + uid)
      .snapshotChanges()
      .pipe(take(1))
      .toPromise();
    console.log("Here as well");
    console.log(snap);

    let key = snap.key;
    let val: any = snap.payload.val();
    let driver = { key, ...val };
    return driver;
  }

  getDriverVehicle(vehicleType) {
    return this.db.object(
      "master_settings/prices/default/vehicles/" + vehicleType
    );
  }

  // update driver's position
  updatePosition(
    vehicleId,
    vehicleType,
    locality,
    lat,
    lng,
    /* rating, */ name
  ) {
    let path = "localities/" + locality + "/" + vehicleType + "/" + vehicleId;
    this.db
      .object(path)
      .valueChanges()
      .pipe(take(1))
      .subscribe((snapshot: any) => {
        console.log(snapshot);
        // insert if not exists
        if (snapshot === null) {
          this.db.object(path).set({
            key: vehicleId,
            lat: lat,
            lng: lng,
            oldLat: lat,
            oldLng: lng,
            last_active: Date.now() /* 
            rating: rating, */,
            name: name
          });
        } else {
          // update
          this.db.object(path).update({
            key: vehicleId,
            lat: lat,
            lng: lng,
            oldLat: snapshot.lat,
            oldLng: snapshot.lng,
            last_active: Date.now() /* 
            rating: rating, */,
            name: name
          });
        }
      });
  }
}
