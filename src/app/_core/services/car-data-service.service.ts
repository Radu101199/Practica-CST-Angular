import { Injectable } from '@angular/core';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarDataService {
  selectedCar!: Car;

  constructor() { }
}