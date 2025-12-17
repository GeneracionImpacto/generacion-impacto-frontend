import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { StudentService } from '../../../services/student.service';
import { Notification } from '../../../models/tutorship.model';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-student-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar [role]="role" [routes]="routes"></app-navbar>
    <div class="container">
      <h1>Notificaciones</h1>
      <div *ngFor="let notification of notifications" class="card">
        <h3>{{ notification.title }}</h3>
        <p>{{ notification.message }}</p>
        <small>{{ notification.createdAt | date }}</small>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 40px 20px; }
    h1 { color: var(--primary-blue); margin-bottom: 30px; }
    .card { margin-bottom: 20px; }
    .card h3 { color: var(--primary-blue); margin-bottom: 10px; }
  `]
})
export class StudentNotificationsComponent implements OnInit {
  role = Role.STUDENT;
  routes = [
    { path: '/student/home', label: 'Inicio' },
    { path: '/student/announcements', label: 'Anuncios' },
    { path: '/student/notifications', label: 'Notificaciones' },
    { path: '/student/reservations', label: 'Reservaciones' },
    { path: '/student/tutors', label: 'Tutores' }
  ];
  
  notifications: Notification[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getNotifications().subscribe({
      next: (data) => this.notifications = data,
      error: (err) => console.error(err)
    });
  }
}




