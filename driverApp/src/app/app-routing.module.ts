import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./containers/home/home.component";
import { LoginComponent } from "./containers/login/login.component";
import { RegistroComponent } from "./containers/registro/registro.component";
import { CarrerasComponent } from "./containers/carreras/carreras.component";
import { PedidosComponent } from "./containers/pedidos/pedidos.component";
import { PerfilComponent } from "./containers/perfil/perfil.component";
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
    path: "carreras",
    component: CarrerasComponent
  },
  {
    path: "pedidos",
    component: PedidosComponent
  },
  {
    path: "perfil",
    component: PerfilComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
