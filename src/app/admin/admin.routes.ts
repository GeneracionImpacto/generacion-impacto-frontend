import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./components/admin-home/admin-home.component').then(m => m.AdminHomeComponent)
  },
  { 
    path: 'tutors', 
    loadComponent: () => import('./components/admin-tutors/admin-tutors.component').then(m => m.AdminTutorsComponent)
  },
  { 
    path: 'students', 
    loadComponent: () => import('./components/admin-students/admin-students.component').then(m => m.AdminStudentsComponent)
  },
  { 
    path: 'notifications', 
    loadComponent: () => import('./components/admin-notifications/admin-notifications.component').then(m => m.AdminNotificationsComponent)
  },
  { 
    path: 'finance', 
    loadComponent: () => import('./components/admin-finance/admin-finance.component').then(m => m.AdminFinanceComponent)
  }
];




