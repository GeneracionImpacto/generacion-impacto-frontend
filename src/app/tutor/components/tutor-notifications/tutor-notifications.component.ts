import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { TutorService } from '../../../services/tutor.service';
import { Notification } from '../../../models/tutorship.model';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-tutor-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './tutor-notifications.component.html',
  styleUrls: ['./tutor-notifications.component.scss']
})
export class TutorNotificationsComponent implements OnInit {
  role = Role.TUTOR;
  routes = [
    { path: '/tutor/home', label: 'Inicio' },
    { path: '/tutor/tutorships', label: 'Tutorías' },
    { path: '/tutor/notifications', label: 'Notificaciones' },
    { path: '/tutor/finance', label: 'Finanzas' },
    { path: '/tutor/students', label: 'Estudiantes' },
    { path: '/tutor/schedule', label: 'Horarios' }
  ];
  
  notifications: Notification[] = [];

  constructor(private tutorService: TutorService) {}

  ngOnInit(): void {
    this.tutorService.getNotifications().subscribe({
      next: (data) => this.notifications = data,
      error: (err) => console.error(err)
    });
  }
}




