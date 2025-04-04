export interface Bike {
  id: number;
  name: string;
  type: 'electric' | 'manual';
  status: 'available' | 'rented' | 'maintenance';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  pricePerHour: number;
  batteryLevel?: number; // Only for electric bikes
  lastMaintenanceDate: string;
} 