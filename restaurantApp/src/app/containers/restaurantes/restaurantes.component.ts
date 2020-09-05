import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { NavController, LoadingController } from "@ionic/angular";
import { AlertController, Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ServiceProvider } from "../../../providers/service";
import { RestaurantesService } from "../../services/restaurantes.service";
import { CategoriasService } from "../../services/categorias.service";
import { ProductosService } from "../../services/productos.service";
//import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Values } from "../../../providers/values";
import { ListaRestaurantComponent } from "../../components/lista-restaurant/lista-restaurant.component";

import { CallNumber } from "@ionic-native/call-number/ngx";

import { Router } from "@angular/router";

import * as firebase from "firebase";

@Component({
  selector: "app-restaurantes",
  templateUrl: "./restaurantes.component.html",
  styleUrls: ["./restaurantes.component.scss"]
})
export class RestaurantesComponent implements OnInit {
  title = "Restaurantes";
  @ViewChild(ListaRestaurantComponent) lista: ListaRestaurantComponent;

  categoryList: any;
  bannerList: any;
  firebasedata: any;
  public categoryId: any;

  restaurantes: any;
  categorias: any;
  productos: any;

  restauranteList: any;

  userProfiles: any;
  currentUser: any;
  restaurantesReady = false;
  categoriasReady = false;
  productosReady = false;
  user: any;

  loading: any;
  token: any;

  isCategorias: boolean;
  isRestaurant: boolean;
  isProductos: boolean;

  restaurantId: any;
  categoriaId: any;

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public service: ServiceProvider,
    public loadingCtrl: LoadingController,
    private callNumber: CallNumber,
    public values: Values,
    public router: Router,
    public zone: NgZone,
    private cat: CategoriasService,
    private prod: ProductosService,
    private res: RestaurantesService //public oneSignal: OneSignal, //public menuCtrl: MenuController,
  ) {}

  editRestaurant(restaurant) {
    //this.router.navigateByUrl("edit-restaurant");
  }

  deleteRestaurant(restaurant) {
    //this.service.deleteRestaurant(restaurantID);
  }

  editCategoria(categoria) {
    //this.router.navigateByUrl("edit-restaurant");
  }

  deleteCategoria(categoria) {
    //this.service.deleteRestaurant(restaurantID);
  }

  editProducto(producto) {
    //this.router.navigateByUrl("edit-restaurant");
  }

  deleteProducto(producto) {
    //this.service.deleteRestaurant(restaurantID);
  }

  async ngOnInit() {
    this.isCategorias = false;
    this.isRestaurant = true;
    this.isProductos = false;
  }

  async ionViewDidEnter() {
    await this.res.setRestaurants();
    this.restaurantes = this.res.restaurantes;
    this.restaurantesReady = true;
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "waiting",
      duration: 2000
    });
    return await this.loading.present();
  }

  async presentLoadings() {
    this.loading = await this.loadingCtrl.create({
      message: "loading",
      duration: 2000
    });
    return await this.loading.present();
  }

  async verCategorias(restaurant) {
    this.restaurantId = restaurant;
    await this.cat.setCategorias(this.restaurantId);
    this.categorias = this.cat.categorias;
    console.log(this.categorias);
    this.title = "Categorías";
    this.categoriasReady = true;
    this.isCategorias = true;
    this.isRestaurant = false;
    this.isProductos = false;
  }

  async verProductos(categoria) {
    this.categoriaId = categoria;
    await this.prod.setProductos(this.categoriaId);
    this.productos = this.prod.productos;
    this.title = "Productos";
    console.log(this.productos);
    this.productosReady = true;
    this.isCategorias = false;
    this.isRestaurant = false;
    this.isProductos = true;
    this.categoriaId = categoria;
  }

  volverRestaurantes() {
    this.title = "Restaurantes";
    this.isCategorias = false;
    this.isRestaurant = true;
    this.isProductos = false;
  }

  async volverCategorias() {
    this.title = "Categorías";
    this.isCategorias = true;
    this.isRestaurant = false;
    this.isProductos = false;
  }

  ionViewWillEnter() {}
}
