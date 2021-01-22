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
import { ThemeProvider } from "../providers/theme";
import { UsersProvider } from "../providers/users";
import { AuthService } from "./services/auth.service";
import { RestaurantesService } from "./services/restaurantes.service";
import { ServiceProvider } from "../providers/service";
import { Values } from "../providers/values";
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
      title: "Restaurantes",
      path: "/restaurantes",
      component: "RestaurantesComponent",
      icon: "pizza"
    },
    {
      title: "Agregar restaurantes",
      path: "/add-restaurant",
      component: "AddRestaurantComponent",
      icon: "restaurant"
    },
    {
      title: "Agregar categoría",
      path: "/add-category",
      component: "AddCategoryComponent",
      icon: "folder-open"
    },
    {
      title: "Agregar producto",
      path: "/add-item",
      component: "AddItemComponent",
      icon: "add-circle"
    } /* 
    {
      title: "Pedidos de hoy",
      path: "/today-order",
      component: "TodayOrderComponent",
      icon: "today"
    }, */,
    {
      title: "Historial de Pedidos",
      path: "/pedidos",
      component: "PedidosComponent",
      icon: "today"
    },
    {
      title: "Rastrear conductores",
      path: "/track-drivers",
      component: "TrackDriversComponent",
      icon: "car"
    }
  ];

  constructor(
    private themeProvider: ThemeProvider,
    private auth: AuthService,
    private fcm: FCM,
    private res: RestaurantesService,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    private storage: Storage,
    private db: AngularFireDatabase,
    public usersProv: UsersProvider,
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public values: Values,
    private translate: TranslateService,
    private geo: Geolocation,
    //    private oneSignal: OneSignal,
    //    private nativeAudio: NativeAudio,
    public service: ServiceProvider,
    private actionSheetController: ActionSheetController
  ) {
    this.initializeApp();
  }

  showSplash = true;

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
