import { User } from './user.model';

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface TutorshipRequest {
  id?: number;
  tutor?: User;
  courseName: string;
  teacherName: string;
  period: string;
  description?: string;
  videoUrl?: string;
  status?: RequestStatus;
  createdAt?: string;
  reviewedAt?: string;
}

export interface TutorshipAnnouncement {
  id?: number;
  tutor?: User;
  courseName: string;
  description?: string;
}

export interface Reservation {
  id?: number;
  student?: User;
  announcement?: TutorshipAnnouncement;
  dateTime: string;
  paid: boolean;
  scholarshipUsed: boolean;
}

export interface Scholarship {
  id?: number;
  student?: User;
  courseName: string;
  reason: string;
  startDate: string;
  endDate: string;
  status?: RequestStatus;
}

export interface Payment {
  id?: number;
  tutor?: User;
  reservation?: Reservation;
  amount: number;
  paymentDate?: string;
}

export interface Schedule {
  id?: number;
  tutor?: User;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface Notification {
  id?: number;
  user?: User;
  title: string;
  message: string;
  read: boolean;
  createdAt?: string;
}




