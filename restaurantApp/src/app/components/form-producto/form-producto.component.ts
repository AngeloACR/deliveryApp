import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../services/auth.service";
import { RestaurantesService } from "../../services/restaurantes.service";
import { ProductosService } from "../../services/productos.service";
import { CategoriasService } from "../../services/categorias.service";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import * as firebase from "firebase";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-form-producto",
  templateUrl: "./form-producto.component.html",
  styleUrls: ["./form-producto.component.scss"]
})
export class FormProductoComponent implements OnInit {
  productForm: FormGroup;
  restaurantes: any[];
  categorias: any[];
  @Input() editMode: boolean;
  @Input() producto: any;

  downloadURL: any;
  disableSubmit: boolean = false;
  success: boolean = false;
  public selectedFile: any;

  constructor(
    private translate: TranslateService,
    private auth: AuthService,
    private product: ProductosService,
    private router: Router,
    private res: RestaurantesService,
    private cat: CategoriasService,
    private menuCtrl: MenuController
  ) {
    this.translate.setDefaultLang("spanish");
    this.translate.use("spanish");
  }
  async ngOnInit() {
    this.initForm();
    await this.res.setRestaurants();
    this.restaurantes = this.res.restaurantes;
  }

  async toggleCat() {
    console.log("here");
    let dataAux = this.productForm.value;
    this.productForm.controls["category"].setValue("");
    await this.cat.setCategorias(dataAux.restaurant);
    this.categorias = this.cat.categorias;
  }

  initForm() {
    this.productForm = new FormGroup({
      name: new FormControl(""),
      available: new FormControl(""),
      description: new FormControl(""),
      restaurant: new FormControl(""),
      category: new FormControl(""),
      price: new FormControl("")
    });
  }

  onChange(event) {
    this.selectedFile = event.target.files[0];
    this.disableSubmit = true;
    this.upLoad();
  }

  upLoad() {
    var fileName = this.selectedFile.name;

    var storageRef = firebase.storage().ref("Restaurant Image/" + fileName);

    var metadata = { contentType: "image/jpeg" };

    var uploadTask = storageRef.put(this.selectedFile, metadata);

    uploadTask.on(
      "state_changed",
      snapshot => {
        console.log(snapshot);

        var progress =
          (uploadTask.snapshot.bytesTransferred /
            uploadTask.snapshot.totalBytes) *
          100;

        console.log("upload" + progress + "% done");

        switch (uploadTask.snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or Paused
            console.log("upLoad is paused");
            break;

          case firebase.storage.TaskState.RUNNING: // OR Running
            console.log("upload is running");
            break;
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.disableSubmit = false;

        storageRef.getDownloadURL().then(ref => {
          console.log(ref);
          this.downloadURL = ref;
        });

        console.log(this.downloadURL);
        console.log("success");

        this.success = true;
      }
    );
  }

  submitProduct() {
    if (this.editMode) {
      this.updateProducto();
    } else {
      this.createProducto();
    }
  }

  async createProducto() {
    let dataAux = this.productForm.value;
    let productInfo = {
      description: dataAux.description,
      price: dataAux.price,
      available: dataAux.available,
      name: dataAux.name,
      category: dataAux.category,
      restaurant: dataAux.restaurant
    };
    this.product.addProducto(productInfo);

    this.productForm.reset();
    this.downloadURL = "";

    alert("Producto agregado exitosamente");

    this.router.navigateByUrl("/restaurantes");
  }

  updateProducto() {
    let dataAux = this.productForm.value;
    let productInfo = {
      description: dataAux.description,
      price: dataAux.price,
      available: dataAux.available,
      name: dataAux.name
    };
    this.product.updateProducto(productInfo);

    this.productForm.reset();
    this.downloadURL = "";

    alert("successfully updated item");

    this.router.navigateByUrl("/restaurantes");
  }
}
