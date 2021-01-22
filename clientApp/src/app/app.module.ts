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
import { ConfirmPasswordValidator } from "./directives/must-match.validator";

import { HomeComponent } from "./containers/home/home.component";
import { CarrerasComponent } from "./containers/carreras/carreras.component";
import { PedidosComponent } from "./containers/pedidos/pedidos.component";
import { LoginComponent } from "./containers/login/login.component";
import { RegistroComponent } from "./containers/registro/registro.component";
import { OrderHistoryComponent } from "./containers/order-history/order-history.component";
import { TrackDriversComponent } from "./containers/track-drivers/track-drivers.component";
import { RestaurantesComponent } from "./containers/restaurantes/restaurantes.component";
import { CheckoutComponent } from "./containers/checkout/checkout.component";
import { PagosComponent } from "./containers/pagos/pagos.component";
import { PerfilComponent } from "./containers/perfil/perfil.component";
import { TaxiMapComponent } from "./containers/taxi-map/taxi-map.component";
import { CheckoutEatsComponent } from "./containers/checkout-eats/checkout-eats.component";
import { CheckoutTaxiComponent } from "./containers/checkout-taxi/checkout-taxi.component";
import { ReviewPedidoComponent } from "./containers/review-pedido/review-pedido.component";
import { SplashComponent } from "./containers/splash/splash.component";

import { MapComponent } from "./components/map/map.component";
import { CarritoComponent } from "./components/carrito/carrito.component";
import { CarrerasListComponent } from "./components/carreras-list/carreras-list.component";
import { PedidosListComponent } from "./components/pedidos-list/pedidos-list.component";
import { EatsDestinationComponent } from "./components/eats-destination/eats-destination.component";
import { PaymentGatewayComponent } from "./components/payment-gateway/payment-gateway.component";
import { MenuEatsComponent } from "./components/menu-eats/menu-eats.component";
import { DriverInfoComponent } from "./components/driver-info/driver-info.component";
import { DriverListComponent } from "./components/drivers-list/drivers-list.component";
import { ListaRestaurantComponent } from "./components/lista-restaurant/lista-restaurant.component";
import { ListaCategoriasComponent } from "./components/lista-categorias/lista-categorias.component";
import { ListaProductosComponent } from "./components/lista-productos/lista-productos.component";
import { SplitPagoComponent } from "./components/split-pago/split-pago.component";
import { AngularFireStorage } from "@angular/fire/storage";

import { CheckoutService } from "./services/checkout.service";

import { AppRoutingModule } from "./app-routing.module";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import {
  AngularFireFunctionsModule,
  FUNCTIONS_REGION,
} from '@angular/fire/functions';

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
    ConfirmPasswordValidator,
    LoginComponent,
    RegistroComponent,
    MenuEatsComponent,
    MapComponent,
    OrderHistoryComponent,
    TrackDriversComponent,
    RestaurantesComponent,
    ListaRestaurantComponent,
    ListaCategoriasComponent,
    ListaProductosComponent,
    CarritoComponent,
    CheckoutComponent,
    PagosComponent,
    PerfilComponent,
    TaxiMapComponent,
    DriverInfoComponent,
    DriverListComponent,
    EatsDestinationComponent,
    PaymentGatewayComponent,
    CheckoutEatsComponent,
    CheckoutTaxiComponent,
    SplitPagoComponent,
    CarrerasListComponent,
    PedidosListComponent,
    CarrerasComponent,
    PedidosComponent,
    ReviewPedidoComponent
  ],
  entryComponents: [
    CheckoutEatsComponent,
    CheckoutTaxiComponent,
    MapComponent,
    MenuEatsComponent,
    CarritoComponent,
    EatsDestinationComponent,
    PaymentGatewayComponent,
    DriverInfoComponent,
    DriverListComponent,
    SplashComponent,
    ListaRestaurantComponent,
    ListaCategoriasComponent,
    ListaProductosComponent,
    SplitPagoComponent,
    CarrerasListComponent,
    PedidosListComponent
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
    Facebook,
    FCM,
    Stripe,
    AngularFireStorage,
    CallNumber,
    HttpClient,
    SocialSharing,
    PayPal,
    InAppBrowser,
    Geolocation,
    //	OneSignal,
    //	NativeAudio,
    { provide: FUNCTIONS_REGION, useValue: 'us-central1' },
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
