import { AppointmentRepository } from "@/domain/repositories/appointment-repository";
import { TimeSlotRepository } from "@/domain/repositories/time-slot-repository";
import { AppointmentEntity } from "@/domain/entities/appointment";
import { UserRepository } from "@/domain/repositories/user-repository";

export class ManageAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private timeSlotRepository: TimeSlotRepository,
    private userRepository: UserRepository
  ) { }

  async create(patientId: string, doctorId: string, timeSlotId: string, notes?: string): Promise<AppointmentEntity> {
    const timeSlot = await this.timeSlotRepository.findById(timeSlotId);

    if (!timeSlot) {
      throw new Error("Time slot not found");
    }

    if (timeSlot.doctorId !== doctorId) {
      throw new Error("Time slot does not belong to the selected doctor");
    }

    if (timeSlot.isBlocked || timeSlot.isBooked) {
      throw new Error("Time slot is not available");
    }

    // Check if patient and doctor exist
    const patient = await this.userRepository.findById(patientId);
    const doctor = await this.userRepository.findById(doctorId);

    if (!patient || patient.role !== 'PATIENT') {
      throw new Error("Invalid patient");
    }

    if (!doctor || doctor.role !== 'DOCTOR') {
      throw new Error("Invalid doctor");
    }

    // Update time slot as booked
    await this.timeSlotRepository.update(timeSlotId, {
      isBooked: true,
    });

    // Create appointment
    const appointment = await this.appointmentRepository.create({
      patientId,
      doctorId,
      timeSlotId,
      status: 'SCHEDULED',
      notes: notes || null,
    });

    return appointment;
  }

  async cancel(patientId: string, appointmentId: string): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (appointment.patientId !== patientId) {
      throw new Error("Unauthorized to cancel this appointment");
    }

    if (appointment.status !== 'SCHEDULED') {
      throw new Error("Cannot cancel an appointment that is not scheduled");
    }

    // Free the time slot
    await this.timeSlotRepository.update(appointment.timeSlotId, {
      isBooked: false,
    });

    // Update appointment status
    return this.appointmentRepository.updateStatus(appointmentId, 'CANCELLED');
  }

  async list(patientId: string): Promise<AppointmentEntity[]> {
    return this.appointmentRepository.findByPatientId(patientId);
  }
}
