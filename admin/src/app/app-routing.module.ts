import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'cars', loadChildren: './cars/cars.module#CarsPageModule' },
  { path: 'driverinfo/:id', loadChildren: './driverinfo/driverinfo.module#DriverinfoPageModule' },
  { path: 'drivers', loadChildren: './drivers/drivers.module#DriversPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'passengerinfo/:id', loadChildren: './passengerinfo/passengerinfo.module#PassengerinfoPageModule' },
  { path: 'passengers', loadChildren: './passengers/passengers.module#PassengersPageModule' },
  { path: 'promos', loadChildren: './promos/promos.module#PromosPageModule' },
  { path: 'trips', loadChildren: './trips/trips.module#TripsPageModule' },
  { path: 'withdraws', loadChildren: './withdraws/withdraws.module#WithdrawsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
