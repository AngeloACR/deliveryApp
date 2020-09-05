import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
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

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
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
    path: "add-restaurant",
    component: AddRestaurantComponent
  },
  {
    path: "add-category",
    component: AddCategoryComponent
  },
  {
    path: "add-item",
    component: AddItemComponent
  },
  {
    path: "today-order",
    component: TodayOrderComponent
  },
  {
    path: "order-history",
    component: OrderHistoryComponent
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
    path: "pedidos",
    component: PedidosComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
