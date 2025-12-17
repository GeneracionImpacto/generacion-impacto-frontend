import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-tutor-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './tutor-home.component.html',
  styleUrls: ['./tutor-home.component.scss']
})
export class TutorHomeComponent implements OnInit {
  role = Role.TUTOR;
  routes = [
    { path: '/tutor/home', label: 'Inicio' },
    { path: '/tutor/tutorships', label: 'Tutorías' },
    { path: '/tutor/notifications', label: 'Notificaciones' },
    { path: '/tutor/finance', label: 'Finanzas' },
    { path: '/tutor/students', label: 'Estudiantes' },
    { path: '/tutor/schedule', label: 'Horarios' }
  ];

  ngOnInit(): void {}
}




