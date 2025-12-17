import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { AdminService } from '../../../services/admin.service';
import { TutorshipRequest, Scholarship } from '../../../models/tutorship.model';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-admin-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './admin-notifications.component.html',
  styleUrls: ['./admin-notifications.component.scss']
})
export class AdminNotificationsComponent implements OnInit {
  role = Role.ADMIN;
  routes = [
    { path: '/admin/home', label: 'Inicio' },
    { path: '/admin/tutors', label: 'Tutores' },
    { path: '/admin/students', label: 'Estudiantes' },
    { path: '/admin/notifications', label: 'Notificaciones' },
    { path: '/admin/finance', label: 'Finanzas' }
  ];
  
  tutorshipRequests: TutorshipRequest[] = [];
  scholarships: Scholarship[] = [];
  selectedRequest: TutorshipRequest | null = null;
  selectedScholarship: Scholarship | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.adminService.getPendingTutorshipRequests().subscribe({
      next: (data) => this.tutorshipRequests = data,
      error: (err) => console.error(err)
    });
    this.adminService.getPendingScholarships().subscribe({
      next: (data) => this.scholarships = data,
      error: (err) => console.error(err)
    });
  }

  approveRequest(id: number): void {
    this.adminService.approveTutorshipRequest(id).subscribe({
      next: () => {
        alert('Solicitud aprobada');
        this.loadRequests();
      },
      error: (err) => alert('Error: ' + err.error)
    });
  }

  rejectRequest(id: number): void {
    this.adminService.rejectTutorshipRequest(id).subscribe({
      next: () => {
        alert('Solicitud rechazada');
        this.loadRequests();
      },
      error: (err) => alert('Error: ' + err.error)
    });
  }

  approveScholarship(id: number): void {
    this.adminService.approveScholarship(id).subscribe({
      next: () => {
        alert('Beca aprobada');
        this.loadRequests();
      },
      error: (err) => alert('Error: ' + err.error)
    });
  }

  rejectScholarship(id: number): void {
    this.adminService.rejectScholarship(id).subscribe({
      next: () => {
        alert('Beca rechazada');
        this.loadRequests();
      },
      error: (err) => alert('Error: ' + err.error)
    });
  }
}




