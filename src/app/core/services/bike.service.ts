import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bike } from '../../shared/models/bike.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  constructor(private mockDataService: MockDataService) {}

  getBikes(): Observable<Bike[]> {
    return this.mockDataService.getBikes();
  }

  getBikeById(id: number): Observable<Bike | undefined> {
    return this.mockDataService.getBikeById(id);
  }

  updateBikeStatus(id: number, status: Bike['status']): Observable<Bike> {
    return this.mockDataService.updateBikeStatus(id, status);
  }
} 