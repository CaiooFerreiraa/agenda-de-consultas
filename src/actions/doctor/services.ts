"use server";

import { prisma } from "@/infrastructure/database/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createServiceAction(prevState: any, formData: FormData) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "DOCTOR") throw new Error("Não autorizado");

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const priceStr = formData.get("price") as string;
    const durationStr = formData.get("duration") as string;

    if (!name || !priceStr) throw new Error("Nome e preço são obrigatórios");

    await prisma.service.create({
      data: {
        doctorId: session.user.id,
        name,
        description,
        price: parseFloat(priceStr),
        duration: durationStr ? parseInt(durationStr) : null
      }
    });

    revalidatePath("/dashboard/servicos");
    return { success: true, message: "Serviço adicionado com sucesso!" };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteServiceAction(serviceId: string) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "DOCTOR") throw new Error("Não autorizado");

    await prisma.service.delete({
      where: {
        id: serviceId,
        doctorId: session.user.id
      }
    });

    revalidatePath("/dashboard/servicos");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function listDoctorServices() {
  const session = await auth();
  if (!session || session.user.role !== "DOCTOR") return [];

  return prisma.service.findMany({
    where: { doctorId: session.user.id },
    orderBy: { createdAt: "desc" }
  });
}
