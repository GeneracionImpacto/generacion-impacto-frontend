import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TutorshipRequest, Scholarship, TutorshipAnnouncement } from '../models/tutorship.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistics`);
  }

  getAllTutors(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/tutors`);
  }

  getTutorAnnouncements(tutorId: number): Observable<TutorshipAnnouncement[]> {
    return this.http.get<TutorshipAnnouncement[]>(`${this.apiUrl}/tutors/${tutorId}/announcements`);
  }

  getAllStudents(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/students`);
  }

  getPendingTutorshipRequests(): Observable<TutorshipRequest[]> {
    return this.http.get<TutorshipRequest[]>(`${this.apiUrl}/notifications/tutorship-requests`);
  }

  getPendingScholarships(): Observable<Scholarship[]> {
    return this.http.get<Scholarship[]>(`${this.apiUrl}/notifications/scholarships`);
  }

  approveTutorshipRequest(requestId: number): Observable<TutorshipAnnouncement> {
    return this.http.post<TutorshipAnnouncement>(`${this.apiUrl}/tutorship-requests/${requestId}/approve`, {});
  }

  rejectTutorshipRequest(requestId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/tutorship-requests/${requestId}/reject`, {});
  }

  approveScholarship(scholarshipId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/scholarships/${scholarshipId}/approve`, {});
  }

  rejectScholarship(scholarshipId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/scholarships/${scholarshipId}/reject`, {});
  }

  getFinanceSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/finance`);
  }
}




