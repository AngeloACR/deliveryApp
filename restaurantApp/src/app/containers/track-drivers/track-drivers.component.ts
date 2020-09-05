import { Component, OnInit, ViewChild } from "@angular/core";
import { MapComponent } from "../../components/map/map.component";

@Component({
  selector: "app-track-drivers",
  templateUrl: "./track-drivers.component.html",
  styleUrls: ["./track-drivers.component.scss"]
})
export class TrackDriversComponent implements OnInit {
  title = "Rastreo de conductores";
  markers: any;
  @ViewChild(MapComponent) map: MapComponent;
  constructor() {}

  async ionViewDidEnter() {
    await this.map.loadMap();
  }

  ngOnInit() {}
}
