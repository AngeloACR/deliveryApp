import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import { DriverService } from '../services/driver.service';


@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPage implements OnInit {

  drivers: any = [];

  constructor(
    private driverService: DriverService,
    private common: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers() {
    console.log('Getting drivers')
    this.driverService.getDrivers().snapshotChanges().subscribe((snapshot: any) => {

      if (snapshot != null) {
        let tmp = [];
        snapshot.forEach(snap => {
          let data = { key: snap.key, ...snap.payload.val() };
          tmp.push(data);
          return false;
        })
        this.drivers = tmp;
      }

    }, (err) => {
      console.log(err)
    });
  }

  delete(key) {
    this.driverService.deleteDriver(key).then(data => {
      this.common.showToast("Deleted");
    }).catch(err => this.common.showLoader(err.message));
  }

  changeStatus(key, status) {
    status = !status;
    this.driverService.updateDriver(key, { isApproved: status }).then(() => {
      this.common.showToast("Updated");
    }).catch(err => this.common.showToast("error"))
  }
}
