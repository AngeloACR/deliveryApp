import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CarrerasService } from "../../services/carreras.service";
import { CommonService } from "../../services/common.service";

@Component({
  selector: "app-carreras-list",
  templateUrl: "./carreras-list.component.html",
  styleUrls: ["./carreras-list.component.scss"]
})
export class CarrerasListComponent implements OnInit {
  @Input()
  carreras: any[];

  @Input()
  isPago: boolean;

  @Output()
  makePago = new EventEmitter<any>();

  carrerasLength: any;

  constructor(
    private common: CommonService,
    private carrerasService: CarrerasService
  ) {}

  ngOnInit() {
    console.log("Opening carreras list");
    if (this.carreras) {
      this.carrerasLength = this.carreras.length;
      console.log(this.carrerasLength);
    }
  }
  pagar(event, item) {
    this.makePago.emit(item);
  }
}
