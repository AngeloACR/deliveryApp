import { Component, OnInit } from "@angular/core";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { AngularFireDatabase } from "@angular/fire/database";

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
  showSplash: boolean = true;

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
      title: "Restaurantes",
      path: "/restaurantes",
      component: "RestaurantesComponent",
      icon: "pizza"
    },
    {
      title: "Taxi",
      path: "/taximap",
      component: "TaxiMapComponent",
      icon: "car"
    },
    {
      title: "Pedidos",
      path: "/pedidos",
      component: "PedidosComponent",
      icon: "Pizza"
    },
    {
      title: "Carreras",
      path: "/carreras",
      component: "CarrerasComponent",
      icon: "car"
    },
    {
      title: "Rastrear conductores",
      path: "/track-drivers",
      component: "TrackDriversComponent",
      icon: "car"
    },
    {
      title: "Pagos",
      url: "/payments",
      icon: "card"
    },
    {
      title: "Perfil",
      url: "/profile",
      icon: "contact"
    }
  ];

  constructor(
    private auth: AuthService,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    private storage: Storage,
    private fcm: FCM,
    private db: AngularFireDatabase,
    private router: Router,
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

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.router.navigateByUrl("splash");
        setTimeout(async () => {
          let isLogged = await this.auth.getStatus();
          this.showSplash = false;
            if (this.platform.is("ios")) {
            this.fcm.hasPermission().then(hasPermission => {
              if (hasPermission) {
                this.pushSetup();
              }
            });
          } else {
            this.fcm.hasPermission().then(hasPermission => {
              if (hasPermission) {
                this.pushSetup();
              }
            });
          } 

          if (isLogged != null) {
            this.router.navigateByUrl("home");
          } else {
            this.router.navigateByUrl("login");
          }
        }, 7000);
      });
    });
  }

  pushSetup() {
    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      // Register your new token in your back-end if you want
      this.auth.setToken(token);
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
