import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CarPageComponent } from './car-page/car-page.component';


const routes: Routes = [
  {path: '',
  children: [
    { path : '', component: DashboardPageComponent},
    { path: 'carpage', component: CarPageComponent },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}