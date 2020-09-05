import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { RestaurantesService } from "./restaurantes.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoriasService {
  public categorias: any;
  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService,
    private res: RestaurantesService
  ) {}

  async setCategorias(restaurantId) {
    try {
      let uid = await this.auth.getUId();
      console.log("here2");
      let snapshotAux = await this.getCategorias()
        .snapshotChanges()
        .pipe(take(1))
        .toPromise();
      this.categorias = [];
      snapshotAux.forEach((snap: any) => {
        let key = snap.key;
        let val = snap.payload.val();
        let aux = { key, ...val };
        if (aux.restaurant == restaurantId) {
          this.categorias.push(aux);
        }
      });

      /*       let snapshot = await this.getRestaurants()
        .valueChanges()
        .pipe(take(1))
        .toPromise();

      snapshot.forEach((snap: any) => {
        console.log(snap);
        this.restaurantes.push({
          id: snap.restaurantId,
          name: snap.name,
          address: snap.address,
          lat: snap.lat,
          long: snap.long,
          tlf: snap.tlf,
          icon: "ios-arrow-dropright",
          iconText: "Read more",
          firebase_url: snap.firebase_url,
          category: snap.category,
          description: snap.description
        });
        console.log(this.restaurantes);
      }); */
      return new Promise((resolve, reject) => {
        resolve("done");
      });
    } catch (error) {
      console.log(error.toString());
    }
  }

  getCategorias() {
    return this.db.list("categorias");
  }

  addCategoria(catInfo) {
    // create or update passenger
    this.db.list("categorias").push(catInfo);
  }

  updateCategoria(catInfo) {
    this.db.object("/categorias" + catInfo.key).update({
      name: catInfo.name,
      restaurant: catInfo.restaurant
    });
  }

  deleteRestaurant(item) {
    this.db.object("/categorias/" + item.key).remove();
  }
}
