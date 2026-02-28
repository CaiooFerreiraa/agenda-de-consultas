"use server";

import { auth } from "@/auth";
import { prisma } from "@/infrastructure/database/prisma";

export async function updatePresenceAction() {
  const session = await auth();
  if (!session?.user) return;

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { lastSeen: new Date() }
    });
  } catch (error) {
    console.error("Presence update failed:", error);
  }
}
