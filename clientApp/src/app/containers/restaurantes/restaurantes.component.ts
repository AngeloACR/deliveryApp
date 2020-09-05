import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { NavController, LoadingController } from "@ionic/angular";
import { AlertController, Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { RestaurantesService } from "../../services/restaurantes.service";
import { CategoriasService } from "../../services/categorias.service";
import { ProductosService } from "../../services/productos.service";
//import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ListaRestaurantComponent } from "../../components/lista-restaurant/lista-restaurant.component";
import { CarritoService } from "../../services/carrito.service";

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
  verMenu = false;
  user: any;

  loading: any;
  token: any;

  isCategorias: boolean;
  isRestaurant: boolean;
  isProductos: boolean;
  isCarrito: boolean;

  restaurant: any;

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
    private carritoService: CarritoService,
    private prod: ProductosService,
    private res: RestaurantesService //public oneSignal: OneSignal, //public menuCtrl: MenuController,
  ) {}

  async ngOnInit() {}

  verCarrito() {
    this.router.navigateByUrl("/review");
  }

  async ionViewDidEnter() {
    this.title = "Restaurantes";
    this.carritoService.resetCart();
    this.isCategorias = false;
    this.isRestaurant = true;
    this.isProductos = false;
    this.isCarrito = false;
    await this.res.setRestaurants();
    this.restaurantes = this.res.restaurantes;
    this.restaurantesReady = true;
  }

  async verCategorias(restaurant) {
    console.log(restaurant);
    this.carritoService.restaurant = restaurant;
    console.log(this.carritoService.restaurant);
    this.restaurant = restaurant;
    this.restaurantId = restaurant.key;
    await this.cat.setCategorias(this.restaurantId);
    this.categorias = this.cat.categorias;
    console.log(this.categorias);
    this.title = "Categorías";

    this.verMenu = true;
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
    this.carritoService.resetCart();
  }

  async volverCategorias() {
    this.title = "Categorías";
    this.isCategorias = true;
    this.isRestaurant = false;
    this.isProductos = false;
  }
}
