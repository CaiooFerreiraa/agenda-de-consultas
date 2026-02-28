"use server";

import { auth } from "@/auth";
import { prisma } from "@/infrastructure/database/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(prevState: any, formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return { error: "Não autorizado" };
  }

  const userId = session.user.id;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as "PATIENT" | "DOCTOR";
  const crm = formData.get("crm") as string;
  const specialty = formData.get("specialty") as string;
  const bio = formData.get("bio") as string;
  const formation = formData.get("formation") as string;
  const experience = formData.get("experience") as string;


  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        role,
        crm: crm || null,
        specialty: specialty || null,
        bio: bio || null,
        formation: formation || null,
        experience: experience ? parseInt(experience) : 0,

      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/perfil");

    return { success: true, message: "Perfil atualizado com sucesso!" };
  } catch (error: any) {
    console.error("Erro ao atualizar perfil:", error);
    return { error: "Erro ao atualizar dados. Verifique as informações." };
  }
}
