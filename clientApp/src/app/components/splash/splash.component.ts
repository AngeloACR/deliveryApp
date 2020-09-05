import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";

@Component({
  selector: "app-splash",
  templateUrl: "./splash.component.html",
  styleUrls: ["./splash.component.scss"]
})
export class SplashComponent implements OnInit {
  constructor(
    public modalCtrl: ModalController,
    public splashScreen: SplashScreen
  ) {}

  ionViewDidEnter() {}

  ngOnInit() {}
}
