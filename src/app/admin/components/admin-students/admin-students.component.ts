import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { AdminService } from '../../../services/admin.service';
import { User } from '../../../models/user.model';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar [role]="role" [routes]="routes"></app-navbar>
    <div class="container">
      <h1>Estudiantes</h1>
      <div class="students-grid">
        <div *ngFor="let student of students" class="card">
          <h3>{{ student.name }}</h3>
          <p>Email: {{ student.email }}</p>
          <p>Teléfono: {{ student.phoneNumber }}</p>
          <p>Código: {{ student.studentCode }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 40px 20px; }
    h1 { color: var(--primary-blue); margin-bottom: 30px; }
    .students-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
  `]
})
export class AdminStudentsComponent implements OnInit {
  role = Role.ADMIN;
  routes = [
    { path: '/admin/home', label: 'Inicio' },
    { path: '/admin/tutors', label: 'Tutores' },
    { path: '/admin/students', label: 'Estudiantes' },
    { path: '/admin/notifications', label: 'Notificaciones' },
    { path: '/admin/finance', label: 'Finanzas' }
  ];
  
  students: User[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllStudents().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error(err)
    });
  }
}




