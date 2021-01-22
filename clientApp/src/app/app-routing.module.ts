import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./containers/home/home.component";
import { LoginComponent } from "./containers/login/login.component";
import { RegistroComponent } from "./containers/registro/registro.component";

import { OrderHistoryComponent } from "./containers/order-history/order-history.component";
import { TrackDriversComponent } from "./containers/track-drivers/track-drivers.component";
import { RestaurantesComponent } from "./containers/restaurantes/restaurantes.component";
import { TaxiMapComponent } from "./containers/taxi-map/taxi-map.component";
import { ReviewPedidoComponent } from "./containers/review-pedido/review-pedido.component";
import { CarrerasComponent } from "./containers/carreras/carreras.component";
import { PedidosComponent } from "./containers/pedidos/pedidos.component";
import { CheckoutEatsComponent } from "./containers/checkout-eats/checkout-eats.component";
import { CheckoutTaxiComponent } from "./containers/checkout-taxi/checkout-taxi.component";
import { SplashComponent } from "./containers/splash/splash.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "splash",
    component: SplashComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegistroComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "pedidos",
    component: PedidosComponent
  },
  {
    path: "carreras",
    component: CarrerasComponent
  },
  {
    path: "track-drivers",
    component: TrackDriversComponent
  },
  {
    path: "restaurantes",
    component: RestaurantesComponent
  },
  {
    path: "taximap",
    component: TaxiMapComponent
  },
  {
    path: "review",
    component: ReviewPedidoComponent
  },
  {
    path: "checkouteats",
    component: CheckoutEatsComponent
  },
  {
    path: "checkouttaxi",
    component: CheckoutTaxiComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
