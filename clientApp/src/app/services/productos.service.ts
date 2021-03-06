import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { RestaurantesService } from "./restaurantes.service";
import { CategoriasService } from "./categorias.service";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductosService {
  public productos: any;
  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService,
    private res: RestaurantesService,
    private cat: CategoriasService
  ) {}

  async setProductos(categoryId) {
    try {
      let uid = await this.auth.getUId();
      console.log("here2");
      let snapshotAux = await this.getProductos()
        .snapshotChanges()
        .pipe(take(1))
        .toPromise();
      this.productos = [];
      snapshotAux.forEach((snap: any) => {
        let key = snap.key;
        let val = snap.payload.val();
        let aux = { key, ...val };
        if (aux.category == categoryId) {
          this.productos.push(aux);
        }
      });

      return new Promise((resolve, reject) => {
        resolve("done");
      });
    } catch (error) {
      console.log(error.toString());
    }
  }

  getProductos() {
    return this.db.list("productos");
  }

  addProducto(prodInfo) {
    // create or update passenger
    this.db.list("productos").push(prodInfo);
  }

  updateProducto(prodInfo) {
    this.db.object("/productos" + prodInfo.key).update({
      description: prodInfo.description,
      price: prodInfo.price,
      available: prodInfo.available,
      name: prodInfo.name
    });
  }

  deleteRestaurant(item) {
    this.db.object("/productos/" + item.key).remove();
  }
}
