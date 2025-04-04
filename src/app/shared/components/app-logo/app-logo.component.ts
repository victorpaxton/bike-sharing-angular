import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center space-x-3">
      <img class="h-12 w-auto" src="assets/logo.svg" alt="MetroWheel" />
      <span class="text-2xl font-bold text-blue-600">MetroWheel</span>
    </div>
  `,
  styles: []
})
export class AppLogoComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  get logoSize(): string {
    switch (this.size) {
      case 'small':
        return 'h-10';
      case 'large':
        return 'h-20';
      default:
        return 'h-15';
    }
  }

  get textSize(): string {
    switch (this.size) {
      case 'small':
        return 'text-xl';
      case 'large':
        return 'text-3xl';
      default:
        return 'text-2xl';
    }
  }
} 