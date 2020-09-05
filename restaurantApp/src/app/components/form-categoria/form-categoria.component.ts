import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../services/auth.service";
import { RestaurantesService } from "../../services/restaurantes.service";
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
  selector: "app-form-categoria",
  templateUrl: "./form-categoria.component.html",
  styleUrls: ["./form-categoria.component.scss"]
})
export class FormCategoriaComponent implements OnInit {
  @Input() editMode: boolean;
  @Input() categoria: any;

  restaurantes: any;
  userId: any;
  categoriaForm: FormGroup;
  downloadURL: any;
  disableSubmit: boolean = false;
  success: boolean = false;
  public selectedFile: any;

  constructor(
    private translate: TranslateService,
    private auth: AuthService,
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
    this.userId = await this.auth.getUId();
    console.log(this.userId);
    await this.res.setRestaurants();
    this.restaurantes = this.res.restaurantes;
  }

  initForm() {
    this.categoriaForm = new FormGroup({
      name: new FormControl(""),
      restaurant: new FormControl(""),
      description: new FormControl("")
    });
  }

  onChange(event) {
    this.selectedFile = event.target.files[0];
    this.disableSubmit = true;
    this.upLoad();
  }

  upLoad() {
    var fileName = this.selectedFile.name;

    var storageRef = firebase.storage().ref("Categorias Image/" + fileName);

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

  submitRestaurant() {
    if (this.editMode) {
      this.updateCategoria();
    } else {
      this.createCategoria();
    }
  }

  async createCategoria() {
    let dataAux = this.categoriaForm.value;
    let catInfo = {
      name: dataAux.name,
      restaurant: dataAux.restaurant,
      description: dataAux.description
    };
    this.cat.addCategoria(catInfo);

    this.categoriaForm.reset();
    this.downloadURL = "";

    alert("Categoría agregada exitosamente");

    this.router.navigateByUrl("/restaurantes");
  }

  updateCategoria() {
    let dataAux = this.categoriaForm.value;
    let catInfo = {
      name: dataAux.name,
      restaurant: dataAux.restaurant,
      image: this.downloadURL
    };
    this.cat.updateCategoria(catInfo);

    this.categoriaForm.reset();
    this.downloadURL = "";

    alert("successfully updated item");

    this.router.navigateByUrl("/categorias");
  }
}
