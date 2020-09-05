import { Component, OnInit, ViewChild, NgZone, Input } from "@angular/core";
import { NavController, LoadingController } from "@ionic/angular";
import { AlertController, Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { RestaurantesService } from "../../services/restaurantes.service";
import { CategoriasService } from "../../services/categorias.service";
import { ProductosService } from "../../services/productos.service";
import { CarritoService } from "../../services/carrito.service";
//import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ListaRestaurantComponent } from "../../components/lista-restaurant/lista-restaurant.component";

import { CallNumber } from "@ionic-native/call-number/ngx";

import { Router } from "@angular/router";

import * as firebase from "firebase";

@Component({
  selector: "app-menu-eats",
  templateUrl: "./menu-eats.component.html",
  styleUrls: ["./menu-eats.component.scss"]
})
export class MenuEatsComponent implements OnInit {
  title = "Restaurantes";
  @ViewChild(ListaRestaurantComponent) lista: ListaRestaurantComponent;

  @Input() restaurante: any;
  restLocation: any;
  categoryList: any;
  bannerList: any;
  firebasedata: any;
  restaurants: any;
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
  isCarrito: boolean;
  isPlaceSelection: boolean;

  restaurantId: any;
  categoriaId: any;

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private callNumber: CallNumber,
    public router: Router,
    public zone: NgZone,
    private cat: CategoriasService,
    private prod: ProductosService,
    private carritoService: CarritoService,
    private res: RestaurantesService //public oneSignal: OneSignal, //public menuCtrl: MenuController,
  ) {}

  async ngOnInit() {
    this.isCategorias = false;
    this.isRestaurant = true;
    this.isProductos = false;
    this.isCarrito = false;
    this.isPlaceSelection = false;
    this.restLocation = {
      lat: this.restaurante.lat,
      lng: this.restaurante.lng
    };
    this.carritoService.setRestaurant(this.restaurante);
  }

  goToCarrito(destino) {
    this.isCarrito = true;
    this.isCategorias = false;
    this.isRestaurant = false;
    this.isProductos = false;
  }

  selectLocation() {
    this.isCategorias = false;
    this.isRestaurant = false;
    this.isProductos = false;
    this.isCarrito = false;
    this.isPlaceSelection = true;
  }

  volverMenu() {}

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
