import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../services/common.service";

@Component({
  selector: "app-order-history",
  templateUrl: "./order-history.component.html",
  styleUrls: ["./order-history.component.scss"]
})
export class OrderHistoryComponent implements OnInit {
  title = "Historial de pedidos";

  constructor(private common: CommonService) {}

  ngOnInit() {}
}
