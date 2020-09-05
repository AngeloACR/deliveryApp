import { Component, OnInit, ViewChild } from "@angular/core";
import { MapComponent } from "../../components/map/map.component";
import { RestaurantesService } from "../../services/restaurantes.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @ViewChild(MapComponent) map: MapComponent;

  markers: any;

  constructor(private res: RestaurantesService) {}

  async ionViewDidEnter() {
    await this.res.setRestaurants();
    let restaurantes = this.res.restaurantes;
    this.markers = [];
    restaurantes.forEach(restaurant => {
      let marker = {
        img: "assets/img/marcador.png",
        lat: restaurant.location.lat,
        lng: restaurant.location.lng,
        key: restaurant.key
      };
      this.markers.push(marker);
    });
    await this.map.loadMap();
    this.map.markers = this.markers;
    await this.map.setMarkers();
  }

  ngOnInit() {}

  restaurantOpened: boolean = false;
  selectedRestaurant: any;
  showRestaurant: any;
  openRestaurant(id) {
    this.restaurantOpened = true;

    this.selectedRestaurant = id;
    this.showRestaurant = {
      showRestaurant: true
    };
  }

  closeRestaurant() {
    this.restaurantOpened = false;
    this.showRestaurant = {
      showRestaurant: false
    };
  }
}
