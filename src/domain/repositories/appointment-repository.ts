import { AppointmentEntity } from "../entities/appointment";

export interface AppointmentRepository {
  create(data: Omit<AppointmentEntity, "id" | "createdAt" | "updatedAt">): Promise<AppointmentEntity>;
  findById(id: string): Promise<AppointmentEntity | null>;
  findByPatientId(patientId: string): Promise<AppointmentEntity[]>;
  findByDoctorId(doctorId: string): Promise<AppointmentEntity[]>;
  updateStatus(id: string, status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED'): Promise<AppointmentEntity>;
}
