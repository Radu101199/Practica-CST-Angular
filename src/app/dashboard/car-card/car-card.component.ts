import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent implements OnInit {
  @Input() car: any;
  @Output() clickedMore = new EventEmitter<any>();
  constructor(router: Router) {}

  ngOnInit(): void {}

  navigateToCarPage() {
    const carId = this.car.id;
    this.clickedMore.emit(carId);
  }
}