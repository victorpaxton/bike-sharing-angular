import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'citizen',
    loadChildren: () => import('./features/citizen/citizen.module').then(m => m.CitizenModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'citizen/dashboard',
    pathMatch: 'full'
  }
];
