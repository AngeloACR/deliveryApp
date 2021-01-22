import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { CarrerasListComponent } from "../../components/carreras-list/carreras-list.component";
import { CarrerasService } from "../../services/carreras.service";
import { CommonService } from "../../services/common.service";
import { CheckoutService } from "../../services/checkout.service";
@Component({
  selector: "app-carreras",
  templateUrl: "./carreras.component.html",
  styleUrls: ["./carreras.component.scss"]
})
export class CarrerasComponent implements OnInit {
  @ViewChild(CarrerasListComponent) list: CarrerasListComponent;

  currentStatus = "pending";

  pendingButton: any = {
    actButton: false
  };
  acceptedButton: any = {
    actButton: false
  };
  rejectedButton: any = {
    actButton: false
  };
  showCarreras: boolean = false;
  isPago: boolean = false;
  carreras: any;

  constructor(
    private carrerasService: CarrerasService,
    private common: CommonService,
    private checkout: CheckoutService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.toggleCarreras(this.currentStatus);
  }

  async toggleCarreras(status) {
    this.dismissButtons();
    this.currentStatus = status;
    await this.carrerasService.setCarreras();
    let carreras = this.carrerasService.carreras;
    switch (status) {
      case "accepted":
        this.isPago = true;
        this.acceptedButton = {
          actButton: true
        };
        break;
      case "pending":
        this.pendingButton = {
          actButton: true
        };
        break;

      default:
        this.rejectedButton = {
          actButton: true
        };
        break;
    }
    this.carreras = [];
    carreras.forEach(carrera => {
      if (carrera.status == status) {
        this.carreras.push(carrera);
      }
    });

    this.showCarreras = true;
  }

  dismissButtons() {
    this.isPago = false;
    this.showCarreras = false;
    this.pendingButton = {
      actButton: false
    };
    this.acceptedButton = {
      actButton: false
    };
    this.rejectedButton = {
      actButton: false
    };
  }

  goToPayment(item) {
    this.checkout.carrera = item;
    this.router.navigateByUrl("/checkouttaxi");
  }

  async actualizarCarreras(event, status) {
    await this.toggleCarreras(status);
    this.list.carreras = this.carreras;
    this.list.ngOnInit();
  }

  showSelection() {}
}
