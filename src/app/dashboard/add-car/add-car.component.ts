import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CarsService } from 'src/app/_core/services/cars.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss'],
})
export class AddCarComponent implements OnInit {
  @Input() carInfo: any;
  @Output() add = new EventEmitter<any>();

  addCarForm!: FormGroup;
  isVisible!: boolean;
  
  constructor(private formBuilder: FormBuilder, private carsService: CarsService) {}

  ngOnInit(): void {
    this.addCarForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required, Validators.minLength(4)]],
      year: ['', [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]],
      color: ['', [Validators.required, Validators.minLength(3)]],
      horsepower: ['', [Validators.required, Validators.pattern(/^[1-9]\d{0,2}$|^1000$/)]],
      mileage: ['', [Validators.required, Validators.pattern(/^[1-9]\d{0,5}$/)]]
    });
  }

  showModal(): void {
    this.ngOnInit();
    this.isVisible = true;
  }

  modalCancel() {
    this.isVisible = false;
  }

  addCar(): void {
    if (this.addCarForm.invalid) return;
    this.carInfo = {
      ...this.addCarForm.value,
    };
    this.add.emit(this.carInfo);
    this.isVisible = false;
  }
}