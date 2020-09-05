import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { RestaurantLocationComponent } from "../../components/restaurant-location/restaurant-location.component";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../services/auth.service";
import { RestaurantesService } from "../../services/restaurantes.service";
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
  selector: "app-form-restaurant",
  templateUrl: "./form-restaurant.component.html",
  styleUrls: ["./form-restaurant.component.scss"]
})
export class FormRestaurantComponent implements OnInit {
  @ViewChild(RestaurantLocationComponent)
  restLocation: RestaurantLocationComponent;

  userId: any;
  @Input() editMode: boolean;
  @Input() restaurant: any;

  restaurantForm: FormGroup;
  downloadURL: any;
  disableSubmit: boolean = false;
  success: boolean = false;
  isPlaceSelection: boolean = false;
  location: any;
  public selectedFile: any;

  constructor(
    private translate: TranslateService,
    private auth: AuthService,
    private router: Router,
    private res: RestaurantesService,
    private menuCtrl: MenuController
  ) {
    this.translate.setDefaultLang("spanish");
    this.translate.use("spanish");
  }

  volverForm(location) {
    this.location = location;
    console.log(location);
    this.restaurantForm.controls["address"].setValue(location.vicinity);
    this.isPlaceSelection = false;
  }

  async ngOnInit() {
    this.location = {
      lat: "",
      lng: ""
    };
    this.initForm();
    this.userId = await this.auth.getUId();
    console.log(this.userId);
  }

  async selectLocation() {
    this.isPlaceSelection = true;
  }

  initForm() {
    console.log("Here");
    this.restaurantForm = new FormGroup({
      name: new FormControl(""),
      address: new FormControl(""),
      tlf: new FormControl(""),
      description: new FormControl("")
    });
    console.log("Here2");
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

  submitRestaurant() {
    if (this.editMode) {
      this.updateRestaurant();
    } else {
      this.createRestaurant();
    }
  }

  async createRestaurant() {
    let dataAux = this.restaurantForm.value;
    let restInfo = {
      address: dataAux.address,
      description: dataAux.description,
      image: this.downloadURL,
      location: this.location,
      tlf: dataAux.tlf,
      name: dataAux.name,
      ownerId: this.userId
    };
    this.res.addRestaurant(restInfo);

    this.restaurantForm.reset();
    this.downloadURL = "";

    alert("Restaurante agregado exitosamente");

    this.router.navigateByUrl("/restaurantes");
  }

  updateRestaurant() {
    let dataAux = this.restaurantForm.value;
    let restInfo = {
      address: dataAux.address,
      description: dataAux.description,
      image: this.downloadURL,
      location: this.location,
      tlf: dataAux.tlf,
      name: dataAux.name,
      ownerId: this.userId
    };
    this.res.updateRestaurant(restInfo);

    this.restaurantForm.reset();
    this.downloadURL = "";

    alert("successfully updated item");

    this.router.navigateByUrl("/restaurantes");
  }
}
