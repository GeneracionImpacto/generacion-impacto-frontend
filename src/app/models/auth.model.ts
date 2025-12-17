import { Role } from './user.model';

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  studentCode: string;
  role: Role;
  adminSecretCode?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  name: string;
  role: Role;
  userId: number;
}




