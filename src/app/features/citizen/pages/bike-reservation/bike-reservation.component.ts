import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BikeService } from '../../../../core/services/bike.service';
import { RentalService } from '../../../../core/services/rental.service';
import { Bike } from '../../../../shared/models/bike.model';
import { Rental } from '../../../../shared/models/rental.model';

@Component({
  selector: 'app-bike-reservation',
  templateUrl: './bike-reservation.component.html',
  styleUrls: ['./bike-reservation.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BikeReservationComponent implements OnInit {
  bike: Bike | null = null;
  selectedDuration: number = 1; // hours
  totalCost: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bikeService: BikeService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    const bikeId = Number(this.route.snapshot.paramMap.get('stationId'));
    this.loadBike(bikeId);
  }

  private loadBike(id: number): void {
    this.bikeService.getBikeById(id).subscribe(bike => {
      if (bike) {
        this.bike = bike;
        this.calculateTotalCost();
      } else {
        this.router.navigate(['/citizen/map']);
      }
    });
  }

  onDurationChange(duration: number): void {
    this.selectedDuration = duration;
    this.calculateTotalCost();
  }

  private calculateTotalCost(): void {
    if (this.bike) {
      this.totalCost = this.bike.pricePerHour * this.selectedDuration;
    }
  }

  goBackToMap(): void {
    this.router.navigate(['/citizen/map']);
  }

  confirmReservation(): void {
    if (this.bike) {
      const rental: Omit<Rental, 'id'> = {
        bikeId: this.bike.id,
        userId: 1, // This should come from the auth service
        startTime: new Date().toISOString(),
        status: 'active' as const,
        startLocation: this.bike.location
      };

      this.rentalService.createRental(rental).subscribe(() => {
        this.router.navigate(['/citizen/dashboard']);
      });
    }
  }
} 