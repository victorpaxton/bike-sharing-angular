import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BikeService } from '../../../../core/services/bike.service';
import { Bike } from '../../../../shared/models/bike.model';

@Component({
  selector: 'app-bike-map',
  templateUrl: './bike-map.component.html',
  styleUrls: ['./bike-map.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BikeMapComponent implements OnInit {
  bikes: Bike[] = [];
  selectedBike: Bike | null = null;
  filterType: 'all' | 'electric' | 'manual' = 'all';

  constructor(private bikeService: BikeService) {}

  ngOnInit(): void {
    this.loadBikes();
  }

  private loadBikes(): void {
    this.bikeService.getBikes().subscribe(bikes => {
      this.bikes = bikes;
    });
  }

  onBikeSelect(bike: Bike): void {
    this.selectedBike = bike;
  }

  onFilterChange(type: 'all' | 'electric' | 'manual'): void {
    this.filterType = type;
  }

  getFilteredBikes(): Bike[] {
    if (this.filterType === 'all') {
      return this.bikes;
    }
    return this.bikes.filter(bike => bike.type === this.filterType);
  }

  getBikeAvailabilityColor(bike: Bike): string {
    switch (bike.status) {
      case 'available':
        return '#2ecc71';
      case 'rented':
        return '#e74c3c';
      case 'maintenance':
        return '#f1c40f';
      default:
        return '#95a5a6';
    }
  }
} 