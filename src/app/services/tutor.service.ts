import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TutorshipRequest, TutorshipAnnouncement, Payment, Notification, Reservation, Schedule } from '../models/tutorship.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private apiUrl = 'https://spring-api-958972085944.us-central1.run.app/api/tutor';

  constructor(private http: HttpClient) {}

  createTutorshipRequest(request: TutorshipRequest): Observable<TutorshipRequest> {
    return this.http.post<TutorshipRequest>(`${this.apiUrl}/tutorship-requests`, request);
  }

  getMyAnnouncements(): Observable<TutorshipAnnouncement[]> {
    return this.http.get<TutorshipAnnouncement[]>(`${this.apiUrl}/announcements`);
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications`);
  }

  getTotalEarnings(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/finance/total`);
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/finance/payments`);
  }

  getMyStudents(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/students`);
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/schedule/reservations`);
  }

  getSchedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiUrl}/schedule/availability`);
  }

  addAvailableHours(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(`${this.apiUrl}/schedule/availability`, schedule);
  }
}




