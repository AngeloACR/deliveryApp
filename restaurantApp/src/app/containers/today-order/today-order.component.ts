import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-today-order',
  templateUrl: './today-order.component.html',
  styleUrls: ['./today-order.component.scss'],
})
export class TodayOrderComponent implements OnInit {
  title = "Pedidos de hoy";

  constructor() { }

  ngOnInit() {}

}
