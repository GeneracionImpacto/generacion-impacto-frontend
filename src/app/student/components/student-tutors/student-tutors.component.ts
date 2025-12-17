import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { StudentService } from '../../../services/student.service';
import { User } from '../../../models/user.model';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-student-tutors',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar [role]="role" [routes]="routes"></app-navbar>
    <div class="container">
      <h1>Mis Tutores</h1>
      <div class="tutors-grid">
        <div *ngFor="let tutor of tutors" class="card">
          <h3>{{ tutor.name }}</h3>
          <p>Teléfono: {{ tutor.phoneNumber }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 40px 20px; }
    h1 { color: var(--primary-blue); margin-bottom: 30px; }
    .tutors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
  `]
})
export class StudentTutorsComponent implements OnInit {
  role = Role.STUDENT;
  routes = [
    { path: '/student/home', label: 'Inicio' },
    { path: '/student/announcements', label: 'Anuncios' },
    { path: '/student/notifications', label: 'Notificaciones' },
    { path: '/student/reservations', label: 'Reservaciones' },
    { path: '/student/tutors', label: 'Tutores' }
  ];
  
  tutors: User[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getMyTutors().subscribe({
      next: (data) => this.tutors = data,
      error: (err) => console.error(err)
    });
  }
}




