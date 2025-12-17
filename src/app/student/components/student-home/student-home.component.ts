import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-student-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar [role]="role" [routes]="routes"></app-navbar>
    <div class="container">
      <div class="home-content">
        <h1>Bienvenido, Estudiante</h1>
        <p class="subtitle">Encuentra tutorías y mejora tu rendimiento académico</p>
        <div class="cards-grid">
          <div class="card">
            <h2>Anuncios de Tutorías</h2>
            <p>Explora las tutorías disponibles y reserva la que necesites</p>
            <a routerLink="/student/announcements" class="btn btn-primary">Ver Anuncios</a>
          </div>
          <div class="card">
            <h2>Mis Reservaciones</h2>
            <p>Gestiona tus reservaciones de tutorías</p>
            <a routerLink="/student/reservations" class="btn btn-primary">Ver Reservaciones</a>
          </div>
          <div class="card">
            <h2>Notificaciones</h2>
            <p>Revisa tus notificaciones</p>
            <a routerLink="/student/notifications" class="btn btn-primary">Ver Notificaciones</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-content { padding: 40px 20px; }
    h1 { color: var(--primary-blue); margin-bottom: 10px; }
    .subtitle { color: var(--text-gray); margin-bottom: 40px; font-size: 1.1rem; }
    .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 30px; }
    .card { padding: 30px; text-align: center; }
    .card h2 { color: var(--primary-blue); margin-bottom: 15px; }
    .card p { color: var(--text-gray); margin-bottom: 20px; }
  `]
})
export class StudentHomeComponent {
  role = Role.STUDENT;
  routes = [
    { path: '/student/home', label: 'Inicio' },
    { path: '/student/announcements', label: 'Anuncios' },
    { path: '/student/notifications', label: 'Notificaciones' },
    { path: '/student/reservations', label: 'Reservaciones' },
    { path: '/student/tutors', label: 'Tutores' }
  ];
}




