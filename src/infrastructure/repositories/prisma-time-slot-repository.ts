import { prisma } from "../database/prisma";
import { TimeSlotEntity } from "@/domain/entities/time-slot";
import { TimeSlotRepository } from "@/domain/repositories/time-slot-repository";
import { Prisma } from "@prisma/client";

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

  async syncBlockedDays(doctorId: string, dates: Date[]): Promise<void> {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Apaga todos os bloqueios de "dia todo" (hora 00:00:00) a partir de hoje
      const existingSlots = await tx.timeSlot.findMany({
        where: {
          doctorId,
          isBlocked: true,
          date: { gte: today },
        },
      });

      const idsToDelete = existingSlots
        .filter((s) => s.date.getUTCHours() === 0)
        .map((s) => s.id);

      if (idsToDelete.length > 0) {
        await tx.timeSlot.deleteMany({
          where: { id: { in: idsToDelete } },
        });
      }

      // 2. Cria os novos bloqueios de dia inteiro (setando hora UTC = 0)
      if (dates.length > 0) {
        const createData = dates.map((date) => {
          const d = new Date(date);
          d.setUTCHours(0, 0, 0, 0);
          return {
            doctorId,
            date: d,
            isBlocked: true,
            isBooked: false,
          };
        });

        await tx.timeSlot.createMany({
          data: createData,
        });
      }
    });
  }

  async bulkCreate(slots: Omit<TimeSlotEntity, "id">[]): Promise<void> {
    const data = slots.map(s => ({
      doctorId: s.doctorId,
      date: s.date,
      isBlocked: s.isBlocked,
      isBooked: s.isBooked
    }));

    await prisma.timeSlot.createMany({
      data,
      skipDuplicates: true
    });
  }
}
