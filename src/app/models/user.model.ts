export enum Role {
  TUTOR = 'TUTOR',
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN'
}

export interface User {
  id?: number;
  email: string;
  name: string;
  phoneNumber: string;
  studentCode: string;
  role: Role;
}




