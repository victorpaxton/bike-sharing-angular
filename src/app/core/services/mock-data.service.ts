import { Injectable } from '@angular/core';
import { Bike } from '../../shared/models/bike.model';
import { Rental } from '../../shared/models/rental.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private mockBikes: Bike[] = [
    {
      id: 1,
      name: 'City Cruiser 1',
      type: 'manual',
      status: 'available',
      location: {
        latitude: 40.7128,
        longitude: -74.0060,
        address: '123 Main St, New York, NY'
      },
      pricePerHour: 5,
      lastMaintenanceDate: '2024-03-15'
    },
    {
      id: 2,
      name: 'E-Bike Pro 1',
      type: 'electric',
      status: 'available',
      location: {
        latitude: 40.7129,
        longitude: -74.0061,
        address: '456 Park Ave, New York, NY'
      },
      pricePerHour: 8,
      batteryLevel: 85,
      lastMaintenanceDate: '2024-03-20'
    },
    {
      id: 3,
      name: 'City Cruiser 2',
      type: 'manual',
      status: 'rented',
      location: {
        latitude: 40.7130,
        longitude: -74.0062,
        address: '789 Broadway, New York, NY'
      },
      pricePerHour: 5,
      lastMaintenanceDate: '2024-03-10'
    }
  ];

  private mockRentals: Rental[] = [
    {
      id: 1,
      bikeId: 3,
      userId: 1,
      startTime: '2024-04-04T10:00:00Z',
      status: 'active',
      startLocation: {
        latitude: 40.7130,
        longitude: -74.0062,
        address: '789 Broadway, New York, NY'
      }
    }
  ];

  // Simulate API delay
  private simulateDelay<T>(data: T): Observable<T> {
    return of(data).pipe(delay(500));
  }

  // Bike methods
  getBikes(): Observable<Bike[]> {
    return this.simulateDelay(this.mockBikes);
  }

  getBikeById(id: number): Observable<Bike | undefined> {
    const bike = this.mockBikes.find(b => b.id === id);
    return this.simulateDelay(bike);
  }

  updateBikeStatus(id: number, status: Bike['status']): Observable<Bike> {
    const bike = this.mockBikes.find(b => b.id === id);
    if (bike) {
      bike.status = status;
    }
    return this.simulateDelay(bike!);
  }

  // Rental methods
  getRentals(): Observable<Rental[]> {
    return this.simulateDelay(this.mockRentals);
  }

  getRentalById(id: number): Observable<Rental | undefined> {
    const rental = this.mockRentals.find(r => r.id === id);
    return this.simulateDelay(rental);
  }

  createRental(rental: Omit<Rental, 'id'>): Observable<Rental> {
    const newRental = {
      ...rental,
      id: this.mockRentals.length + 1
    };
    this.mockRentals.push(newRental);
    return this.simulateDelay(newRental);
  }

  updateRental(id: number, updates: Partial<Rental>): Observable<Rental> {
    const rental = this.mockRentals.find(r => r.id === id);
    if (rental) {
      Object.assign(rental, updates);
    }
    return this.simulateDelay(rental!);
  }
} 