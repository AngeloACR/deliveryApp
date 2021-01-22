import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CarrerasService } from "../../services/carreras.service";
import { CommonService } from "../../services/common.service";
import { PushService } from "../../services/push.service";

@Component({
  selector: "app-carreras-list",
  templateUrl: "./carreras-list.component.html",
  styleUrls: ["./carreras-list.component.scss"]
})
export class CarrerasListComponent implements OnInit {
  @Input()
  carreras: any[];

  @Input()
  isAceptar: boolean;

  @Output()
  actualizar = new EventEmitter<any>();

  carrerasLength: any;

  constructor(
    private carrerasService: CarrerasService,
    private push: PushService,
    private common: CommonService
  ) {}

  ngOnInit() {
    console.log("Opening carreras list");
    if (this.carreras) {
      this.carrerasLength = this.carreras.length;
      console.log(this.carrerasLength);
    }
  }

  aceptarCarrera(event, carrera) {
    this.carrerasService.aceptarCarreras(carrera);
    this.push.pushAceptarCarrera(carrera);
    this.common.showToast(
      "Carrera aceptada, espere por la confirmación del pago para dirigirse al punto de origen"
    );
    this.actualizar.emit();
  }
  rechazarCarrera(event, carrera) {
    this.carrerasService.rechazarCarreras(carrera);
    this.push.pushRechazarCarrera(carrera);
    this.common.showToast("Carrera rechazada");
    this.actualizar.emit();
  }
}
