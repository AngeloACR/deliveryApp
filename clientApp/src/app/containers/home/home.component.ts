import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../services/auth.service";
import { CommonService } from "../../services/common.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  taxiImg: any;
  eatsImg: any;

  constructor(
    public translate: TranslateService,
    private auth: AuthService,
    private common: CommonService,
    private router: Router
  ) {
    this.translate.setDefaultLang("spanish");
    this.translate.use("spanish");
  }

  ionViewDidEnter() {}

  ngOnInit() {
    this.taxiImg = "assets/img/Imagen_Tuk Taxi.jpg";
    this.eatsImg = "assets/img/Imagen_Tuk Eat.jpg";
  }

  firstToggle(event, service) {
    switch (service) {
      case "taxi":
        this.router.navigateByUrl("/taximap");
        break;

      default:
        this.router.navigateByUrl("/restaurantes");
        break;
    }
  }
}
