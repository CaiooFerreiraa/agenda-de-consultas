"use server";

import { auth } from "@/auth";
import { prisma } from "@/infrastructure/database/prisma";
import { revalidatePath } from "next/cache";

export async function createReviewAction(
  appointmentId: string,
  rating: number,
  comment: string
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "PATIENT") {
    return { error: "Não autorizado" };
  }

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { review: true }
    });

    if (!appointment) return { error: "Agendamento não encontrado" };
    if (appointment.status !== "COMPLETED") {
      return { error: "Só é possível avaliar consultas concluídas" };
    }
    if (appointment.review) {
      return { error: "Este agendamento já foi avaliado" };
    }

    await prisma.review.create({
      data: {
        appointmentId,
        patientId: session.user.id,
        doctorId: appointment.doctorId,
        rating,
        comment: comment.trim() || null
      }
    });

    revalidatePath("/dashboard/consultas");
    return { success: true, message: "Avaliação enviada com sucesso!" };
  } catch (error: any) {
    console.error("Review creation failed:", error);
    return { error: "Erro ao enviar avaliação" };
  }
}
