import { Component, OnInit, ViewChild } from "@angular/core";
import { MapComponent } from "../../components/map/map.component";
import { CommonService } from "../../services/common.service";

@Component({
  selector: "app-track-drivers",
  templateUrl: "./track-drivers.component.html",
  styleUrls: ["./track-drivers.component.scss"]
})
export class TrackDriversComponent implements OnInit {
  title = "Rastreo de conductores";
  markers: any;
  @ViewChild(MapComponent) map: MapComponent;
  constructor(private common: CommonService) {}

  async ionViewDidEnter() {
    await this.map.loadMap();
  }

  ngOnInit() {}
}
