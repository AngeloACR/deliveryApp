import { Component, OnInit, ViewChild } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { PlacesService } from "../../services/places.service";
import { DriversService } from "../../services/drivers.service";
import { CommonService } from "../../services/common.service";
import { MapComponent } from "../../components/map/map.component";
import {
  AUDIO_PATH,
  PLAY_AUDIO_ON_REQUEST,
  DEAL_TIMEOUT,
  POSITION_INTERVAL,
  DEAL_STATUS_PENDING
} from "src/environments/environment";
import { take } from "rxjs/operators";

declare var google: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @ViewChild(MapComponent) map: MapComponent;
  driver: any;
  positionTracking: any;
  vehicle: any;
  constructor(
    private geolocation: Geolocation,
    private placesService: PlacesService,
    private driversService: DriversService,
    private commonService: CommonService
  ) {}

  async ionViewDidEnter() {
    await this.map.loadMap();
    await this.initHome();
  }

  async ionViewWillLeave() {
    clearInterval(this.positionTracking);
  }

  ngOnInit() {}

  async initHome() {
    try {
      this.driver = await this.driversService.getDriver();
      console.log(this.driver)
      /*         .snapshotChanges()
        .pipe(take(1))
        .toPromise();
 console.log(
        "Here as well"
      );
      console.log(snap);

      let key = snap.key;
      let val: any = snap.payload.val();
      this.driver = { key, ...val };
      console.log(this.driver);
 */

      if (!this.driver || !this.driver.type) {
        this.commonService.showAlert(
          "Perfil incompleto, por favor rellene los datos faltantes"
        );
        console.log("Driver profile incomplete");
      } else {
        await this.setVehicle();
        console.log(this.vehicle);
        this.changeAvailability();
      }
    } catch (error) {
      console.log(error.toString());
    }
  }

  async setVehicle() {
    let snap = await this.driversService
      .getDriverVehicle(this.driver.type)
      .snapshotChanges()
      .pipe(take(1))
      .toPromise();

    let key = snap.key;
    let val: any = snap.payload.val();
    this.vehicle = { key, ...val };
  }

  changeAvailability() {
    console.log("getting inside here");
    clearInterval(this.positionTracking);
    // get current location
    this.geolocation.getCurrentPosition().then(
      resp => {
        let latLng = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        let geocoder = new google.maps.Geocoder();

        // find address from lat lng
        geocoder.geocode({ latLng: latLng }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            // save locality
            let locality = this.placesService.setLocalityFromGeocoder(results);
            console.log("locality", locality);

            // start tracking
            this.positionTracking = setInterval(() => {
              console.log("track");
              // check for driver object, if it did not complete profile, stop updating location

              // Periodic update after particular time intrvel
              this.geolocation.getCurrentPosition().then(
                async resp => {
                  console.log(resp);
                  this.driversService.updatePosition(
                    this.driver.uid,
                    this.driver.type,
                    locality,
                    resp.coords.latitude,
                    resp.coords
                      .longitude /* 
                    this.driver.rating, */,
                    this.driver.name
                  );
                  let marker = {
                    img: this.vehicle.map_icon,
                    lat: resp.coords.latitude,
                    lng: resp.coords.longitude
                  };
                  let markers = [];
                  markers.push(marker);
                  this.map.markers = markers;
                  await this.map.setMarkers();
                },
                err => {
                  console.log(err);
                }
              );
            }, POSITION_INTERVAL);
          }
        });
      },
      err => {
        console.log(err);
      }
    );
  }
}
