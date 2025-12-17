import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { TutorService } from '../../../services/tutor.service';
import { User } from '../../../models/user.model';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-tutor-students',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './tutor-students.component.html',
  styleUrls: ['./tutor-students.component.scss']
})
export class TutorStudentsComponent implements OnInit {
  role = Role.TUTOR;
  routes = [
    { path: '/tutor/home', label: 'Inicio' },
    { path: '/tutor/tutorships', label: 'Tutorías' },
    { path: '/tutor/notifications', label: 'Notificaciones' },
    { path: '/tutor/finance', label: 'Finanzas' },
    { path: '/tutor/students', label: 'Estudiantes' },
    { path: '/tutor/schedule', label: 'Horarios' }
  ];
  
  students: User[] = [];

  constructor(private tutorService: TutorService) {}

  ngOnInit(): void {
    this.tutorService.getMyStudents().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error(err)
    });
  }
}




