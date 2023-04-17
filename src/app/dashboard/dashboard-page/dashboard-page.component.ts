import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/_core/models/car';
import { CarDataService } from 'src/app/_core/services/car-data-service.service';
import { CarsService } from 'src/app/_core/services/cars.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  carList: Car[] = [];
  searched: string = '';
  carName!: string;
  carDescription!: string;
  carBrand!: string;
  carModel!: string;
  carYear!: number;
  carColor!: string;
  carHP!: number;
  carMileage!: number;
  selectedItem: string = 'title';
  lastSelected = 'title';
  iconType = 'caret-up';
  searchTerm: string = '';

  constructor(
    private router: Router,
    private carsService: CarsService,
    private carDataService: CarDataService,
  ) { }

  ngOnInit(): void {
    this.carsService.getCars().subscribe((res) => {
      this.carList = res;
      if (this.selectedItem == 'entry') {
        if (this.iconType == 'caret-down') this.carList.reverse();
      } else this.sort(false);
    });
  }

  navigateToCarPage(carInfo: any): void {
    this.carDataService.selectedCar = carInfo;
    console.log(carInfo.id);
    this.router.navigate(['carpage'], { queryParams: { carId: carInfo.id } });
  }

  addNewCar(carInfo: any) {
    this.carsService.addCar(carInfo).subscribe((res) => {
      if (
        this.searchTerm == '' ||
        res.title.toLowerCase().includes(this.searchTerm) ||
        res.model.toLowerCase().includes(this.searchTerm) ||
        res.brand.toString().includes(this.searchTerm) ||
        res.year.toString().includes(this.searchTerm) ||
        res.color.toLowerCase().includes(this.searchTerm) ||
        res.horsepower.toLowerCase().includes(this.searchTerm) ||
        res.mileage.toLowerCase().includes(this.searchTerm)
      )
        this.carList.push(res);
    });
  }

  search() {
    if (this.searched == '') return this.ngOnInit();
    this.searchTerm = this.searched.toLowerCase();
    this.carsService.getCars().subscribe((res) => {
      this.carList = res.filter((car: any) => {
        return (
          car.brand.toLowerCase().includes(this.searchTerm) ||
          car.model.toString().includes(this.searchTerm) ||
          car.year.toString().includes(this.searchTerm) ||
          car.color.toLowerCase().includes(this.searchTerm) ||
          car.horsepower.toString().includes(this.searchTerm) ||
          car.mileage.toString().includes(this.searchTerm)
        );
      });
      this.sort(false);
    });
  }
  removeSearch() {
    this.searched = '';
    this.searchTerm = '';
    this.carsService.getCars();
  }
  sort(bool: boolean) {
    if (bool && this.lastSelected == this.selectedItem) {
      this.iconType = this.iconType == 'caret-up' ? 'caret-down' : 'caret-up';
      this.carList.reverse();
    } else {
      this.lastSelected = this.selectedItem;
      if (this.selectedItem == 'entry') {
        if (this.iconType == 'caret-up')
          this.carList.sort((a, b) => (a['title'] > b['title'] ? 1 : -1));
        else this.carList.sort((a, b) => (a['title'] < b['title'] ? 1 : -1));
      } else if (this.iconType == 'caret-up') {
        this.carList.sort((a, b) =>
          a[this.selectedItem] > b[this.selectedItem] ? 1 : -1
        );
      } else
        this.carList.sort((a, b) =>
          a[this.selectedItem] < b[this.selectedItem] ? 1 : -1
        );
    }
  }

  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigate(['auth']);
  }
}