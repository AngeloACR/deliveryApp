import { Component, OnInit } from "@angular/core";

import {
  Platform,
  MenuController,
  ToastController,
  ActionSheetController,
  ModalController
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
//import { OneSignal } from "@ionic-native/onesignal/ngx";
import { Storage } from "@ionic/storage";
import { environment } from "../environments/environment";
import { AuthService } from "./services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { finalize } from "rxjs/operators";
import * as firebase from "firebase";
import { TranslateService } from "@ngx-translate/core"; // add this
import { Geolocation } from "@ionic-native/geolocation/ngx";
//import { NativeAudio } from "@ionic-native/native-audio/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {
  user: any;

  public fireAuth: any;
  public userProfiles: any;

  public selectedIndex = 0;

  public appPages = [
    {
      title: "Home",
      path: "/home",
      component: "HomeComponent",
      icon: "home"
    },
    {
      title: "Carreras",
      path: "/carreras",
      component: "CarrerasComponent",
      icon: "car"
    },
    {
      title: "Deliverys",
      path: "/pedidos",
      component: "PedidosComponents",
      icon: "restaurant"
    },
    {
      title: "Perfil",
      path: "/perfil",
      component: "PerfilComponents",
      icon: "person"
    }
  ];

  constructor(
    private auth: AuthService,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    private storage: Storage,
    private router: Router,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private geo: Geolocation,
    //    private oneSignal: OneSignal,
    //    private nativeAudio: NativeAudio,
    private actionSheetController: ActionSheetController
  ) {
    this.initializeApp();
  }

  showSplash = true;

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.showSplash = false;
      }, 4000);

      this.storage.ready().then(async () => {
        let isLogged = await this.auth.getStatus();

        if (isLogged != null) {
          this.router.navigateByUrl("home");
        } else {
          this.router.navigateByUrl("login");
        }
      });
    });
  }

  ngOnInit() {
    let userLang = "spanish";
    this.translate.use(userLang);
  }

  ionViewWillEnter() {}

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg.body,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  async logout() {
    //this.service.removeOnesignalTokenId();

    await this.auth.logout();
    this.router.navigateByUrl("login");
  }
}
