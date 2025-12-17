import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { AdminService } from '../../../services/admin.service';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar [role]="role" [routes]="routes"></app-navbar>
    <div class="container">
      <h1>Panel de Administración</h1>
      <div class="stats-grid">
        <div class="card stat-card">
          <h3>Estudiantes</h3>
          <p class="stat-number">{{ stats.totalStudents || 0 }}</p>
        </div>
        <div class="card stat-card">
          <h3>Tutores</h3>
          <p class="stat-number">{{ stats.totalTutors || 0 }}</p>
        </div>
        <div class="card stat-card">
          <h3>Anuncios</h3>
          <p class="stat-number">{{ stats.totalAnnouncements || 0 }}</p>
        </div>
        <div class="card stat-card">
          <h3>Reservaciones</h3>
          <p class="stat-number">{{ stats.totalReservations || 0 }}</p>
        </div>
      </div>
      <div class="quick-actions">
        <a routerLink="/admin/tutors" class="btn btn-primary">Gestionar Tutores</a>
        <a routerLink="/admin/students" class="btn btn-primary">Gestionar Estudiantes</a>
        <a routerLink="/admin/notifications" class="btn btn-primary">Revisar Solicitudes</a>
        <a routerLink="/admin/finance" class="btn btn-primary">Finanzas</a>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 40px 20px; }
    h1 { color: var(--primary-blue); margin-bottom: 30px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
    .stat-card { text-align: center; padding: 30px; }
    .stat-number { font-size: 2.5rem; font-weight: bold; color: var(--primary-blue); }
    .quick-actions { display: flex; gap: 20px; flex-wrap: wrap; }
  `]
})
export class AdminHomeComponent implements OnInit {
  role = Role.ADMIN;
  routes = [
    { path: '/admin/home', label: 'Inicio' },
    { path: '/admin/tutors', label: 'Tutores' },
    { path: '/admin/students', label: 'Estudiantes' },
    { path: '/admin/notifications', label: 'Notificaciones' },
    { path: '/admin/finance', label: 'Finanzas' }
  ];
  
  stats: any = {};

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getStatistics().subscribe({
      next: (data) => this.stats = data,
      error: (err) => console.error(err)
    });
  }
}




