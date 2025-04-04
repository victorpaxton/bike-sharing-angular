import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../../shared/models/rental.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  constructor(private mockDataService: MockDataService) {}

  getRentals(): Observable<Rental[]> {
    return this.mockDataService.getRentals();
  }

  getRentalById(id: number): Observable<Rental | undefined> {
    return this.mockDataService.getRentalById(id);
  }

  createRental(rental: Omit<Rental, 'id'>): Observable<Rental> {
    return this.mockDataService.createRental(rental);
  }

  updateRental(id: number, updates: Partial<Rental>): Observable<Rental> {
    return this.mockDataService.updateRental(id, updates);
  }
} 