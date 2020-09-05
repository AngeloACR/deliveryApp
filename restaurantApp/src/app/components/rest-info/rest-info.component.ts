import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RestaurantesService } from "../../services/restaurantes.service";
import { take } from "rxjs/operators";

@Component({
  selector: "app-rest-info",
  templateUrl: "./rest-info.component.html",
  styleUrls: ["./rest-info.component.scss"]
})
export class RestInfoComponent implements OnInit {
  @Input()
  restaurantId: any;

  restaurant: any;

  @Output()
  salir = new EventEmitter<any>();

  @Output()
  deal = new EventEmitter<any>();

  constructor(private restaurantService: RestaurantesService) {}

  ngOnInit() {
    console.log("Getting info");
    this.restaurantService
      .getRestaurant(this.restaurantId)
      .valueChanges()
      .pipe(take(1))
      .subscribe(snap => {
        this.restaurant = snap;
        console.log(this.restaurant);
      });
  }

  cerrar() {
    this.salir.emit();
  }

  pedirCarrera(event, restaurant) {
    this.deal.emit(this.restaurantId);
  }
}
