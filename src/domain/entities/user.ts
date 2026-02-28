export interface UserEntity {
  id: string;
  name: string | null;
  email: string | null;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  password?: string | null;
  specialty?: string | null;
  crm?: string | null;
}
