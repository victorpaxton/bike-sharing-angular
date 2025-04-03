import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { LoginCredentials, RegistrationData, User } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check for stored user data on initialization
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: LoginCredentials): Observable<User> {
    // TODO: Replace with actual API call
    if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
      const user: User = {
        id: '1',
        fullName: 'Demo User',
        email: credentials.email,
        phone: '+1234567890',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        memberSince: new Date(),
        isActive: true,
        subscriptionType: 'premium',
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      };

      return of(user).pipe(
        delay(1000), // Simulate network delay
        tap(user => {
          if (credentials.rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          this.currentUserSubject.next(user);
        })
      );
    }

    return throwError(() => new Error('Invalid credentials'));
  }

  register(data: RegistrationData): Observable<User> {
    // TODO: Replace with actual API call
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      memberSince: new Date(),
      isActive: true
    };

    return of(user).pipe(
      delay(1500), // Simulate network delay
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
