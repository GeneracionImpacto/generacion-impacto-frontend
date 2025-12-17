import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { TutorService } from '../../../services/tutor.service';
import { TutorshipAnnouncement, TutorshipRequest } from '../../../models/tutorship.model';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-tutor-tutorships',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './tutor-tutorships.component.html',
  styleUrls: ['./tutor-tutorships.component.scss']
})
export class TutorTutorshipsComponent implements OnInit {
  role = Role.TUTOR;
  routes = [
    { path: '/tutor/home', label: 'Inicio' },
    { path: '/tutor/tutorships', label: 'Tutorías' },
    { path: '/tutor/notifications', label: 'Notificaciones' },
    { path: '/tutor/finance', label: 'Finanzas' },
    { path: '/tutor/students', label: 'Estudiantes' },
    { path: '/tutor/schedule', label: 'Horarios' }
  ];
  
  announcements: TutorshipAnnouncement[] = [];
  showRequestForm = false;
  requestForm: FormGroup;
  isSubmitting = false;

  constructor(
    private tutorService: TutorService,
    private fb: FormBuilder
  ) {
    this.requestForm = this.fb.group({
      courseName: ['', Validators.required],
      teacherName: ['', Validators.required],
      period: ['', Validators.required],
      description: ['', Validators.required],
      videoUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.tutorService.getMyAnnouncements().subscribe({
      next: (data) => {
        this.announcements = data;
      },
      error: (err) => {
        console.error('Error loading announcements:', err);
      }
    });
  }

  submitRequest(): void {
    if (this.requestForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const request: TutorshipRequest = this.requestForm.value;
      this.tutorService.createTutorshipRequest(request).subscribe({
        next: () => {
          alert('Solicitud enviada correctamente');
          this.requestForm.reset();
          this.showRequestForm = false;
          this.isSubmitting = false;
        },
        error: (err) => {
          alert('Error al enviar solicitud: ' + (err.error || err.message || 'Error desconocido'));
          this.isSubmitting = false;
        }
      });
    }
  }
}




