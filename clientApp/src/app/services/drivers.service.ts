import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DriversService {
  public drivers: any;
  constructor(private db: AngularFireDatabase, private auth: AuthService) {}

  async setDrivers() {
    try {
      let uid = await this.auth.getUId();
      console.log("here2");
      let snapshotAux = await this.getDrivers()
        .snapshotChanges()
        .pipe(take(1))
        .toPromise();
      this.drivers = [];
      snapshotAux.forEach((snap: any) => {
        let key = snap.key;
        let val = snap.payload.val();
        let aux = { key, ...val };
        this.drivers.push(aux);
      });

      return new Promise((resolve, reject) => {
        resolve("done");
      });
    } catch (error) {
      console.log(error.toString());
    }
  }

  getDrivers() {
    return this.db.list("drivers");
  }

  // get driver by id
  getDriver(id) {
    return this.db.object("drivers/" + id);
  }

  // get driver position
  getDriverPosition(locality, vehicleType, id) {
    return this.db.object(
      "localities/" + locality + "/" + vehicleType + "/" + id
    );
  }

  getDriversNearby(locality, vehicleType) {
    return this.db.list("localities/" + locality + "/" + vehicleType);
  }

  // calculate vehicle angle
  calcAngle(oldLat, oldLng, lat, lng) {
    let brng = Math.atan2(lat - oldLat, lng - oldLng);
    brng = brng * (180 / Math.PI);

    return brng;
  }

  // return icon suffix by angle
  getIconWithAngle(vehicle) {
    let angle = this.calcAngle(
      vehicle.oldLat,
      vehicle.oldLng,
      vehicle.lat,
      vehicle.lng
    );

    if (angle >= -180 && angle <= -160) {
      return "_left";
    }

    if (angle > -160 && angle <= -110) {
      return "_bottom_left";
    }

    if (angle > -110 && angle <= -70) {
      return "_bottom";
    }

    if (angle > -70 && angle <= -20) {
      return "_bottom_right";
    }

    if (angle >= -20 && angle <= 20) {
      return "_right";
    }

    if (angle > 20 && angle <= 70) {
      return "_top_right";
    }

    if (angle > 70 && angle <= 110) {
      return "_top";
    }

    if (angle > 110 && angle <= 160) {
      return "_top_left";
    }

    if (angle > 160 && angle <= 180) {
      return "_left";
    }
  }
}
