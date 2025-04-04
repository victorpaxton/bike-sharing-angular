import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppLogoComponent } from '../app-logo/app-logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, AppLogoComponent],
  template: `
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <app-logo size="small"></app-logo>
          </div>
          
          <div class="flex items-center space-x-4">
            <button class="notification-btn relative p-2 text-gray-600 hover:text-gray-900">
              <i class="fas fa-bell"></i>
              <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
            </button>
            
            <div class="balance flex items-center space-x-2 text-gray-600">
              <i class="fas fa-wallet"></i>
              <span>$25.00</span>
            </div>
            
            <div class="profile-menu flex items-center space-x-2 cursor-pointer">
              <img src="assets/images/avatar-placeholder.png" alt="Profile" class="h-8 w-8 rounded-full">
              <span class="text-gray-700">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HeaderComponent {} 