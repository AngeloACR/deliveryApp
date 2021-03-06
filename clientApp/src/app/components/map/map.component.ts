import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  NgZone
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { CommonService } from "../../services/common.service";

declare var google: any;
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  @Input() isDestination: boolean;
  @Input() isOrigin: boolean;

  @Input() origin: any;
  @Input() position: any;
  @Input() destination: any;
  @Input() setPosition: boolean;
  @Input() setOriginAsCurrentPosition: boolean;
  @Input() setDestinationAsCurrentPosition: boolean;

  @Input() markers: any[];

  @Output() setRoute = new EventEmitter<any>();
  @Output() setOrigin = new EventEmitter<any>();
  @Output() setStop = new EventEmitter<any>();
  @Output() setDestination = new EventEmitter<any>();
  @Output() setLocality = new EventEmitter<any>();
  @Output() changeRoute = new EventEmitter<any>();
  @Output() markerClicked = new EventEmitter<any>();

  points: any = [];

  formatedOrigin: any;
  formatedDestination: any;

  locationText: string;

  directionsDisplay: any = [];
  directionsService: any = [];

  routeSelected: boolean = false;

  centerListener: any;
  originMarker: any = null;
  destinationMarker: any = null;
  originSelected: boolean = false;
  destinationSelected: boolean = false;

  originFocus: boolean = false;
  destinationFocus: boolean = false;

  locationAutoComplete: any;

  originInput: boolean = true;
  destinationInput: boolean = true;

  originSelection: boolean = false;
  destinationSelection: boolean = false;

  geocoder: any;

  googleMarkers: any;
  mapId = Math.random() + "map";
  map: any;
  markerImg: any;
  originAddress: any;
  destinationAddress: any;
  constructor(
    private geolocation: Geolocation,
    private common: CommonService,
    private translate: TranslateService,
    private ngZone: NgZone
  ) {
    this.translate.setDefaultLang("spanish");
    this.translate.use("spanish");
    /*     this.originText = this.translate.instant("ORIGIN_TEXT");
    this.destinationText = this.translate.instant("DESTINATION_TEXT");
 */
    this.locationText = "Ingrese una ubicación";
  }

  async ionViewDidEnter() {
    console.log("here");
    await this.loadMap();
  }

  async loadMap() {
    try {
      // add destination to map
      //this.common.showLoader("Loading..");
      console.log("1");
      this.map = new google.maps.Map(document.getElementById(this.mapId), {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });
      console.log("2");

      let resp = await this.geolocation.getCurrentPosition();
      console.log("3");
      let point = new google.maps.LatLng(
        resp.coords.latitude,
        resp.coords.longitude
      );
      console.log("4");

      this.map.setCenter(point);
      console.log("5");

      if (this.setOriginAsCurrentPosition) {
        this.origin = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );

        this.map.setCenter(this.origin);
        this.setOriginMarker();
      }

      if (this.setDestinationAsCurrentPosition) {
        this.destination = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );

        this.map.setCenter(this.destination);
        this.setDestinationMarker();
      }
      // find map center address
      this.geocoder = new google.maps.Geocoder();

      this.geocoder.geocode(
        { latLng: this.map.getCenter() },
        (results, status) => {}
      );

      console.log("7");
      /* if (this.isOrigin) {
        this.selectOriginPoint();
      }
      console.log("8");
      if (this.isDestination) {
        this.selectDestinationPoint();
      } */
      console.log("9");
      // this.common.hideLoader()
      this.setMarkers();
    } catch (error) {
      // this.common.hideLoader();
      console.log("Error getting location", error);
    }
  }
  async selectOriginPoint() {
    this.disableListeners();
    let lat = await this.originMarker.position.lat();
    let lng = await this.originMarker.position.lng();
    let location = {
      lat: lat,
      lng: lng
    };
    this.origin = new google.maps.LatLng(lat, lng);
    this.geocoder.geocode({ latLng: this.origin }, (results, status) => {
      this.ngZone.run(() => {
        if (status === "OK") {
          let origin = results[0];
          if (origin) {
            this.originAddress = origin.formatted_address;
            this.setOrigin.emit(origin);
            this.setLocality.emit(results);
            this.originSelection = false;
            this.originSelected = true;
            this.originInput = false;
          }
        }
      });
    });
  }

  async selectDestinationPoint() {
    this.disableListeners();
    let lat = await this.destinationMarker.position.lat();
    let lng = await this.destinationMarker.position.lng();
    let location = {
      lat,
      lng
    };
    this.destination = new google.maps.LatLng(lat, lng);
    this.geocoder.geocode({ latLng: this.destination }, (results, status) => {
      this.ngZone.run(() => {
        if (status === "OK") {
          let destination = results[0];
          if (destination) {
            this.destinationAddress = destination.formatted_address;
            this.setDestination.emit(destination);
            this.destinationSelection = false;
            this.destinationSelected = true;
            this.destinationInput = false;
          }
        }
      });
    });
  }

  chooseLocation() {
    let locationInput = document.getElementById("locationInput");

    this.locationAutoComplete = new google.maps.places.Autocomplete(
      locationInput
    );
    google.maps.event.addListener(
      this.locationAutoComplete,
      "place_changed",
      () => {
        this.ngZone.run(() => {
          console.log(this.locationAutoComplete);
          let lat = this.locationAutoComplete
            .getPlace()
            .geometry.location.lat();
          let lng = this.locationAutoComplete
            .getPlace()
            .geometry.location.lng();
          if (this.originFocus) {
            this.origin = new google.maps.LatLng(lat, lng);
            this.chooseOrigin();
            this.map.setCenter(this.origin);
          }
          if (this.destinationFocus) {
            this.destination = new google.maps.LatLng(lat, lng);
            this.chooseDestination();
            this.map.setCenter(this.destination);
          }
        });
      }
    );
  }

  async ngOnInit() {
    await this.loadMap();
  }

  chooseOrigin() {
    if (!this.origin) {
      this.origin = this.map.getCenter();
    }
    this.setOriginMarker();
    this.disableListeners();
    this.centerListener = this.map.addListener("center_changed", event => {
      this.origin = this.map.getCenter();
      this.setOriginMarker();
    });
    this.disableMarkersSelection();

    this.originSelection = true;
    this.originSelected = false;
    this.originInput = false;
    /*     this.destinationSelection = false;
    this.destinationInput = true;
    this.destinationFocus = false;
 */ this.originFocus = true;
  }

  chooseDestination() {
    if (!this.destination) {
      this.destination = this.map.getCenter();
    }
    this.setDestinationMarker();
    this.disableListeners();
    this.centerListener = this.map.addListener("center_changed", event => {
      this.destination = this.map.getCenter();
      this.setDestinationMarker();
    });
    this.disableMarkersSelection();
    this.destinationSelection = true;
    this.destinationSelected = false;
    this.destinationInput = false;
    this.destinationFocus = true;
    /*     this.originInput = true;
    this.originSelection = false;
    this.originFocus = false;
 */
  }

  disableListeners() {
    google.maps.event.removeListener(this.centerListener);
  }

  traceRoute() {
    let mapx = this.map;
    this.routeSelected = true;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: true
    });
    this.directionsDisplay.setMap(mapx);
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(this.origin);
    bounds.extend(this.destination);
    let waypoints = [];
    for (var i = 0; i < this.points.length; i++) {
      var address = this.points[i].position;
      if (address !== "") {
        waypoints.push({
          location: address,
          stopover: true
        });
      }
    }
    mapx.fitBounds(bounds);
    var request = {
      origin: this.origin,
      waypoints: waypoints,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (response, status) =>
      this.ngZone.run(() => {
        {
          if (status == google.maps.DirectionsStatus.OK) {
            console.log(response);
            this.directionsDisplay.setDirections(response);
            this.directionsDisplay.setMap(mapx);
            console.log(response.routes);
            console.log(response.routes[0].legs);
            console.log(response.routes[0].legs[0]);
            var legs = response.routes[0].legs;
            let legsLength = legs.length;
            this.originMarker.setMap(null);
            this.origin = legs[0].start_location;
            this.setOriginMarker();
            let totalDistance = 0;
            let totalDuration = 0;
            for (let i = 0; i < legsLength; i++) {
              if (i == legsLength - 1) {
                this.destinationMarker.setMap(null);
                this.destination = legs[i].end_location;
                this.setDestinationMarker();
              } else {
                this.setStopMarker(i);
              }
              totalDistance += legs[i].distance.value;
              totalDuration += legs[i].duration.value;
            }

            let totalDistanceAux = totalDistance / 1000;
            let totalDurationAux = totalDuration / 60;
            let totalDistanceText = `${totalDistanceAux.toFixed(2)} Km`;
            let totalDurationText = `${totalDurationAux.toFixed(0)} min`;

            this.disableListeners();

            if (response.routes.length != 0) {
              console.log();
              let distance = totalDistance;
              let distanceText = totalDistanceText;
              let durationText = totalDurationText;

              let tripData = {
                distance: distance,
                distanceText: distanceText,
                durationText: durationText,
                origin: this.origin,
                destination: this.destination
              };

              this.setRoute.emit(tripData);
            } else {
              console.log("error");
            }
          } else {
            console.log("error");
          }
        }
      })
    );
  }

  setMarkers() {
    this.markerImg = "assets/img/marcador.png";
    // add origin marker to map
    // add origin and destination marker
    if (this.setPosition) {
      let startMarker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: this.position,
        icon: {
          url: this.markerImg,
          size: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(25, 50),
          scaledSize: new google.maps.Size(50, 50)
        }
      });
      startMarker.setMap(this.map);
    }
    console.log(this.markers);
    if (this.markers && this.markers.length > 0) {
      if (this.googleMarkers && this.googleMarkers.length > 0) {
        this.googleMarkers.forEach((googleMarker, i) => {
          if (googleMarker) {
            googleMarker.setMap(null);
          }
        });
      }
      this.googleMarkers = [];
      this.markers.forEach((marker, i) => {
        let markerImg = "assets/img/marcador.png";
        let position = new google.maps.LatLng(marker.lat, marker.lng);
        let googleMarker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: position,
          icon: {
            url: marker.img,
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(25, 50),
            scaledSize: new google.maps.Size(50, 50)
          }
        });
        googleMarker.setMap(this.map);
        googleMarker.addListener("click", () => {
          this.map.setCenter(googleMarker.getPosition());
          this.markerClicked.emit(marker.key);
        });
        this.googleMarkers.push(googleMarker);
      });
    }
  }

  removeMarkers() {
    if (this.googleMarkers && this.googleMarkers.length) {
      this.googleMarkers.forEach(marker => {
        marker.setMap(null);
      });
    }
  }

  deleteStop(event, index) {
    if (this.points[index].marker) {
      this.points[index].marker.setMap(null);
    }
    this.points.splice(index, 1);
  }

  stopMarkers: any = [];
  setStopMarker(index) {
    if (this.points[index].marker) {
      this.points[index].marker.setMap(null);
    }
    let position;
    if (this.points[index].position) {
      position = this.points[index].position;
    } else {
      position = this.map.getCenter();
    }
    let markerImg = "assets/img/marcador.png";
    let marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: position,
      icon: {
        url: markerImg,
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50),
        scaledSize: new google.maps.Size(50, 50)
      }
    });
    this.points[index].marker = marker;

    this.points[index].marker.setMap(this.map);
  }

  setOriginMarker() {
    if (this.originMarker) {
      this.originMarker.setMap(null);
    }
    let markerImg = "assets/img/origen.png";
    this.originMarker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: this.origin,
      icon: {
        url: markerImg,
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50),
        scaledSize: new google.maps.Size(50, 50)
      }
    });
    this.originMarker.setMap(this.map);
  }

  setDestinationMarker() {
    if (this.destinationMarker) {
      this.destinationMarker.setMap(null);
    }
    let markerImg = "assets/img/destino.png";
    this.destinationMarker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: this.destination,
      icon: {
        url: markerImg,
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50),
        scaledSize: new google.maps.Size(50, 50)
      }
    });
    this.destinationMarker.setMap(this.map);
  }

  selectPoints() {
    this.directionsDisplay.setMap(null);
    this.routeSelected = false;
    this.originSelected = false;
    this.destinationSelected = false;
    this.originFocus = false;
    this.destinationFocus = false;
    this.originInput = true;
    this.destinationInput = true;
    this.originSelection = false;
    this.destinationSelection = false;
    this.changeRoute.emit();
  }

  addStop() {
    let markerImg = "assets/img/marcador.png";
    let point = {
      selected: false,
      selection: false,
      input: true,
      position: "",
      address: "",
      marker: ""
    };
    this.points.push(point);
  }
  disableMarkersSelection() {
    this.originInput = true;
    this.originSelection = false;
    this.destinationInput = true;
    this.destinationSelection = false;

    for (let index = 0; index < this.points.length; index++) {
      this.points[index].selection = false;
      this.points[index].input = true;
    }
  }
  chooseStop(event, index) {
    this.setStopMarker(index);
    this.disableListeners();
    this.centerListener = this.map.addListener("center_changed", event => {
      let position = this.map.getCenter();
      this.points[index].position = position;
      this.setStopMarker(index);
    });
    this.disableMarkersSelection();

    this.points[index].selection = true;
    this.points[index].selected = false;
    this.points[index].input = false;
  }
  async selectStopPoint(event, index) {
    this.disableListeners();
    let lat = await this.points[index].position.lat();
    let lng = await this.points[index].position.lng();
    let location = {
      lat: lat,
      lng: lng
    };
    let position = new google.maps.LatLng(lat, lng);
    this.geocoder.geocode({ latLng: position }, (results, status) => {
      this.ngZone.run(() => {
        if (status === "OK") {
          let data = results[0];
          if (data) {
            this.points[index].address = data.formatted_address;
            this.setStop.emit(data);
            this.setLocality.emit(results);
            this.points[index].selection = false;
            this.points[index].selected = true;
            this.points[index].input = false;
          }
        }
      });
    });
  }
}
