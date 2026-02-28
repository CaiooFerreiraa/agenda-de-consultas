export interface AppointmentEntity {
  id: string;
  patientId: string;
  doctorId: string;
  timeSlotId: string;
  serviceId?: string | null;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
