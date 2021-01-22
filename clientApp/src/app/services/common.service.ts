import { Injectable } from "@angular/core";
import {
  ToastController,
  AlertController,
  LoadingController,
  Platform
} from "@ionic/angular";

declare var cordova;

@Injectable({
  providedIn: "root"
})
export class CommonService {
  loader: any;

  constructor(
    private toast: ToastController,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private platform: Platform
  ) {}

  showToast(message) {
    this.toast.create({ message: message, duration: 2000 }).then(res => {
      res.present();
    });
  }

  showAlert(message) {
    this.alertCtrl
      .create({
        message: message,
        buttons: ["ok"]
      })
      .then(res => res.present());
  }

  async showLoader() {
    try {
      console.log("here");
      this.loader = await this.loadCtrl.create({
        message:
          '<ion-img src="/assets/img/splash.gif" alt="loading..."></ion-img>',
        translucent: true,
        showBackdrop: false,
        spinner: null
      });
      return await this.loader.present();
    } catch (error) {
      console.log(error.toString());
    }
  }

  hideLoader() {
    this.loader.dismiss();
  }

  enableBgMode() {
    if (this.platform.is("android") || this.platform.is("ios")) {
      const options = {
        title: "Driver App",
        text: "Driver App runs Background",
        hidden: false,
        silent: true
      };

      cordova.plugins.backgroundMode.setDefaults(options);
      cordova.plugins.backgroundMode.enable();
      cordova.plugins.backgroundMode.on("enable", () => {
        console.log("background mode activated !!!");
        cordova.plugins.backgroundMode.disableWebViewOptimizations();
        cordova.plugins.backgroundMode.disableBatteryOptimizations();
      });
    } else {
      // this.showToast("Background mode only works on device");
    }
  }

  disableBgMode() {
    cordova.plugins.backgroundMode.disable();
  }
}
