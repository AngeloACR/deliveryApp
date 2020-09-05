import { Component } from '@angular/core';

import { Platform, ModalController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Drivers',
      url: '/drivers',
      icon: 'contacts'
    },
    {
      title: 'Passengers',
      url: '/passengers',
      icon: 'contacts'
    },
    {
      title: 'Trips',
      url: '/trips',
      icon: 'compass'
    },
    {
      title: 'Withdrawl',
      url: '/withdraws',
      icon: 'card'
    },
    {
      title: 'Promo/Coupons',
      url: '/promos',
      icon: 'cash'
    },
    {
      title: 'Cars & Currency',
      url: '/cars',
      icon: 'car'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.afAuth.auth.onAuthStateChanged(auth => {
      console.log(auth);
      if (auth == null) {
        this.router.navigateByUrl('/login');
        this.menuCtrl.enable(false)
      }
      else {
        this.router.navigateByUrl('/home');
        this.menuCtrl.enable(true);
      }
    });

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
