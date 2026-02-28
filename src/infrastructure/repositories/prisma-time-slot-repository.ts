import { prisma } from "../database/prisma";
import { TimeSlotEntity } from "@/domain/entities/time-slot";
import { TimeSlotRepository } from "@/domain/repositories/time-slot-repository";

export class PrismaTimeSlotRepository implements TimeSlotRepository {
  async create(data: Omit<TimeSlotEntity, "id">): Promise<TimeSlotEntity> {
    const timeSlot = await prisma.timeSlot.create({
      data: {
        doctorId: data.doctorId,
        date: data.date,
        isBlocked: data.isBlocked,
        isBooked: data.isBooked,
      },
    });
    return timeSlot as TimeSlotEntity;
  }

  async findById(id: string): Promise<TimeSlotEntity | null> {
    const timeSlot = await prisma.timeSlot.findUnique({ where: { id } });
    if (!timeSlot) return null;
    return timeSlot as TimeSlotEntity;
  }

  async findAvailableByDoctorId(doctorId: string): Promise<TimeSlotEntity[]> {
    const timeSlots = await prisma.timeSlot.findMany({
      where: {
        doctorId,
        isBlocked: false,
        isBooked: false,
        date: {
          gt: new Date(),
        },
      },
      orderBy: {
        date: "asc",
      },
    });
    return timeSlots as TimeSlotEntity[];
  }

  async findByDoctorId(doctorId: string): Promise<TimeSlotEntity[]> {
    const timeSlots = await prisma.timeSlot.findMany({
      where: {
        doctorId,
        date: {
          gt: new Date(),
        },
      },
      orderBy: {
        date: "asc",
      },
    });
    return timeSlots as TimeSlotEntity[];
  }

  async update(id: string, data: Partial<TimeSlotEntity>): Promise<TimeSlotEntity> {
    const timeSlot = await prisma.timeSlot.update({
      where: { id },
      data: {
        isBlocked: data.isBlocked,
        isBooked: data.isBooked,
      },
    });
    return timeSlot as TimeSlotEntity;
  }

  async delete(id: string): Promise<void> {
    await prisma.timeSlot.delete({
      where: { id },
    });
  }
}
