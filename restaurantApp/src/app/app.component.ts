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
    private res: RestaurantesService,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    private storage: Storage,
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
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.showSplash = false;
      }, 4000);

      /*       setTimeout(async () => {
        await this.oneSignal.startInit(
          environment.onesignal.appId,
          environment.onesignal.googleProjectNumber
        );
        this.oneSignal.getIds().then(data => {
          localStorage.setItem("fcm", data.userId);
        });
        this.oneSignal.enableSound(true);
        await this.oneSignal.endInit();
      }, 1000);

      this.oneSignal.handleNotificationReceived().subscribe(data => {
        console.log("got order", data);

        //this.presentActionSheet();
      });
      this.oneSignal.inFocusDisplaying(2);
 */

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
    /*     this.fireAuth = firebase.auth();

    console.log(this.fireAuth);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.values.userRole = firebase
          .database()
          .ref("/users")
          .child(user.uid)
          .on("value", snapshot => {
            if (snapshot.val()) {
              this.userProfiles = snapshot.val();
            }
          });
      }
    });

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.values.isLoggedIn = true;
        this.values.userRole = firebase
          .database()
          .ref("/Customer-Role")
          .child(user.uid)
          .on("value", snapshot => {
            if (snapshot.val()) {
              this.values.userRole = snapshot.val().role;
            }
          });
      } 
    });*/

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
