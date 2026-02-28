"use server";

import { PrismaUserRepository } from "@/infrastructure/repositories/prisma-user-repository";
import { PrismaTimeSlotRepository } from "@/infrastructure/repositories/prisma-time-slot-repository";
import { ListOptionsUseCase } from "@/domain/use-cases/patient/list-options";

export async function listAvailableDoctors() {
  const userRepo = new PrismaUserRepository();
  const useCase = new ListOptionsUseCase(userRepo);

  return useCase.listDoctors();
}

export async function listDoctorAvailableTimeSlots(doctorId: string) {
  if (!doctorId) return [];

  const timeSlotRepo = new PrismaTimeSlotRepository();
  // Re-use logic or could make another UseCase, but keep simple
  return timeSlotRepo.findAvailableByDoctorId(doctorId);
}
