import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BikeService } from '../../../../core/services/bike.service';
import { RentalService } from '../../../../core/services/rental.service';
import { Bike } from '../../../../shared/models/bike.model';
import { Rental } from '../../../../shared/models/rental.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  activeRentals: Rental[] = [];
  recentRides: Rental[] = [];
  nearbyBikes: Bike[] = [];
  accountSummary = {
    balance: 24,
    totalRides: 24,
    distance: 156,
    points: 1250
  };
  subscription = {
    type: 'Premium Monthly Plan',
    validUntil: new Date('2025-04-30'),
    features: ['Unlimited 60-minute rides']
  };

  constructor(
    private bikeService: BikeService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.loadActiveRentals();
    this.loadRecentRides();
    this.loadNearbyBikes();
  }

  private loadActiveRentals(): void {
    this.rentalService.getRentals().subscribe(rentals => {
      this.activeRentals = rentals
        .filter(rental => rental.status === 'active')
        .map(rental => ({
          ...rental,
          duration: this.calculateDuration(rental),
          distance: this.calculateDistance(rental)
        }));
    });
  }

  private loadRecentRides(): void {
    this.rentalService.getRentals().subscribe(rentals => {
      this.recentRides = rentals
        .filter(rental => rental.status === 'completed')
        .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
        .slice(0, 5)
        .map(rental => ({
          ...rental,
          distance: this.calculateDistance(rental),
          duration: this.calculateDuration(rental)
        }));
    });
  }

  private loadNearbyBikes(): void {
    this.bikeService.getBikes().subscribe(bikes => {
      this.nearbyBikes = bikes.filter(bike => bike.status === 'available');
    });
  }

  private calculateDistance(rental: Rental): number {
    if (rental.startLocation && rental.endLocation) {
      // Calculate actual distance using coordinates
      const lat1 = rental.startLocation.latitude;
      const lon1 = rental.startLocation.longitude;
      const lat2 = rental.endLocation.latitude;
      const lon2 = rental.endLocation.longitude;
      
      return this.calculateHaversineDistance(lat1, lon1, lat2, lon2);
    }
    // Return a random distance for active rentals or rentals without end location
    return Math.floor(Math.random() * 10) + 1;
  }

  private calculateDuration(rental: Rental): number {
    const start = new Date(rental.startTime);
    const end = rental.endTime ? new Date(rental.endTime) : new Date();
    const durationMs = end.getTime() - start.getTime();
    return Math.round(durationMs / (1000 * 60)); // Convert to minutes
  }

  private calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10; // Round to 1 decimal place
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  endRental(rental: Rental): void {
    // Implement end rental logic
    console.log('Ending rental:', rental.id);
  }

  reportIssue(rental: Rental): void {
    // Implement report issue logic
    console.log('Reporting issue for rental:', rental.id);
  }

  findBike(): void {
    // Implement find bike logic
    console.log('Finding available bikes...');
  }

  viewRoute(rental: Rental): void {
    // Implement view route logic
    console.log('Viewing route for rental:', rental.id);
  }
} 