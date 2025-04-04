import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { AppLogoComponent } from '../../../shared/components/app-logo/app-logo.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AppLogoComponent],
  template: `
    <div class="auth-split">
      <!-- Left side with background image -->
      <div class="auth-image-side bg-gradient-to-br from-primary-900/80 to-primary-800/60">
        <div class="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
          <div class="text-center">
            <h1 class="text-5xl font-bold mb-4">Your Urban Mobility Partner</h1>
            <p class="text-xl mb-8">Start your sustainable journey with BikeWheel</p>
          </div>
          <div class="flex space-x-12 text-center">
            <div>
              <div class="text-4xl font-bold mb-2">50+</div>
              <div class="text-lg">Stations</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">500+</div>
              <div class="text-lg">Bikes</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">24/7</div>
              <div class="text-lg">Service</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side with form -->
      <div class="auth-form-side">
        <div class="w-full max-w-md mx-auto">
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <app-logo size="medium"></app-logo>
            <p class="mt-2 text-center text-sm text-gray-600">
              Don't have an account?
              <a routerLink="/auth/register" class="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </a>
            </p>
          </div>

          <div class="mt-8">
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div class="mt-1">
                  <input
                    id="email"
                    type="email"
                    formControlName="email"
                    [class]="'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ' +
                            (loginForm.get('email')?.invalid && loginForm.get('email')?.touched ?
                            'border-red-300 text-red-900 placeholder-red-300' : 'border-gray-300')"
                    placeholder="you@example.com"
                  />
                  <p *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
                     class="mt-2 text-sm text-red-600">
                    {{ getEmailErrorMessage() }}
                  </p>
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div class="mt-1">
                  <input
                    id="password"
                    type="password"
                    formControlName="password"
                    [class]="'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ' +
                            (loginForm.get('password')?.invalid && loginForm.get('password')?.touched ?
                            'border-red-300 text-red-900 placeholder-red-300' : 'border-gray-300')"
                    placeholder="••••••••"
                  />
                  <p *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                     class="mt-2 text-sm text-red-600">
                    {{ getPasswordErrorMessage() }}
                  </p>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    formControlName="rememberMe"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div class="text-sm">
                  <a routerLink="/auth/forgot-password" class="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  [disabled]="!loginForm.valid || isLoading"
                  [class]="'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ' +
                          ((!loginForm.valid || isLoading) ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700')"
                >
                  <svg *ngIf="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isLoading ? 'Signing in...' : 'Sign in' }}
                </button>
              </div>

              <div class="mt-4 text-center text-sm text-gray-600">
                By signing in, you agree to our
                <a href="/terms" class="text-blue-600 hover:text-blue-500">Terms of Service</a> and
                <a href="/privacy" class="text-blue-600 hover:text-blue-500">Privacy Policy</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  getEmailErrorMessage(): string {
    const control = this.loginForm.get('email');
    if (control?.hasError('required')) {
      return 'Email is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const control = this.loginForm.get('password');
    if (control?.hasError('required')) {
      return 'Password is required';
    }
    if (control?.hasError('minlength')) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      try {
        await this.authService.login(this.loginForm.value).toPromise();
        this.router.navigate(['/citizen/dashboard']);
      } catch (error) {
        console.error('Login failed:', error);
        // TODO: Show error message to user
      } finally {
        this.isLoading = false;
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
