export interface TimeSlotEntity {
  id: string;
  doctorId: string;
  date: Date;
  isBlocked: boolean;
  isBooked: boolean;
}
