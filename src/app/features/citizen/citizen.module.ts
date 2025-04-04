import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BikeMapComponent } from './pages/bike-map/bike-map.component';
import { BikeReservationComponent } from './pages/bike-reservation/bike-reservation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'map', component: BikeMapComponent },
      { path: 'reservation/:stationId', component: BikeReservationComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    DashboardComponent,
    BikeMapComponent,
    BikeReservationComponent
  ]
})
export class CitizenModule { } 