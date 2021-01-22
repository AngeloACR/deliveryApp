import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../services/common.service";

@Component({
  selector: "app-pagos",
  templateUrl: "./pagos.component.html",
  styleUrls: ["./pagos.component.scss"]
})
export class PagosComponent implements OnInit {
  constructor(private common: CommonService) {}

  ngOnInit() {}
}
