import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { MapComponent } from "../../components/map/map.component";
import { PlacesService } from "../../services/places.service";

@Component({
  selector: "app-restaurant-location",
  templateUrl: "./restaurant-location.component.html",
  styleUrls: ["./restaurant-location.component.scss"]
})
export class RestaurantLocationComponent implements OnInit {
  @ViewChild(MapComponent) map: MapComponent;

  @Output()
  placeSelected = new EventEmitter<any>();

  constructor(private placesService: PlacesService) {}

  async ngOnInit() {}

  async loadMap() {}

  async ngAfterViewInit() {
    // Now you can use the tabs reference
    await this.map.loadMap();
  }

  locationSelected(point) {
    let location = this.placesService.formatAddress(point);

    this.placeSelected.emit(location);
  }
}
