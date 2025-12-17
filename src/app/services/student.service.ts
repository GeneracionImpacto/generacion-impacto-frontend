import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TutorshipAnnouncement, Reservation, Scholarship, Notification } from '../models/tutorship.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api/student';

  constructor(private http: HttpClient) {}

  getAllAnnouncements(): Observable<TutorshipAnnouncement[]> {
    return this.http.get<TutorshipAnnouncement[]>(`${this.apiUrl}/announcements`);
  }

  bookTutorship(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/reservations`, {
      announcementId: reservation.announcement?.id,
      dateTime: reservation.dateTime
    });
  }

  requestScholarship(scholarship: Scholarship): Observable<Scholarship> {
    return this.http.post<Scholarship>(`${this.apiUrl}/scholarships`, scholarship);
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications`);
  }

  getMyReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations`);
  }

  getMyTutors(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/tutors`);
  }

  getAvailableSlots(announcementId: number, date: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/announcements/${announcementId}/available-slots`, {
      params: { date }
    });
  }
}




