import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CarCardComponent } from './car-card/car-card.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CarPageComponent } from './car-page/car-page.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AddCarComponent } from './add-car/add-car.component';

@NgModule({
  declarations: [DashboardPageComponent, CarCardComponent, CarPageComponent, AddCarComponent],
  imports: [CommonModule, DashboardRoutingModule, NzCardModule, NzButtonModule, FormsModule, NzInputModule, NzIconModule, NzDropDownModule, NzModalModule, NzRateModule, NzFormModule, ReactiveFormsModule, NzSelectModule],

})
export class DashboardModule { }
