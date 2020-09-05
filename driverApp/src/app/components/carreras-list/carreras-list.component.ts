import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CarrerasService } from "../../services/carreras.service";

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

  constructor(private carrerasService: CarrerasService) {}

  ngOnInit() {
    console.log("Opening carreras list");
    if (this.carreras) {
      this.carrerasLength = this.carreras.length;
      console.log(this.carrerasLength);
    }
  }

  aceptarCarrera(event, carrera) {
    this.carrerasService.aceptarCarreras(carrera);
    this.actualizar.emit();
  }
  rechazarCarrera(event, carrera) {
    this.carrerasService.rechazarCarreras(carrera);
    this.actualizar.emit();
  }
}
