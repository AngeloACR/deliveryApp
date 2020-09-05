import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loader: any;
  constructor(private toastCtrl: ToastController, private loadCtrl: LoadingController) { }

  showToast(message) {
    this.toastCtrl.create({
      message: message,
      duration: 2000
    }).then(r => r.present());
  }

  showLoader(message) {
    this.loadCtrl.create({ message: message }).then(res => {
      res.present();
    })
  }

  hideLoader() {
    this.loadCtrl.dismiss();
  }



}
