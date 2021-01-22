import { Component, OnInit, ViewChild } from "@angular/core";
import { MapComponent } from "../../components/map/map.component";
import { DriversService } from "../../services/drivers.service";
import { CarrerasService } from "../../services/carreras.service";
import { PlacesService } from "../../services/places.service";
import { SettingService } from "../../services/setting.service";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController, MenuController } from "@ionic/angular";
//import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from "@angular/router";
import {
  DEAL_STATUS_PENDING,
  DEAL_STATUS_ACCEPTED,
  POSITION_INTERVAL,
  SHOW_VEHICLES_WITHIN,
  VEHICLE_LAST_ACTIVE_LIMIT
} from "src/environments/environment";
import { take } from "rxjs/operators";
import { CommonService } from "../../services/common.service";
import * as firebase from "firebase";
import { PushService } from "../../services/push.service";

@Component({
  selector: "app-taxi-map",
  templateUrl: "./taxi-map.component.html",
  styleUrls: ["./taxi-map.component.scss"]
})
export class TaxiMapComponent implements OnInit {
  @ViewChild(MapComponent) map: MapComponent;
  drivers: any;

  lookForDriver: boolean = false;

  mapId = Math.random() + "map";
  mapHeight: number = 480;
  showModalBg: boolean = false;
  showVehicles: boolean = false;
  vehicles: any = [];
  currentVehicle: any;
  note: any = "";
  promocode: any = "";

  origin: any;
  destination: any;

  distance: number = 0;
  duration: number = 0;
  currency: string;
  locality: any;
  paymentMethod: string = "cash";
  activeDrivers: Array<any> = [];
  driverMarkers: Array<any> = [];
  driverTracking: any;
  locateDriver: any = false;
  user = {};
  isTrackDriverEnabled = true;
  discount: any = 0;
  startLatLng: any;
  destLatLng: any;
  directionsService: any;
  directionsDisplay: any;
  bounds: any;
  cardNumber: any;
  originText: string;
  destinationText: string;
  durationText: any = "";
  distanceText: any = "";
  paymentHeader: any = "";
  notesHeader: any = "";
  cancelText: any = "";
  cashText: any = "";
  cardText: any = "";
  saveText: any = "";
  chooseText: any = "";
  invalidCardText: any = "";
  promoHeader: any = "";
  promoText: any = "";
  applyText: any = "";
  noteText: any = "";
  rideNow: any = "";
  locatingDrivers: any = "";
  noDriver: any = "";
  listOpened: boolean;
  driverOpened: boolean;

  markerImg: string;
  showList: {};
  showDriver: {};
  selectedDriver: any;
  driversList: any;
  driversMarker: any;

