import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { IonicStorageModule } from "@ionic/storage";
import * as firebase from "firebase";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { environment } from "../environments/environment";
import { UsersProvider } from "../providers/users";
import { ThemeProvider } from "../providers/theme";
import { ServiceProvider } from "../providers/service";
import { AngularFireStorage } from "@angular/fire/storage";
import { Values } from "../providers/values";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import {
  PayPal,
  PayPalPayment,
  PayPalConfiguration
} from "@ionic-native/paypal/ngx";
import { Stripe } from "@ionic-native/stripe/ngx";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
//import { OneSignal } from '@ionic-native/onesignal/ngx';
//import { NativeAudio } from '@ionic-native/native-audio/ngx';

// Componentes externos que realizan peticiones
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Geolocation } from "@ionic-native/geolocation/ngx";

//follow location
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { ConfirmPasswordValidator } from "./directives/must-match.validator";

import { AppComponent } from "./app.component";
import { SplashComponent } from "./containers/splash/splash.component";
import { MapComponent } from "./components/map/map.component";
import { HomeComponent } from "./containers/home/home.component";
import { LoginComponent } from "./containers/login/login.component";
import { RegistroComponent } from "./containers/registro/registro.component";

import { AddCategoryComponent } from "./containers/add-category/add-category.component";
import { AddItemComponent } from "./containers/add-item/add-item.component";
import { AddRestaurantComponent } from "./containers/add-restaurant/add-restaurant.component";
import { OrderHistoryComponent } from "./containers/order-history/order-history.component";
import { TodayOrderComponent } from "./containers/today-order/today-order.component";
import { TrackDriversComponent } from "./containers/track-drivers/track-drivers.component";
import { RestaurantesComponent } from "./containers/restaurantes/restaurantes.component";
import { PedidosComponent } from "./containers/pedidos/pedidos.component";

import { RestaurantLocationComponent } from "./components/restaurant-location/restaurant-location.component";
import { FormRestaurantComponent } from "./components/form-restaurant/form-restaurant.component";
import { FormCategoriaComponent } from "./components/form-categoria/form-categoria.component";
import { FormProductoComponent } from "./components/form-producto/form-producto.component";
import { ListaRestaurantComponent } from "./components/lista-restaurant/lista-restaurant.component";
import { ListaCategoriasComponent } from "./components/lista-categorias/lista-categorias.component";
import { ListaProductosComponent } from "./components/lista-productos/lista-productos.component";
import { RestInfoComponent } from "./components/rest-info/rest-info.component";
import { DriverInfoComponent } from "./components/driver-info/driver-info.component";
import { DriversListComponent } from "./components/drivers-list/drivers-list.component";
import { PedidosListComponent } from "./components/pedidos-list/pedidos-list.component";
import { FindDriverComponent } from "./components/find-driver/find-driver.component";

import { AppRoutingModule } from "./app-routing.module";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import {
  AngularFireFunctionsModule,
  FUNCTIONS_REGION
} from "@angular/fire/functions";

export const firebaseConfig = {
  apiKey: "AIzaSyC1yKacAVVJAlen2jHu39M0XsYavtYFIEY",
  authDomain: "tukonline-3c1f8.firebaseapp.com",
  databaseURL: "https://tukonline-3c1f8.firebaseio.com",
  projectId: "tukonline-3c1f8",
  storageBucket: "tukonline-3c1f8.appspot.com",
  messagingSenderId: "451399025593",
  appId: "1:451399025593:web:54fe13e3aa2fd8faf8ec68",
  measurementId: "G-ZB3ZR0FJBK"
};

firebase.initializeApp(firebaseConfig);

export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    MapComponent,
    AddCategoryComponent,
    AddItemComponent,
    AddRestaurantComponent,
    OrderHistoryComponent,
    TodayOrderComponent,
    TrackDriversComponent,
    RestaurantesComponent,
    PedidosComponent,
    ConfirmPasswordValidator,
    FormRestaurantComponent,
    FormCategoriaComponent,
    FormProductoComponent,
    ListaRestaurantComponent,
    ListaCategoriasComponent,
    ListaProductosComponent,
    RestaurantLocationComponent,
    RestInfoComponent,
    DriverInfoComponent,
    DriversListComponent,
    PedidosListComponent,
    FindDriverComponent
  ],
  entryComponents: [
    SplashComponent,
    MapComponent,
    FormRestaurantComponent,
    FormCategoriaComponent,
    FormProductoComponent,
    ListaRestaurantComponent,
    ListaCategoriasComponent,
    ListaProductosComponent,
    RestInfoComponent,
    DriverInfoComponent,
    DriversListComponent,
    PedidosListComponent,
    FindDriverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UsersProvider,
    ThemeProvider,
    ServiceProvider,
    Values,
    FCM,
    Facebook,
    Stripe,
    HttpClient,
    CallNumber,
    AngularFireStorage,
    SocialSharing,
    PayPal,
    InAppBrowser,
    Geolocation,
    //	OneSignal,
    //	NativeAudio,
    { provide: FUNCTIONS_REGION, useValue: "us-central1" },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
