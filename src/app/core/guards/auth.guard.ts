import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const currentUser = this.authService.getCurrentUser();
    
    if (token && currentUser) {
      return true;
    }
    
    this.router.navigate(['/auth/login']);
    return false;
  }
} 