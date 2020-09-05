import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverService } from '../services/driver.service';
import { TripsService } from '../services/trips.service';
import { TransactionsService } from '../services/transactions.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-driverinfo',
  templateUrl: './driverinfo.page.html',
  styleUrls: ['./driverinfo.page.scss'],
})
export class DriverinfoPage implements OnInit {
  key: any;
  driver: any = {};
  tabs: any = 'carinfo';
  trips: any = [];
  records: any = [];
  currency: any;

  constructor(
    private route: ActivatedRoute,
    private driverService: DriverService,
    private tripService: TripsService,
    private transactionService: TransactionsService,
    private db: AngularFireDatabase,
     private commonService: CommonService
  ) { }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('id')
    this.getDriverInfo();
  }

  getDriverInfo() {
    this.db.object('master_settings/prices/default/currency').valueChanges().subscribe(data => {
      console.log(data);
      this.currency = data;
    });
    this.driverService.getDriver(this.key).valueChanges().subscribe(snapshot => {
      console.log(snapshot)
      if (snapshot != null)
        this.driver = snapshot;
    })
  }

  getTrips() {
    this.tripService.getDriverTrips(this.key).valueChanges().subscribe((snap: any) => {
      console.log(snap);
      if (snap != null) {
        this.trips = snap;
      }
    })
  }

  getWallet() {
    this.transactionService.getDriverTransaction(this.key).valueChanges().subscribe((snap: any) => {
      console.log(snap);
      if(snap != null)
        this.records = snap
    })
  }

  updateDriver() {
  }
}
