import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDataService } from '../../_core/services/car-data-service.service';
import { CarsService } from '../../_core/services/cars.service';

@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss']
})
export class CarPageComponent implements OnInit {
  carName!: string;
  carDescription!: string;
  carBrand!: string;
  carModel!: string;
  carYear!: number;
  carColor!: string;
  carHP!: number;
  carMileage!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private carDataService: CarDataService,
    private carsService: CarsService,
  ) {
    this.getCarInfo(this.activatedRoute.snapshot.queryParams['carId']);
  }

  ngOnInit(): void {
     this.carDescription = this.carDataService.selectedCar.description;
     this.carBrand = this.carDataService.selectedCar.brand;
     this.carModel = this.carDataService.selectedCar.model;
     this.carYear = this.carDataService.selectedCar.year;
     this.carColor = this.carDataService.selectedCar.color;
     this.carHP = this.carDataService.selectedCar.horsepower;
     this.carMileage = this.carDataService.selectedCar.mileage;
  }

  getCarInfo(id: number): void {
    this.carsService.getCarInfo(id).subscribe({
      next: (response) => {
        this.carDescription = response.description;
        this.carBrand = response.brand;
        this.carModel = response.model;
        this.carYear = response.year;
        this.carColor = response.color;
        this.carHP = response.horsepower;
        this.carMileage = response.mileage;
      }
    });
  }

  editCar(): void {
    const carInfo = {
      id: this.activatedRoute.snapshot.queryParams['carId'],
      brand: this.carBrand,
      model: this.carModel,
      year: this.carYear,
      color: this.carColor,
      horsepower: this.carHP,
      mileage: this.carMileage
    }
    this.carsService.updateCar(carInfo).subscribe();
  }

  deleteCar(): void {
    const carId = this.activatedRoute.snapshot.queryParams['carId'];
    this.carsService.deleteCar(carId).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}