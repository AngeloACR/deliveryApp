import { Component, OnInit } from "@angular/core";
import { LoadingController, AlertController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Values } from "../../../providers/values";
import { ServiceProvider } from "../../../providers/service";
import * as firebase from "firebase";
import {
  PayPal,
  PayPalPayment,
  PayPalConfiguration
} from "@ionic-native/paypal/ngx";
import { Stripe } from "@ionic-native/stripe/ngx";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";

@Component({
  selector: "app-add-restaurant",
  templateUrl: "./add-restaurant.component.html",
  styleUrls: ["./add-restaurant.component.scss"]
})
export class AddRestaurantComponent implements OnInit {
  menutitle = "Agregar restaurante";

  form: any;
  currentUser: any;
  errorMessage: any;
  customer: any;
  restaurantName: any;
  cityName: any;
  cityDistrictName: any;
  streetName: any;
  apartmentOfficeName: any;

  public signupForm;
  loading: any;
  restaurantCategoryName: any;
  categoryName: any;
  public selectedFile: any;
  categoryDetails: any;
  downloadURL: any;
  disableSubmit: boolean = false;
  success: boolean = false;

  address: string;
  description: string;
  image: string;
  info: string;
  lat: string;
  long: string;
  mark: string;
  option: string;
  outlet: string;
  phonenumber: string;
  title: string;

  userId: any;

  constructor(
    public service: ServiceProvider,
    public values: Values,
    private payPal: PayPal,
    private stripe: Stripe,
    private router: Router,
    private route: ActivatedRoute,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private storage: Storage,
    public socialSharing: SocialSharing
  ) {}

  ngOnInit() {}
}
