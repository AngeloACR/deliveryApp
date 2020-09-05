import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DriverService {



  constructor(private db: AngularFireDatabase) { }

  getDrivers() {
    return this.db.list('drivers');
  }

  getDriver(key) {
    return this.db.object('drivers/' + key);
  }

  deleteDriver(key) {
    return this.db.object('drivers/' + key).remove();
  }

  updateDriver(key, data) {
    return this.db.object('drivers/' + key).update(data);
  }
}
