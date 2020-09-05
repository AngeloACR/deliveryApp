import { NgModule } from "@angular/core";
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

import { AppComponent } from "./app.component";
import { HomeComponent } from "./containers/home/home.component";
import { LoginComponent } from "./containers/login/login.component";
import { RegistroComponent } from "./containers/registro/registro.component";
import { PerfilComponent } from "./containers/perfil/perfil.component";
import { PedidosComponent } from "./containers/pedidos/pedidos.component";
import { CarrerasComponent } from "./containers/carreras/carreras.component";

import { SplashComponent } from "./components/splash/splash.component";
import { MapComponent } from "./components/map/map.component";
import { CarrerasListComponent } from "./components/carreras-list/carreras-list.component";
import { PedidosListComponent } from "./components/pedidos-list/pedidos-list.component";
import { CarreraInfoComponent } from "./components/carrera-info/carrera-info.component";
import { PedidoInfoComponent } from "./components/pedido-info/pedido-info.component";

import { AppRoutingModule } from "./app-routing.module";
import { AngularFireStorage } from "@angular/fire/storage";

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
    PerfilComponent,
    PedidosComponent,
    CarrerasComponent,
    CarrerasListComponent,
    PedidosListComponent,
    CarreraInfoComponent,
    PedidoInfoComponent
  ],
  entryComponents: [
    SplashComponent,
    MapComponent,
    CarrerasListComponent,
    PedidosListComponent,
    CarreraInfoComponent,
    PedidoInfoComponent
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
    AngularFireStorage,
    StatusBar,
    SplashScreen,
    Facebook,
    Stripe,
    CallNumber,
    SocialSharing,
    PayPal,
    InAppBrowser,
    Geolocation,
    //	OneSignal,
    //	NativeAudio,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
