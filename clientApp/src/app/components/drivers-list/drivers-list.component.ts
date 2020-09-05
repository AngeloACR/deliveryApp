import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-drivers-list",
  templateUrl: "./drivers-list.component.html",
  styleUrls: ["./drivers-list.component.scss"]
})
export class DriverListComponent implements OnInit {
  @Input()
  drivers: any;

  @Output()
  ver = new EventEmitter<any>();

  @Output()
  deal = new EventEmitter<any>();

  @Output()
  salir = new EventEmitter<any>();

  driversLength: any;

  constructor() {}

  ngOnInit() {
    console.log("Opening drivers list");
    this.driversLength = this.drivers.length;
    console.log(!this.driversLength);
  }

  cerrar() {
    this.salir.emit();
  }

  verDriver(event, driver) {
    this.ver.emit(driver.key);
  }

  pedirCarrera(event, driver) {
    this.deal.emit(driver.key);
  }
}
