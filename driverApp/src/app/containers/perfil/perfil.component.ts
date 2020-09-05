import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  CUSTOMER_CARE,
  CURRENCY_SYMBOL,
  DEFAULT_COUNTRY_CODE,
  DEFAULT_COUNTRY_MOBILE_CODE
} from "../../../environments/environment";
import { AuthService } from "../../services/auth.service";
import { Platform } from "@ionic/angular";
import { SettingService } from "../../services/setting.service";
import { CommonService } from "../../services/common.service";
import { Router } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";
import { take } from "rxjs/operators";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.scss"]
})
export class PerfilComponent implements OnInit {
  user: any = {};
  currency: any;
  support = CUSTOMER_CARE;
  tripCount = 0;
  totalEarning = 0;
  rating: any = 5;
  types: Array<any> = [];
  tabs: any = "perfil";

  isProfile: boolean = true;
  isCarinfo: boolean = false;
  isDocs: boolean = false;

  constructor(
    private authService: AuthService,
    private settingService: SettingService,
    private common: CommonService,
    private platform: Platform,
    private translate: TranslateService,
    private router: Router,
    private afStorage: AngularFireStorage
  ) {
    this.translate.setDefaultLang("spanish");
    this.translate.use("spanish");
  }

  ngOnInit() {}

  async ionViewDidEnter() {
    // this.user = this.authService.getUser(this.authService.getUserData().uid);
    let uid = await this.authService.getUId();
    this.user = await this.authService.getAuthData();
    /*       .getUser(uid)
      .valueChanges()
      .pipe(take(1))
      .subscribe((snapshot: any) => {
        console.log(snapshot);
        this.user = snapshot;
      });
 */
    this.currency = CURRENCY_SYMBOL;
    this.settingService
      .getVehicleType()
      .pipe(take(1))
      .subscribe((snapshot: any) => {
        if (snapshot === null) {
          this.settingService
            .getDefaultVehicleType()
            .pipe(take(1))
            .subscribe((snapshot: any) => {
              console.log(snapshot);
              this.types = Object.keys(snapshot).map(function(key) {
                return snapshot[key];
              });
            });
        } else {
          this.types = Object.keys(snapshot).map(function(key) {
            return snapshot[key];
          });
        }
      });
    console.log(this.user);
  }

  async save() {
    let uid = await this.authService.getUId();
    let data = await this.authService.getUser(uid).update(this.user);

    await this.authService.storeAuthData(data);
    this.common.showToast("Updated successfully");

    /*       .then(async data => {
        console.log(data);
        await this.authService.storeAuthData(data);
        this.common.showToast("Updated successfully");
      });
 */
  }
  chooseFile() {
    document.getElementById("avatar").click();
  }

  upload() {
    // Create a root reference
    this.common.showLoader("Uploading..");

    for (let selectedFile of [
      (<HTMLInputElement>document.getElementById("avatar")).files[0]
    ]) {
      let path = "/users/" + Date.now() + `_${selectedFile.name}`;
      let ref = this.afStorage.ref(path);
      ref
        .put(selectedFile)
        .then(() => {
          ref.getDownloadURL().subscribe(data => {
            this.user.photoURL = data;
          });
          this.common.hideLoader();
        })
        .catch(err => {
          this.common.hideLoader();
          console.log(err);
        });
    }
  }

  dismissPages() {
    this.isProfile = false;
    this.isCarinfo = false;
    this.isDocs = false;
  }

  togglePage(event, page) {
    this.dismissPages();
    switch (page) {
      case "profile":
        this.isProfile = true;
        break;
      case "carinfo":
        this.isCarinfo = true;

        break;

      default:
        this.isDocs = true;
        break;
    }
  }

  // code for uploading licence image
  chooseDocs() {
    document.getElementById("docsPDF").click();
  }
  uploadDocs() {
    this.common.showLoader("Uploading..");

    for (let selectedFile of [
      (<HTMLInputElement>document.getElementById("docsPDF")).files[0]
    ]) {
      console.log(selectedFile.name);
      let path = "/users/" + Date.now() + `${selectedFile.name}`;
      let ref = this.afStorage.ref(path);
      ref
        .put(selectedFile)
        .then(() => {
          ref.getDownloadURL().subscribe(url => (this.user.docsURL = url));
          this.common.hideLoader();
        })
        .catch(err => {
          this.common.hideLoader();
          console.log(err);
        });
    }
  }

  logout() {
    this.authService
      .logout()
      .then(() =>
        this.router.navigateByUrl("login", { skipLocationChange: true })
      );
  }

  verifyEmail() {
    this.authService.sendVerification();
  }
}
