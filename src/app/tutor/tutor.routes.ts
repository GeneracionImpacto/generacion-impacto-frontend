import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./components/tutor-home/tutor-home.component').then(m => m.TutorHomeComponent)
  },
  { 
    path: 'tutorships', 
    loadComponent: () => import('./components/tutor-tutorships/tutor-tutorships.component').then(m => m.TutorTutorshipsComponent)
  },
  { 
    path: 'notifications', 
    loadComponent: () => import('./components/tutor-notifications/tutor-notifications.component').then(m => m.TutorNotificationsComponent)
  },
  { 
    path: 'finance', 
    loadComponent: () => import('./components/tutor-finance/tutor-finance.component').then(m => m.TutorFinanceComponent)
  },
  { 
    path: 'students', 
    loadComponent: () => import('./components/tutor-students/tutor-students.component').then(m => m.TutorStudentsComponent)
  },
  { 
    path: 'schedule', 
    loadComponent: () => import('./components/tutor-schedule/tutor-schedule.component').then(m => m.TutorScheduleComponent)
  }
];




