import { TimeSlotEntity } from "../entities/time-slot";

export interface TimeSlotRepository {
  create(data: Omit<TimeSlotEntity, "id">): Promise<TimeSlotEntity>;
  findById(id: string): Promise<TimeSlotEntity | null>;
  findAvailableByDoctorId(doctorId: string): Promise<TimeSlotEntity[]>;
  findByDoctorId(doctorId: string): Promise<TimeSlotEntity[]>;
  update(id: string, data: Partial<TimeSlotEntity>): Promise<TimeSlotEntity>;
  delete(id: string): Promise<void>;
  syncBlockedDays(doctorId: string, dates: Date[]): Promise<void>;
  bulkCreate(slots: Omit<TimeSlotEntity, "id">[]): Promise<void>;
}
