import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { StudentService } from '../../../services/student.service';
import { TutorshipAnnouncement, Reservation, Scholarship } from '../../../models/tutorship.model';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-student-announcements',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './student-announcements.component.html',
  styleUrls: ['./student-announcements.component.scss']
})
export class StudentAnnouncementsComponent implements OnInit {
  role = Role.STUDENT;
  routes = [
    { path: '/student/home', label: 'Inicio' },
    { path: '/student/announcements', label: 'Anuncios' },
    { path: '/student/notifications', label: 'Notificaciones' },
    { path: '/student/reservations', label: 'Reservaciones' },
    { path: '/student/tutors', label: 'Tutores' }
  ];
  
  announcements: TutorshipAnnouncement[] = [];
  selectedAnnouncement: TutorshipAnnouncement | null = null;
  showBookingForm = false;
  showScholarshipForm = false;
  bookingForm: FormGroup;
  scholarshipForm: FormGroup;
  availableSlots: string[] = [];
  selectedDate = '';

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder
  ) {
    this.bookingForm = this.fb.group({
      date: ['', Validators.required],
      slot: ['', Validators.required]
    });
    this.scholarshipForm = this.fb.group({
      courseName: ['', Validators.required],
      reason: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.studentService.getAllAnnouncements().subscribe({
      next: (data) => this.announcements = data,
      error: (err) => console.error(err)
    });
  }

  bookTutorship(): void {
    if (this.bookingForm.valid && this.selectedAnnouncement) {
      const reservation: Reservation = {
        announcement: this.selectedAnnouncement,
        dateTime: this.bookingForm.value.slot,
        paid: true,
        scholarshipUsed: false
      };
      this.studentService.bookTutorship(reservation).subscribe({
        next: () => {
          alert('Reservación realizada correctamente');
          this.showBookingForm = false;
          this.bookingForm.reset();
        },
        error: (err) => alert('Error: ' + (err.error || 'Error desconocido'))
      });
    }
  }

  requestScholarship(): void {
    if (this.scholarshipForm.valid) {
      const scholarship: Scholarship = this.scholarshipForm.value;
      this.studentService.requestScholarship(scholarship).subscribe({
        next: () => {
          alert('Solicitud de beca enviada');
          this.showScholarshipForm = false;
          this.scholarshipForm.reset();
        },
        error: (err) => alert('Error: ' + (err.error || 'Error desconocido'))
      });
    }
  }

  onDateChange(): void {
    if (!this.selectedAnnouncement) return;
    const date = this.bookingForm.value.date;
    if (!date) return;
    this.selectedDate = date;
    this.availableSlots = [];
    this.bookingForm.patchValue({ slot: '' });

    this.studentService.getAvailableSlots(this.selectedAnnouncement.id!, date).subscribe({
      next: (slots) => this.availableSlots = slots,
      error: (err) => console.error(err)
    });
  }
}




