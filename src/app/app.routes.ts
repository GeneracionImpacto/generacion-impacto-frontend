import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'tutor',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tutor/tutor.routes').then(m => m.routes)
  },
  {
    path: 'student',
    canActivate: [AuthGuard],
    loadChildren: () => import('./student/student.routes').then(m => m.routes)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.routes').then(m => m.routes)
  }
];




