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
declare var google: any;
@Component({
  selector: "app-eats-destination",
  templateUrl: "./eats-destination.component.html",
  styleUrls: ["./eats-destination.component.scss"]
})
export class EatsDestinationComponent implements OnInit {
  @ViewChild(MapComponent) map: MapComponent;

  @Input() restLocation: any;

  @Output()
  placeSelected = new EventEmitter<any>();

  origin: any;

  constructor(private placesService: PlacesService) {}

  async ngOnInit() {}

  async loadMap() {}

  async ngAfterViewInit() {
    // Now you can use the tabs reference
    this.origin = new google.maps.LatLng(
      this.restLocation.lat,
      this.restLocation.lng
    );
    await this.map.loadMap();
  }

  locationSelected(point) {
    let location = this.placesService.formatAddress(point);

    this.placeSelected.emit(location);
  }
}
