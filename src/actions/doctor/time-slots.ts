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

export async function updateBlockedDaysAction(datesIsoStrings: string[]) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'DOCTOR') {
      throw new Error("Unauthorized");
    }

    const repository = new PrismaTimeSlotRepository();
    const useCase = new ManageTimeSlotUseCase(repository);

    const dates = datesIsoStrings.map(d => new Date(d));
    await useCase.syncBlockedDays(session.user.id, dates);

    revalidatePath("/dashboard/horarios");
    return { success: true };
  } catch (error: any) {
    return { message: error.message || "Error updating blocked days" };
  }
}

export async function bulkCreateTimeSlotsAction(prevState: any, formData: FormData) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'DOCTOR') {
      throw new Error("Unauthorized");
    }

    const dateStr = formData.get("date") as string;
    const startHourStr = formData.get("startHour") as string;
    const endHourStr = formData.get("endHour") as string;
    const intervalStr = formData.get("interval") as string;

    if (!dateStr || !startHourStr || !endHourStr || !intervalStr) {
      throw new Error("Preencha todos os campos.");
    }

    const intervalMin = parseInt(intervalStr, 10);
    const date = new Date(dateStr);

    const repository = new PrismaTimeSlotRepository();
    const useCase = new ManageTimeSlotUseCase(repository);

    await useCase.bulkCreate(session.user.id, date, startHourStr, endHourStr, intervalMin);

    revalidatePath("/dashboard/horarios");
    return { success: true };
  } catch (error: any) {
    return { message: error.message || "Erro ao gerar horários" };
  }
}
