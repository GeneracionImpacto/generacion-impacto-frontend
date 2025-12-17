import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CalendarComponent, CalendarEvent } from '../../../shared/calendar/calendar.component';
import { StudentService } from '../../../services/student.service';
import { Reservation } from '../../../models/tutorship.model';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-student-reservations',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, CalendarComponent],
  template: `
    <app-navbar [role]="role" [routes]="routes"></app-navbar>
    <div class="container">
      <h1>Mis Reservaciones</h1>
      <div class="card">
        <app-calendar [events]="calendarEvents"></app-calendar>
      </div>
      <div *ngFor="let reservation of reservations" class="card">
        <h3>{{ reservation.announcement?.courseName }}</h3>
        <p><strong>Tutor:</strong> {{ reservation.announcement?.tutor?.name }}</p>
        <p><strong>Fecha:</strong> {{ reservation.dateTime | date:'short' }}</p>
        <span [class]="reservation.scholarshipUsed ? 'badge-scholarship' : 'badge-paid'">
          {{ reservation.scholarshipUsed ? 'Beca' : 'Pagado' }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 40px 20px; }
    h1 { color: var(--primary-blue); margin-bottom: 30px; }
    .badge-paid { background: var(--success-green); color: white; padding: 4px 12px; border-radius: 12px; }
    .badge-scholarship { background: var(--primary-blue); color: white; padding: 4px 12px; border-radius: 12px; }
  `]
})
export class StudentReservationsComponent implements OnInit {
  role = Role.STUDENT;
  routes = [
    { path: '/student/home', label: 'Inicio' },
    { path: '/student/announcements', label: 'Anuncios' },
    { path: '/student/notifications', label: 'Notificaciones' },
    { path: '/student/reservations', label: 'Reservaciones' },
    { path: '/student/tutors', label: 'Tutores' }
  ];
  
  reservations: Reservation[] = [];
  calendarEvents: CalendarEvent[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getMyReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.calendarEvents = data.map(r => ({
          dateTime: r.dateTime,
          title: r.announcement?.courseName || 'Tutoría',
          subtitle: r.announcement?.tutor?.name || ''
        }));
      },
      error: (err) => console.error(err)
    });
  }
}




