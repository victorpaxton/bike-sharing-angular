export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface UserAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

export interface RegistrationData {
  // Basic Information
  fullName: string;
  email: string;
  phone: string;
  password: string;

  // Address Information
  address: UserAddress;

  // Payment Information
  paymentMethod: PaymentMethod;

  // Terms
  acceptTerms: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: UserAddress;
  memberSince: Date;
  isActive: boolean;
  subscriptionType?: 'basic' | 'premium';
  subscriptionEndDate?: Date;
}
