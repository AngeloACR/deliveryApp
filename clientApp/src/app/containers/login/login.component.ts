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
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  userInfo: any = {};
  login: FormGroup;
  constructor(
    public translate: TranslateService,
    private auth: AuthService,
    private common: CommonService,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.translate.setDefaultLang("spanish");
    this.translate.use("spanish");
  }

  ngOnInit() {
    this.login = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    });
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }
  async loginUser() {
    try {
      let dataAux = this.login.value;
      let email: string = dataAux.email;
      let password: string = dataAux.password;
      console.log(dataAux);
      await this.auth.login(email, password);

      this.menuCtrl.enable(true);
      let isLogged = await this.auth.getStatus();
      if (isLogged != null) {
        this.router.navigateByUrl("home");
      } else {
        let message = "Ocurrió un error, por favor intente de nuevo";
        this.common.showToast(message);
      }
    } catch (error) {
      console.log(error.toString());
    }
  }

  reset() {
    let dataAux = this.login.value;
    if (dataAux.email) {
      let email: string = dataAux.email;
      this.auth
        .reset(email)
        .then(data => this.common.showToast("Please Check your inbox"))
        .catch(err => this.common.showToast(err.message));
    } else this.common.showToast("Please Enter Email Address");
  }
}
