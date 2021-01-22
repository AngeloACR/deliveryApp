import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../services/common.service";

@Component({
  selector: "app-split-pago",
  templateUrl: "./split-pago.component.html",
  styleUrls: ["./split-pago.component.scss"]
})
export class SplitPagoComponent implements OnInit {
  constructor(private common: CommonService) {}

  ngOnInit() {}
}