  vehicleOptions: any = [];
  taxis: any = [];
  motos: any = [];
  vehicleOptionSelected: boolean = false;
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private placesService: PlacesService,
    private push: PushService,
    private settingService: SettingService,
    private driversService: DriversService,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private translate: TranslateService,
    private carrerasService: CarrerasService,
    private common: CommonService,
    private menuCtrl: MenuController
  ) {
    this.translate.setDefaultLang("spanish");
    this.translate.use("spanish");
    this.originText = this.translate.instant("ORIGIN_TEXT");
    this.destinationText = this.translate.instant("DESTINATION_TEXT");
    this.paymentHeader = this.translate.instant("PAYMENT_MODE");
    this.notesHeader = this.translate.instant("NOTES_HEADER");
    this.cancelText = this.translate.instant("CANCEL");
    this.cardText = this.translate.instant("CARD");
    this.cashText = this.translate.instant("CASH");
    this.saveText = this.translate.instant("SAVE");
    this.chooseText = this.translate.instant("CHOOSE");
    this.invalidCardText = this.translate.instant("INVALID_CARD");
    this.promoHeader = this.translate.instant("PROMO_HEADER");
    this.promoText = this.translate.instant("PROMO_TEXT");
    this.applyText = this.translate.instant("APPLY");
    this.noteText = this.translate.instant("NOTE_TEXT");
    this.rideNow = this.translate.instant("RIDE_NOW");
    this.locatingDrivers = this.translate.instant("LOCATING_DRIVERS");
    this.noDriver = this.translate.instant("NO_DRIVER");
  }

  async ionViewDidEnter() {
    await this.common.showLoader();
    await this.map.loadMap();
    this.menuCtrl.enable(true);
    this.common.hideLoader();
  }

  async ngOnInit() {
    this.listOpened = false;
    this.driverOpened = false;
    this.markerImg = "assets/img/marcador.png";
    console.log("calling");
    this.setVehicles();
  }

  ionViewWillLeave() {
    clearInterval(this.driverTracking);
  }

  formatOrigin(origin) {
    this.origin = this.placesService.formatAddress(origin);
    this.carrerasService.setOrigin(
      this.origin.vicinity,
      this.origin.lat,
      this.origin.lng
    );
  }

  stops: any = [];

  formatStop(stop) {
    let formatedStop = this.placesService.formatAddress(stop);
    this.stops.push(formatedStop);
    this.carrerasService.setStop(
      formatedStop.vicinity,
      formatedStop.lat,
      formatedStop.lng
    );
  }
  formatDestination(destination) {
    this.destination = this.placesService.formatAddress(destination);
    this.carrerasService.setDestination(
      this.destination.vicinity,
      this.destination.lat,
      this.destination.lng
    );
  }

  setVehicles() {
    this.settingService
      .getPrices()
      .valueChanges()
      .subscribe((snapshot: any) => {
        this.vehicles = [];
        this.motos = [];
        this.taxis = [];
        console.log(snapshot);
        let obj = snapshot[this.locality]
          ? snapshot[this.locality]
          : snapshot.default;
        console.log(obj);
        this.currency = obj.currency;
        this.carrerasService.setCurrency(this.currency);

        // calculate price
        Object.keys(obj.vehicles).forEach(id => {
          obj.vehicles[id].id = id;
          if (
            obj.vehicles[id].type == "moto_taxi_lineal" ||
            obj.vehicles[id].type == "moto_taxi_tuk_tuk"
          ) {
            this.motos.push(obj.vehicles[id]);
          } else {
            this.taxis.push(obj.vehicles[id]);
          }
          this.vehicles.push(obj.vehicles[id]);
        });
        console.log(this.motos);
        console.log(this.taxis);
        let taxiAux = {
          icon: this.taxis[0].icon,
          name: "Taxi"
        };
        let motoAux = {
          icon: this.motos[0].icon,
          name: "Moto"
        };
        this.vehicleOptions.push(taxiAux);
        this.vehicleOptions.push(motoAux);
      });
  }

  chooseVehicleOption(i) {
    if (i == 0) {
      this.vehicles = this.taxis;
    } else {
      this.vehicles = this.motos;
    }
    this.vehicleOptionSelected = true;
  }

  backToChooseVechicleType() {
    this.vehicleOptionSelected = false;
  }

  async changeRoute() {
    this.lookForDriver = false;
    clearInterval(this.driverTracking);
    this.map.removeMarkers();
  }

  routeSelected(tripData) {
    this.distanceText = tripData.distanceText;
    this.durationText = tripData.durationText;
    for (let i = 0; i < this.vehicles.length; i++) {
      this.vehicles[i].distance = tripData.distance;
      this.vehicles[i].fee =
        (tripData.distance * this.vehicles[i].price) / 1000;
      this.vehicles[i].fee = this.vehicles[i].fee.toFixed(2);
    }
    this.lookForDriver = true;
    this.vehicleOptionSelected = false;
  }

  // toggle active vehicle
  chooseVehicle(index) {
    for (var i = 0; i < this.vehicles.length; i++) {
      this.vehicles[i].active = i == index;
      // choose this vehicle type
      if (i == index) {
        this.carrerasService.setVehicle(this.vehicles[i]);
        this.currentVehicle = this.vehicles[i];
      }
    }
    // start tracking new driver type
    this.trackDrivers();
    this.toggleVehicles();
  }

  showPromoPopup() {
    this.alertCtrl
      .create({
        header: this.promoHeader,
        message: "",
        inputs: [
          {
            name: "promocode",
            placeholder: this.promoText
          }
        ],
        buttons: [
          {
            text: this.cancelText,
            handler: data => {
              console.log("Cancel clicked");
            }
          },
          {
            text: this.applyText,
            handler: data => {
              console.log(data.promocode);
              //verifying promocode
              firebase
                .database()
                .ref("promocodes")
                .orderByChild("code")
                .equalTo(data.promocode)
                .once(
                  "value",
                  promocodes => {
                    console.log(promocodes.val());
                    let tmp: any = [];
                    promocodes.forEach(promo => {
                      tmp.push({ key: promo.key, ...promo.val() });
                      return false;
                    });
                    tmp = tmp[0];
                    console.log(tmp);
                    if (
                      promocodes.val() != null ||
                      promocodes.val() != undefined
                    ) {
                      this.promocode = tmp.code;
                      this.discount = tmp.discount;
                      this.carrerasService.setPromo(tmp.code);
                      this.carrerasService.setDiscount(tmp.discount);
                      console.log("promo applied", tmp.code, tmp.discount);
                    }
                  },
                  err => console.log(err)
                );
            }
          }
        ]
      })
      .then(prompt => prompt.present());
  }

  showNotePopup() {
    this.alertCtrl
      .create({
        header: this.notesHeader,
        message: "",
        inputs: [{ name: "note", placeholder: this.noteText }],
        buttons: [
          { text: this.cancelText },
          {
            text: this.saveText,
            handler: data => {
              this.note = data;
              this.carrerasService.setNote(data);
              console.log("Saved clicked");
            }
          }
        ]
      })
      .then(prompt => prompt.present());
  }

  // go to next view when the 'Book' button is clicked
  book(driver) {
    this.locateDriver = true;
    // store detail
    this.carrerasService.setAvailableDrivers(this.activeDrivers);
    this.carrerasService.setDistance(this.currentVehicle.distance);
    this.carrerasService.setFee(this.currentVehicle.fee);
    this.carrerasService.setIcon(this.currentVehicle.icon);
    this.carrerasService.setNote(this.note);
    this.carrerasService.setPromo(this.promocode);
    this.carrerasService.setDiscount(this.discount);
    // this.carrerasService.setPaymentMethod('');
    this.drivers = this.carrerasService.getAvailableDrivers();

    this.makeDeal(driver);
  }

  makeDeal(driverId) {
    let index = this.drivers.findIndex(p => p.key == driverId);

    let driver = this.drivers[index];
    let dealAccepted = false;

    if (driver) {
      driver.status = "Bidding";
      /*       this.carrerasService
        .getDriverDeal(driver.key)
        .valueChanges()
        .pipe(take(1))
        .subscribe((snapshot: any) => {
          // if user is available
          console.log(snapshot);
          if (snapshot == null) {
            // create a record
            console.log(snapshot); */
      let carrera = this.carrerasService.makeTaxiDeal(
        driver.key,
        this.carrerasService.getOrigin(),
        this.carrerasService.getStops(),
        this.carrerasService.getDestination(),
        this.carrerasService.getDistance(),
        this.carrerasService.getFee(),
        this.carrerasService.getCurrency(),
        this.carrerasService.getNote(),
        this.carrerasService.getPromo(),
        this.carrerasService.getDiscount()
      );

      /*               .then(() => {
                let sub = this.carrerasService
                  .getDriverDeal(driver.key)
                  .valueChanges()
                  .subscribe((snap: any) => {
                    // if record doesn't exist or is accepted
                    if (snap === null || snap.status != DEAL_STATUS_PENDING) {
                      sub.unsubscribe();

                      // if deal has been cancelled
                      if (snap === null) {
                        console.log("Deal Cancelled");
                        //this.nextDriver(index);
                      } else if (snap.status == DEAL_STATUS_ACCEPTED) {
                        // if deal is accepted
                        console.log("accepted", snap.tripId);
                        dealAccepted = true;
                        this.drivers = [];
                        this.carrerasService.setId(snap.tripId);
                        // go to user page
                        this.router.navigateByUrl("tracking");
                      }
                    }
                  });
              });
 */ if (
        this.driverOpened
      ) {
        this.closeDriver();
      }
      if (this.listOpened) {
        this.closeDriver();
      } /* else {
          this.nextDriver(index);
        } */ /* 
        }); */ /* 
          } */
      this.push.pushCrearCarrera(carrera);
      this.common.showToast(
        "Carrera creada con exito, espere unos minutos por la respuesta del conductor"
      );
      this.router.navigateByUrl('/carreras')
    } else {
      // show error & try again button
      console.log("No user found");
      this.locateDriver = false;
      this.common.showAlert(this.noDriver);
    }
  }

  choosePaymentMethod() {
    this.router.navigateByUrl("/payments");
  }

  // show or hide vehicles
  toggleVehicles() {
    this.showVehicles = !this.showVehicles;
    this.showModalBg = this.showVehicles == true;
  }

  setLocality(results) {
    this.locality = this.placesService.setLocalityFromGeocoder(results);
  }

  // track drivers
  trackDrivers() {
    this.showDriverOnMap(this.locality);
    clearInterval(this.driverTracking);

    this.driverTracking = setInterval(() => {
      this.showDriverOnMap(this.locality);
    }, POSITION_INTERVAL);

    console.log(POSITION_INTERVAL);
  }
  // show drivers on map
  showDriverOnMap(locality) {
    console.log(locality);
    console.log(this.currentVehicle.id);

    this.driversService
      .getDriversNearby(locality, this.currentVehicle.id)
      .valueChanges()
      .pipe(take(1))
      .subscribe((snapshot: any) => {
        console.log(snapshot);
        this.activeDrivers = [];
        this.driverMarkers = [];
        snapshot.forEach(async vehicle => {
          console.log(vehicle);
          let distance = this.placesService.calcCrow(
            vehicle.lat,
            vehicle.lng,
            this.origin.lat,
            this.origin.lng
          );
          console.log(distance);
          console.log(
            "distance:" +
              distance +
              " Last Active: " +
              (Date.now() - vehicle.last_active)
          );

          let isNear = distance < SHOW_VEHICLES_WITHIN;
          let isRecent =
            Date.now() - vehicle.last_active < VEHICLE_LAST_ACTIVE_LIMIT;

          if (isRecent) {
            let marker = {
              img: this.currentVehicle.map_icon,
              lat: vehicle.lat,
              lng: vehicle.lng,
              key: vehicle.key
            };

            vehicle.distance = distance;
            console.log(marker);
            this.driverMarkers.push(marker);
            this.activeDrivers.push(vehicle);
          } else {
            console.log("This vehicle is too far");
          }
          this.map.markers = this.driverMarkers;
          await this.map.setMarkers();
        });
      });
  }

  // clear expired drivers on the map
  clearDrivers() {
    this.activeDrivers = [];
  }

  openDriver(id) {
    this.listOpened = false;
    this.driverOpened = true;
    console.log(`Showing driver of id ${id}`);
    this.selectedDriver = id;
    this.showList = {
      showList: false
    };
    this.showDriver = {
      showDriver: true
    };
  }

  openList() {
    this.listOpened = true;
    this.driverOpened = false;
    console.log(`Showing drivers list`);
    console.log(this.activeDrivers);
    // sort by driver distance and rating
    /*     this.drivers = this.carrerasService.sortDriversList(this.drivers);
    console.log(this.drivers); */

    this.showList = {
      showList: true
    };
    this.showDriver = {
      showDriver: false
    };
  }

  closeDriver() {
    this.listOpened = false;
    this.driverOpened = false;
    this.showList = {
      showList: false
    };
    this.showDriver = {
      showDriver: false
    };
  }

  closeList() {
    this.listOpened = false;
    this.driverOpened = false;
    this.showList = {
      showList: false
    };
    this.showDriver = {
      showDriver: false
    };
  }

  pedirCarrera(id) {}
}
