import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegistrationData } from '../models/auth.models';
import { AppLogoComponent } from '../../../shared/components/app-logo/app-logo.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AppLogoComponent],
  template: `
    <div class="auth-wide-form min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6">
      <div class="sm:mx-auto sm:w-full">
        <app-logo size="medium"></app-logo>
        <h2 class="mt-6 mb-8 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
      </div>

      <div class="mt-8">
        <!-- Progress Steps -->
        <div class="mb-12 flex justify-between">
          <div *ngFor="let step of steps; let i = index"
               class="flex-1 relative">
            <div [class]="'h-2 ' + (currentStep >= i ? 'bg-blue-600' : 'bg-gray-200')"></div>
            <div class="absolute -top-8 w-full text-center">
              <span [class]="'text-sm font-medium ' + (currentStep >= i ? 'text-blue-600' : 'text-gray-500')">
                {{ step }}
              </span>
            </div>
          </div>
        </div>

        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <!-- Basic Information Form -->
          <form *ngIf="currentStep === 0" [formGroup]="basicInfoForm" (ngSubmit)="nextStep()" class="space-y-6">
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
              <div class="mt-1">
                <input id="fullName" type="text" formControlName="fullName"
                       [class]="getInputClass('fullName', basicInfoForm)"
                       placeholder="John Doe" />
                <p *ngIf="shouldShowError('fullName', basicInfoForm)"
                   class="mt-2 text-sm text-red-600">
                  Full name is required
                </p>
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
              <div class="mt-1">
                <input id="email" type="email" formControlName="email"
                       [class]="getInputClass('email', basicInfoForm)"
                       placeholder="you@example.com" />
                <p *ngIf="shouldShowError('email', basicInfoForm)"
                   class="mt-2 text-sm text-red-600">
                  {{ getEmailErrorMessage() }}
                </p>
              </div>
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
              <div class="mt-1">
                <input id="phone" type="tel" formControlName="phone"
                       [class]="getInputClass('phone', basicInfoForm)"
                       placeholder="+1 (555) 000-0000" />
                <p *ngIf="shouldShowError('phone', basicInfoForm)"
                   class="mt-2 text-sm text-red-600">
                  Phone number is required
                </p>
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="mt-1">
                <input id="password" type="password" formControlName="password"
                       [class]="getInputClass('password', basicInfoForm)"
                       placeholder="••••••••" />
                <p *ngIf="shouldShowError('password', basicInfoForm)"
                   class="mt-2 text-sm text-red-600">
                  Password must be at least 6 characters
                </p>
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div class="mt-1">
                <input id="confirmPassword" type="password" formControlName="confirmPassword"
                       [class]="getInputClass('confirmPassword', basicInfoForm)"
                       placeholder="••••••••" />
                <p *ngIf="shouldShowError('confirmPassword', basicInfoForm)"
                   class="mt-2 text-sm text-red-600">
                  Passwords must match
                </p>
              </div>
            </div>

            <div>
              <button type="submit"
                      [disabled]="!basicInfoForm.valid || isLoading"
                      [class]="getButtonClass()">
                <svg *ngIf="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Next
              </button>
            </div>
          </form>

          <!-- Address Form -->
          <form *ngIf="currentStep === 1" [formGroup]="addressForm" (ngSubmit)="nextStep()" class="space-y-6">
            <div>
              <label for="street" class="block text-sm font-medium text-gray-700">Street Address</label>
              <div class="mt-1">
                <input id="street" type="text" formControlName="street"
                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label for="city" class="block text-sm font-medium text-gray-700">City</label>
              <div class="mt-1">
                <input id="city" type="text" formControlName="city"
                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label for="state" class="block text-sm font-medium text-gray-700">State</label>
              <div class="mt-1">
                <input id="state" type="text" formControlName="state"
                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label for="zipCode" class="block text-sm font-medium text-gray-700">ZIP Code</label>
              <div class="mt-1">
                <input id="zipCode" type="text" formControlName="zipCode"
                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
              <div class="mt-1">
                <input id="country" type="text" formControlName="country"
                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            <div class="flex justify-between">
              <button type="button" (click)="previousStep()"
                      [disabled]="isLoading"
                      class="flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Back
              </button>
              <button type="submit"
                      [disabled]="!addressForm.valid || isLoading"
                      [class]="getButtonClass()">
                Next
              </button>
            </div>
          </form>

          <!-- Payment Form -->
          <form *ngIf="currentStep === 2" [formGroup]="paymentForm" (ngSubmit)="nextStep()" class="space-y-6">
            <div>
              <label for="cardNumber" class="block text-sm font-medium text-gray-700">Card Number</label>
              <div class="mt-1">
                <input id="cardNumber" type="text" formControlName="cardNumber"
                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label for="cardholderName" class="block text-sm font-medium text-gray-700">Cardholder Name</label>
              <div class="mt-1">
                <input id="cardholderName" type="text" formControlName="cardholderName"
                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="expiryDate" class="block text-sm font-medium text-gray-700">Expiry Date</label>
                <div class="mt-1">
                  <input id="expiryDate" type="text" formControlName="expiryDate" placeholder="MM/YY"
                         class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <label for="cvv" class="block text-sm font-medium text-gray-700">CVV</label>
                <div class="mt-1">
                  <input id="cvv" type="text" formControlName="cvv"
                         class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>
            </div>

            <div class="flex justify-between">
              <button type="button" (click)="previousStep()"
                      [disabled]="isLoading"
                      class="flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Back
              </button>
              <button type="submit"
                      [disabled]="!paymentForm.valid || isLoading"
                      [class]="getButtonClass()">
                Next
              </button>
            </div>
          </form>

          <!-- Terms & Conditions -->
          <form *ngIf="currentStep === 3" [formGroup]="termsForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="bg-gray-50 p-4 rounded-md">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Terms of Service</h3>
              <p class="text-sm text-gray-600 mb-4">
                By creating an account, you agree to our Terms of Service and Privacy Policy. You also agree to follow
                all safety guidelines and rules for using our bike sharing service.
              </p>
              <div class="flex items-center">
                <input id="terms" type="checkbox" formControlName="acceptTerms"
                       class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label for="terms" class="ml-2 block text-sm text-gray-900">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
            </div>

            <div class="flex justify-between">
              <button type="button" (click)="previousStep()"
                      [disabled]="isLoading"
                      class="flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Back
              </button>
              <button type="submit"
                      [disabled]="!termsForm.valid || isLoading"
                      [class]="getButtonClass()">
                <svg *ngIf="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RegisterComponent implements OnInit {
  steps = ['Basic Info', 'Address', 'Payment', 'Terms'];
  currentStep: number = 0;
  isLoading = false;

  basicInfoForm!: FormGroup;
  addressForm!: FormGroup;
  paymentForm!: FormGroup;
  termsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.initializeForms();
  }

  ngOnInit() {
    this.currentStep = 0;
  }

  private initializeForms() {
    this.basicInfoForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });

    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cardholderName: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    });

    this.termsForm = this.fb.group({
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  getInputClass(field: string, form: FormGroup): string {
    const baseClass = 'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm';
    return baseClass + (this.shouldShowError(field, form) ? ' border-red-300 text-red-900' : ' border-gray-300');
  }

  getButtonClass(): string {
    const baseClass = 'flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
    return baseClass + (this.isLoading ? ' bg-blue-400 cursor-not-allowed' : ' bg-blue-600 hover:bg-blue-700');
  }

  shouldShowError(field: string, form: FormGroup): boolean {
    const control = form.get(field);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }

  getEmailErrorMessage(): string {
    const control = this.basicInfoForm.get('email');
    if (control?.hasError('required')) {
      return 'Email is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  async onSubmit() {
    if (this.termsForm.valid && !this.isLoading) {
      this.isLoading = true;
      try {
        const registrationData: RegistrationData = {
          fullName: this.basicInfoForm.value.fullName,
          email: this.basicInfoForm.value.email,
          phone: this.basicInfoForm.value.phone,
          password: this.basicInfoForm.value.password,
          address: this.addressForm.value,
          paymentMethod: this.paymentForm.value,
          acceptTerms: this.termsForm.value.acceptTerms
        };

        await this.authService.register(registrationData).toPromise();
        this.router.navigate(['/citizen/dashboard']);
      } catch (error) {
        console.error('Registration failed:', error);
        // TODO: Show error message to user
      } finally {
        this.isLoading = false;
      }
    } else {
      this.termsForm.markAllAsTouched();
    }
  }
}
