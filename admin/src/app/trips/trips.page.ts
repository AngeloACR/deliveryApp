import { Component, OnInit } from '@angular/core';
import { TripsService } from '../services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {
  trips: any = []
  constructor(private tripService: TripsService) { }

  ngOnInit() {
    this.getTrips()
  }

  getTrips() {
    this.tripService.getTrips().valueChanges().subscribe(snap => {
      if (snap != null)
        this.trips = snap
    })
  }

}
