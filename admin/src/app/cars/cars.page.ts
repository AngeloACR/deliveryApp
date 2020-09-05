import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {
  cars: any = [];
  newCar = { name: '', icon: '', type: '', price: 0, enable: true, map_icon: '' };
  carTemp: any = [];
  currency: any;
  constructor(private db: AngularFireDatabase, private commonService: CommonService) { }

  ngOnInit() {
    this.getCarInfo();
  }

  getCarInfo() {
    this.db.object('master_settings/prices/default/currency').valueChanges().subscribe(data => {
      console.log(data);
      this.currency = data;
    });

    this.db.list("master_settings/prices/default/vehicles/").snapshotChanges().subscribe((snap: any) => {
      let tmp = [];
      snap.forEach(car => {
        tmp.push({ key: car.key, ...car.payload.val() });
        return false;
      })
      this.cars = tmp;
    });
  }
  delete(key) {
    this.db.object('master_settings/prices/default/vehicles/' + key).remove();
  }
  add() {
    this.newCar.type = (this.newCar.name).toLowerCase().trim().split(' ').join('_');
    console.log(this.newCar);
    this.db.object('master_settings/prices/default/vehicles/' + this.newCar.type).set(this.newCar).then(data => {
      this.commonService.showToast("Added");
      this.newCar = { name: '', icon: '', type: '', price: 0, enable: true, map_icon: '' };
    });
  }
  update(i) {
    let car = this.cars[i];
    this.db.object('master_settings/prices/default/vehicles/' + car.key).update(car).then(data => {
      this.commonService.showToast("Updated");
    }).catch(err => console.log(err));
  }
  updateCurrency() {
    this.db.object('master_settings/prices/default/currency').set(this.currency).then(() => {
      this.commonService.showToast("Updated");
    });
  }
  setDefault() {
    this.db.object('master_settings').set({
      "prices": {
        "default": {
          "currency": "$",
          "vehicles": {
            "sedan": {
              "enable": true,
              "icon": "assets/img/sedan.svg",
              "name": "Sedan",
              "price": 0.2,
              "type": "sedan",
              "map_icon": "assets/img/map-sedan.png"
            },
            "suv": {
              "enable": true,
              "icon": "assets/img/suv.svg",
              "name": "SUV",
              "price": 0.2,
              "type": "suv",
              "map_icon": "assets/img/map-suv.png"
            },
            "taxi": {
              "enable": true,
              "icon": "assets/img/taxi.svg",
              "name": "Taxi",
              "price": 0.4,
              "type": "taxi",
              "map_icon": "assets/img/map-taxi.png"
            }
          }
        }
      }
    }
    )
  }
}
