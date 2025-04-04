export interface Rental {
  id: number;
  bikeId: number;
  userId: number;
  startTime: string;
  endTime?: string;
  status: 'active' | 'completed' | 'cancelled';
  totalCost?: number;
  startLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  endLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  distance?: number; // Distance in kilometers
  duration?: number; // Duration in minutes
} 