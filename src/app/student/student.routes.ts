import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./components/student-home/student-home.component').then(m => m.StudentHomeComponent)
  },
  { 
    path: 'announcements', 
    loadComponent: () => import('./components/student-announcements/student-announcements.component').then(m => m.StudentAnnouncementsComponent)
  },
  { 
    path: 'notifications', 
    loadComponent: () => import('./components/student-notifications/student-notifications.component').then(m => m.StudentNotificationsComponent)
  },
  { 
    path: 'reservations', 
    loadComponent: () => import('./components/student-reservations/student-reservations.component').then(m => m.StudentReservationsComponent)
  },
  { 
    path: 'tutors', 
    loadComponent: () => import('./components/student-tutors/student-tutors.component').then(m => m.StudentTutorsComponent)
  }
];




