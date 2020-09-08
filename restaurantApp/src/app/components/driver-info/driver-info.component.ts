import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DriversService } from "../../services/drivers.service";
import { take } from "rxjs/operators";

@Component({
  selector: "app-driver-info",
  templateUrl: "./driver-info.component.html",
  styleUrls: ["./driver-info.component.scss"]
})
export class DriverInfoComponent implements OnInit {
  @Input()
  driverId: any;

  driver: any;

  @Output()
  salir = new EventEmitter<any>();

  @Output()
  deal = new EventEmitter<any>();

  constructor(private driverService: DriversService) {}

  ngOnInit() {
    console.log("Getting info");
    this.driverService
      .getDriver(this.driverId)
      .valueChanges()
      .pipe(take(1))
      .subscribe(snap => {
        this.driver = snap;
        console.log(this.driver);
      });
  }

  cerrar() {
    this.salir.emit();
  }

  pedirCarrera() {
    this.deal.emit(this.driverId);
  }
}
