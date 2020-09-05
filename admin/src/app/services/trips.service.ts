import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private db: AngularFireDatabase) { }

  getTrips() {
    return this.db.list('trips');
  }
  getDriverTrips(key) {
    return this.db.list('trips', ref => ref.orderByChild('driverId').equalTo(key));
  }

  getRiderTrips(key) {
    return this.db.list('trips', ref => ref.orderByChild('passengerId').equalTo(key));
  }

}
