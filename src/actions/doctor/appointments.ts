"use server";

import { auth } from "@/auth";
import { PrismaAppointmentRepository } from "@/infrastructure/repositories/prisma-appointment-repository";
import { ManageDoctorAppointmentUseCase } from "@/domain/use-cases/doctor/manage-appointments";
import { revalidatePath } from "next/cache";

export async function completeAppointmentAction(appointmentId: string) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'DOCTOR') {
      throw new Error("Unauthorized");
    }

    const appointmentRepo = new PrismaAppointmentRepository();
    const useCase = new ManageDoctorAppointmentUseCase(appointmentRepo);

    await useCase.complete(session.user.id, appointmentId);

    revalidatePath("/dashboard/agenda");
    return { success: true };
  } catch (error: any) {
    return { message: error.message || "Error completing appointment" };
  }
}

export async function cancelDoctorAppointmentAction(appointmentId: string) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'DOCTOR') {
      throw new Error("Unauthorized");
    }

    const appointmentRepo = new PrismaAppointmentRepository();
    const useCase = new ManageDoctorAppointmentUseCase(appointmentRepo);

    await useCase.cancel(session.user.id, appointmentId);

    revalidatePath("/dashboard/agenda");
    return { success: true };
  } catch (error: any) {
    return { message: error.message || "Error cancelling appointment" };
  }
}

export async function listDoctorAppointments() {
  const session = await auth();
  if (!session || session.user.role !== 'DOCTOR') return [];

  const appointmentRepo = new PrismaAppointmentRepository();
  const useCase = new ManageDoctorAppointmentUseCase(appointmentRepo);

  return useCase.list(session.user.id);
}
