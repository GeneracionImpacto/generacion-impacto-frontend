import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { AdminService } from '../../../services/admin.service';
import { User } from '../../../models/user.model';
import { TutorshipAnnouncement } from '../../../models/tutorship.model';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-admin-tutors',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar [role]="role" [routes]="routes"></app-navbar>
    <div class="container">
      <h1>Tutores</h1>
      <div class="tutors-grid">
        <div *ngFor="let tutor of tutors" class="card" (click)="loadAnnouncements(tutor.id!)">
          <h3>{{ tutor.name }}</h3>
          <p>Email: {{ tutor.email }}</p>
          <p>Teléfono: {{ tutor.phoneNumber }}</p>
          <p>Código: {{ tutor.studentCode }}</p>
        </div>
      </div>
      <div *ngIf="selectedTutorAnnouncements.length > 0" class="modal">
        <div class="modal-content">
          <h2>Anuncios del Tutor</h2>
          <div *ngFor="let ann of selectedTutorAnnouncements" class="card">
            <h3>{{ ann.courseName }}</h3>
            <p>{{ ann.description }}</p>
          </div>
          <button class="btn btn-secondary" (click)="selectedTutorAnnouncements = []">Cerrar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 40px 20px; }
    h1 { color: var(--primary-blue); margin-bottom: 30px; }
    .tutors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-content { background: white; padding: 30px; border-radius: 8px; max-width: 600px; max-height: 80vh; overflow-y: auto; }
  `]
})
export class AdminTutorsComponent implements OnInit {
  role = Role.ADMIN;
  routes = [
    { path: '/admin/home', label: 'Inicio' },
    { path: '/admin/tutors', label: 'Tutores' },
    { path: '/admin/students', label: 'Estudiantes' },
    { path: '/admin/notifications', label: 'Notificaciones' },
    { path: '/admin/finance', label: 'Finanzas' }
  ];
  
  tutors: User[] = [];
  selectedTutorAnnouncements: TutorshipAnnouncement[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllTutors().subscribe({
      next: (data) => this.tutors = data,
      error: (err) => console.error(err)
    });
  }

  loadAnnouncements(tutorId: number): void {
    this.adminService.getTutorAnnouncements(tutorId).subscribe({
      next: (data) => this.selectedTutorAnnouncements = data,
      error: (err) => console.error(err)
    });
  }
}

