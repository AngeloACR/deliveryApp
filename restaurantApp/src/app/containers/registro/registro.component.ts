import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../services/auth.service";
import { CommonService } from "../../services/common.service";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"]
})
export class RegistroComponent implements OnInit {
  userInfo: any = {};
  registro: FormGroup;

  constructor(
    private translate: TranslateService,
    private auth: AuthService,
    private router: Router,
    private common: CommonService,
    private menuCtrl: MenuController
  ) {
    this.translate.setDefaultLang("spanish");
    this.translate.use("spanish");
  }

  ngOnInit() {
    this.registro = new FormGroup({
      name: new FormControl(""),
      email: new FormControl(""),
      address: new FormControl(""),
      tlf: new FormControl(""),
      password: new FormControl("")
    });
  }

  async signup() {
    try {
      let dataAux = this.registro.value;
      let dataValues = {
        name: dataAux.name,
        email: dataAux.email,
        phoneNumber: dataAux.tlf,
        address: dataAux.address,
        password: dataAux.password
      };

      this.auth.register(dataValues).then(() => {
        this.router.navigateByUrl("/login");
        this.common.showToast("Account Created");
      });
    } catch (error) {
      this.common.showToast(error.message);
    }
  }
}
