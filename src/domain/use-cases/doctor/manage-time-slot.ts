import { TimeSlotRepository } from "@/domain/repositories/time-slot-repository";
import { TimeSlotEntity } from "@/domain/entities/time-slot";

export class ManageTimeSlotUseCase {
  constructor(private timeSlotRepository: TimeSlotRepository) { }

  async create(doctorId: string, date: Date): Promise<TimeSlotEntity> {
    const existing = await this.timeSlotRepository.findByDoctorId(doctorId);

    // Check if the exact time slot already exists
    const exactMatch = existing.find(t => t.date.getTime() === date.getTime());
    if (exactMatch) {
      throw new Error("Time slot already exists for this date and time");
    }

    return this.timeSlotRepository.create({
      doctorId,
      date,
      isBlocked: false,
      isBooked: false,
    });
  }

  async block(doctorId: string, timeSlotId: string): Promise<TimeSlotEntity> {
    const timeSlot = await this.timeSlotRepository.findById(timeSlotId);

    if (!timeSlot) {
      throw new Error("Time slot not found");
    }

    if (timeSlot.doctorId !== doctorId) {
      throw new Error("Unauthorized to block this time slot");
    }

    if (timeSlot.isBooked) {
      throw new Error("Cannot block a booked time slot");
    }

    return this.timeSlotRepository.update(timeSlotId, {
      isBlocked: true,
    });
  }

  async unblock(doctorId: string, timeSlotId: string): Promise<TimeSlotEntity> {
    const timeSlot = await this.timeSlotRepository.findById(timeSlotId);

    if (!timeSlot) {
      throw new Error("Time slot not found");
    }

    if (timeSlot.doctorId !== doctorId) {
      throw new Error("Unauthorized to unblock this time slot");
    }

    return this.timeSlotRepository.update(timeSlotId, {
      isBlocked: false,
    });
  }

  async list(doctorId: string): Promise<TimeSlotEntity[]> {
    return this.timeSlotRepository.findByDoctorId(doctorId);
  }

  async syncBlockedDays(doctorId: string, dates: Date[]): Promise<void> {
    return this.timeSlotRepository.syncBlockedDays(doctorId, dates);
  }

  async bulkCreate(doctorId: string, date: Date, startHourStr: string, endHourStr: string, intervalMin: number): Promise<void> {
    const [startH, startM] = startHourStr.split(":").map(Number);
    const [endH, endM] = endHourStr.split(":").map(Number);

    const start = new Date(date);
    start.setUTCHours(startH, startM, 0, 0);

    const end = new Date(date);
    end.setUTCHours(endH, endM, 0, 0);

    const slotsToCreate: any[] = [];
    let current = start;

    while (current < end) {
      slotsToCreate.push({
        doctorId,
        date: new Date(current),
        isBlocked: false,
        isBooked: false,
      });

      current = new Date(current.getTime() + intervalMin * 60000);
    }

    if (slotsToCreate.length > 0) {
      // Need to add this method to TimeSlotRepository
      await (this.timeSlotRepository as any).bulkCreate(slotsToCreate);
    }
  }
}
