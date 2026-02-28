import { prisma } from "../database/prisma";
import { AppointmentEntity } from "@/domain/entities/appointment";
import { AppointmentRepository } from "@/domain/repositories/appointment-repository";

export class PrismaAppointmentRepository implements AppointmentRepository {
  async create(data: Omit<AppointmentEntity, "id" | "createdAt" | "updatedAt">): Promise<AppointmentEntity> {
    const appointment = await prisma.appointment.create({
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        timeSlotId: data.timeSlotId,
        serviceId: data.serviceId,
        status: data.status,
        notes: data.notes,
      },
    });
    return appointment as unknown as AppointmentEntity;
  }

  async findById(id: string): Promise<AppointmentEntity | null> {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        timeSlot: true,
        doctor: true,
        patient: true,
        service: true,
      },
    });
    if (!appointment) return null;
    return appointment as unknown as AppointmentEntity;
  }

  async findByPatientId(patientId: string): Promise<AppointmentEntity[]> {
    const appointments = await prisma.appointment.findMany({
      where: {
        patientId,
      },
      include: {
        timeSlot: true,
        doctor: {
          select: { name: true, specialty: true }
        },
        service: true,
        review: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return appointments as unknown as AppointmentEntity[];
  }

  async findByDoctorId(doctorId: string): Promise<AppointmentEntity[]> {
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
      },
      include: {
        timeSlot: true,
        patient: {
          select: { name: true, email: true }
        },
        service: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return appointments as unknown as AppointmentEntity[];
  }

  async updateStatus(id: string, status: "SCHEDULED" | "COMPLETED" | "CANCELLED"): Promise<AppointmentEntity> {
    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
    });
    return appointment as unknown as AppointmentEntity;
  }
}
