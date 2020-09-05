import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class ProductosService {
  public productos: any;
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  getProductos() {
    this.productos = this.db.list("products");
  }

  addProducto(restInfo) {}

  updateProductoInfo(restInfo) {}

  updateProductoCategories(categories) {}

  updateProductoItems(items) {}

  deleteProducto() {}
}
