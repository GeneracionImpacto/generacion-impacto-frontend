import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { TutorService } from '../../../services/tutor.service';
import { Payment } from '../../../models/tutorship.model';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-tutor-finance',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './tutor-finance.component.html',
  styleUrls: ['./tutor-finance.component.scss']
})
export class TutorFinanceComponent implements OnInit {
  role = Role.TUTOR;
  routes = [
    { path: '/tutor/home', label: 'Inicio' },
    { path: '/tutor/tutorships', label: 'Tutorías' },
    { path: '/tutor/notifications', label: 'Notificaciones' },
    { path: '/tutor/finance', label: 'Finanzas' },
    { path: '/tutor/students', label: 'Estudiantes' },
    { path: '/tutor/schedule', label: 'Horarios' }
  ];
  
  totalEarnings = 0;
  payments: Payment[] = [];

  constructor(private tutorService: TutorService) {}

  ngOnInit(): void {
    this.tutorService.getTotalEarnings().subscribe({
      next: (data) => this.totalEarnings = data,
      error: (err) => console.error(err)
    });
    this.tutorService.getPayments().subscribe({
      next: (data) => this.payments = data,
      error: (err) => console.error(err)
    });
  }
}




