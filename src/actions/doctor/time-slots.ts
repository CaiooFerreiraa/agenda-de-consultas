"use server";

import { auth } from "@/auth";
import { PrismaTimeSlotRepository } from "@/infrastructure/repositories/prisma-time-slot-repository";
import { ManageTimeSlotUseCase } from "@/domain/use-cases/doctor/manage-time-slot";
import { revalidatePath } from "next/cache";

export async function createTimeSlotAction(prevState: any, formData: FormData) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'DOCTOR') {
      throw new Error("Unauthorized");
    }

    const dateStr = formData.get("date") as string;
    const timeStr = formData.get("time") as string;

    if (!dateStr || !timeStr) {
      throw new Error("Date and time are required");
    }

    const dateTime = new Date(`${dateStr}T${timeStr}`);

    const repository = new PrismaTimeSlotRepository();
    const useCase = new ManageTimeSlotUseCase(repository);

    await useCase.create(session.user.id, dateTime);

    revalidatePath("/dashboard/horarios");
    return { success: true };
  } catch (error: any) {
    return { message: error.message || "Error creating time slot" };
  }
}

export async function blockTimeSlotAction(timeSlotId: string) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'DOCTOR') {
      throw new Error("Unauthorized");
    }

    const repository = new PrismaTimeSlotRepository();
    const useCase = new ManageTimeSlotUseCase(repository);

    await useCase.block(session.user.id, timeSlotId);

    revalidatePath("/dashboard/horarios");
    return { success: true };
  } catch (error: any) {
    return { message: error.message || "Error blocking time slot" };
  }
}

export async function unblockTimeSlotAction(timeSlotId: string) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'DOCTOR') {
      throw new Error("Unauthorized");
    }

    const repository = new PrismaTimeSlotRepository();
    const useCase = new ManageTimeSlotUseCase(repository);

    await useCase.unblock(session.user.id, timeSlotId);

    revalidatePath("/dashboard/horarios");
    return { success: true };
  } catch (error: any) {
    return { message: error.message || "Error unblocking time slot" };
  }
}

export async function listDoctorTimeSlots() {
  const session = await auth();
  if (!session || session.user.role !== 'DOCTOR') return [];

  const repository = new PrismaTimeSlotRepository();
  const useCase = new ManageTimeSlotUseCase(repository);
  return useCase.list(session.user.id);
}
