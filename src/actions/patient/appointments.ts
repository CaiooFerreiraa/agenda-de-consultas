"use server";

import { auth } from "@/auth";
import { PrismaAppointmentRepository } from "@/infrastructure/repositories/prisma-appointment-repository";
import { PrismaTimeSlotRepository } from "@/infrastructure/repositories/prisma-time-slot-repository";
import { PrismaUserRepository } from "@/infrastructure/repositories/prisma-user-repository";
import { ManageAppointmentUseCase } from "@/domain/use-cases/patient/manage-appointment";
import { revalidatePath } from "next/cache";

export async function createAppointmentAction(prevState: any, formData: FormData) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'PATIENT') {
      throw new Error("Unauthorized");
    }

    const doctorId = formData.get("doctorId") as string;
    const timeSlotId = formData.get("timeSlotId") as string;
    const serviceId = formData.get("serviceId") as string;
    const notes = formData.get("notes") as string;

    if (!doctorId || !timeSlotId) {
      throw new Error("Missing required fields");
    }

    const appointmentRepo = new PrismaAppointmentRepository();
    const timeSlotRepo = new PrismaTimeSlotRepository();
    const userRepo = new PrismaUserRepository();

    const useCase = new ManageAppointmentUseCase(appointmentRepo, timeSlotRepo, userRepo);

    await useCase.create(session.user.id, doctorId, timeSlotId, notes, serviceId);

    revalidatePath("/dashboard/consultas");
    return { success: true };
  } catch (error: any) {
    return { message: error.message || "Error scheduling appointment" };
  }
}

export async function cancelAppointmentAction(appointmentId: string, formData?: FormData) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'PATIENT') {
      throw new Error("Unauthorized");
    }

    const appointmentRepo = new PrismaAppointmentRepository();
    const timeSlotRepo = new PrismaTimeSlotRepository();
    const userRepo = new PrismaUserRepository();

    const useCase = new ManageAppointmentUseCase(appointmentRepo, timeSlotRepo, userRepo);

    await useCase.cancel(session.user.id, appointmentId);

    revalidatePath("/dashboard/consultas");
    return { success: true };
  } catch (error: any) {
    return { message: error.message || "Error cancelling appointment" };
  }
}

export async function listPatientAppointments() {
  const session = await auth();
  if (!session || session.user.role !== 'PATIENT') return [];

  const appointmentRepo = new PrismaAppointmentRepository();

  return appointmentRepo.findByPatientId(session.user.id);
}
