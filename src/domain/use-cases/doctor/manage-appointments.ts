import { AppointmentRepository } from "@/domain/repositories/appointment-repository";
import { AppointmentEntity } from "@/domain/entities/appointment";

export class ManageDoctorAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) { }

  async list(doctorId: string): Promise<AppointmentEntity[]> {
    return this.appointmentRepository.findByDoctorId(doctorId);
  }

  async complete(doctorId: string, appointmentId: string): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (appointment.doctorId !== doctorId) {
      throw new Error("Unauthorized to complete this appointment");
    }

    if (appointment.status !== 'SCHEDULED') {
      throw new Error("Cannot complete an appointment that is not scheduled");
    }

    // Usually we free the time slot here?
    // Actually no, the time slot is still booked because the appointment happened, no one else can book it.

    // Update appointment status
    return this.appointmentRepository.updateStatus(appointmentId, 'COMPLETED');
  }

  async cancel(doctorId: string, appointmentId: string): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (appointment.doctorId !== doctorId) {
      throw new Error("Unauthorized to cancel this appointment");
    }

    if (appointment.status !== 'SCHEDULED') {
      throw new Error("Cannot cancel an appointment that is not scheduled");
    }

    // Update appointment status
    return this.appointmentRepository.updateStatus(appointmentId, 'CANCELLED');
  }
}
