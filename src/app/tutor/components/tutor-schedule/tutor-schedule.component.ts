import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CalendarComponent, CalendarEvent } from '../../../shared/calendar/calendar.component';
import { TutorService } from '../../../services/tutor.service';
import { Reservation, Schedule } from '../../../models/tutorship.model';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-tutor-schedule',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, ReactiveFormsModule, CalendarComponent],
  templateUrl: './tutor-schedule.component.html',
  styleUrls: ['./tutor-schedule.component.scss']
})
export class TutorScheduleComponent implements OnInit {
  role = Role.TUTOR;
  routes = [
    { path: '/tutor/home', label: 'Inicio' },
    { path: '/tutor/tutorships', label: 'Tutorías' },
    { path: '/tutor/notifications', label: 'Notificaciones' },
    { path: '/tutor/finance', label: 'Finanzas' },
    { path: '/tutor/students', label: 'Estudiantes' },
    { path: '/tutor/schedule', label: 'Horarios' }
  ];
  
  reservations: Reservation[] = [];
  schedule: Schedule[] = [];
  calendarEvents: CalendarEvent[] = [];
  availabilityForm: FormGroup;
  isSaving = false;

  days = [
    { value: 'MONDAY', label: 'Lunes' },
    { value: 'TUESDAY', label: 'Martes' },
    { value: 'WEDNESDAY', label: 'Miércoles' },
    { value: 'THURSDAY', label: 'Jueves' },
    { value: 'FRIDAY', label: 'Viernes' },
    { value: 'SATURDAY', label: 'Sábado' },
    { value: 'SUNDAY', label: 'Domingo' }
  ];

  constructor(private tutorService: TutorService, private fb: FormBuilder) {
    this.availabilityForm = this.fb.group({
      dayOfWeek: ['MONDAY', Validators.required],
      startTime: ['08:00', Validators.required],
      endTime: ['12:00', Validators.required]
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.tutorService.getReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.calendarEvents = data.map(r => ({
          dateTime: r.dateTime,
          title: r.announcement?.courseName || 'Tutoría',
          subtitle: r.student?.name || ''
        }));
      },
      error: (err) => console.error(err)
    });
    this.tutorService.getSchedule().subscribe({
      next: (data) => this.schedule = data,
      error: (err) => console.error(err)
    });
  }

  addAvailability(): void {
    if (this.availabilityForm.invalid || this.isSaving) return;
    this.isSaving = true;
    const payload: Schedule = this.availabilityForm.value;
    this.tutorService.addAvailableHours(payload).subscribe({
      next: () => {
        this.isSaving = false;
        this.refresh();
      },
      error: (err) => {
        this.isSaving = false;
        alert('Error al guardar disponibilidad');
        console.error(err);
      }
    });
  }
}




