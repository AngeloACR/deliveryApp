import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { PlacesService } from "./places.service";

@Injectable({
  providedIn: "root"
})
export class SettingService {
  constructor(
    private db: AngularFireDatabase,
    private placesService: PlacesService
  ) {}

  getVehicleType() {
    return this.db
      .object(
        "master_settings/prices/" +
          this.placesService.getLocality() +
          "/vehicles"
      )
      .valueChanges();
  }

  getDefaultVehicleType() {
    return this.db
      .object("master_settings/prices/default/vehicles")
      .valueChanges();
  }
}
