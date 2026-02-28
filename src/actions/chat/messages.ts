"use server";

import { prisma } from "@/infrastructure/database/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function sendMessageAction(receiverId: string, content: string) {
  try {
    const session = await auth();
    if (!session || !session.user) throw new Error("Não autorizado");

    const senderId = session.user.id;

    // Find or create chat
    const isDoctor = session.user.role === "DOCTOR";
    const patientId = isDoctor ? receiverId : senderId;
    const doctorId = isDoctor ? senderId : receiverId;

    let chat = await prisma.chat.findUnique({
      where: {
        patientId_doctorId: { patientId, doctorId }
      }
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: { patientId, doctorId }
      });
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        receiverId,
        chatId: chat.id
      }
    });

    revalidatePath(`/dashboard/chat/${chat.id}`);
    return { success: true, message };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getChatAction(otherUserId: string) {
  const session = await auth();
  if (!session || !session.user) return null;

  const currentId = session.user.id;
  const isDoctor = session.user.role === "DOCTOR";
  const patientId = isDoctor ? otherUserId : currentId;
  const doctorId = isDoctor ? currentId : otherUserId;

  const chat = await prisma.chat.findUnique({
    where: {
      patientId_doctorId: { patientId, doctorId }
    },
    include: {
      messages: {
        orderBy: { createdAt: "asc" }
      }
    }
  });

  return chat;
}

export async function listMyChatsAction() {
  const session = await auth();
  if (!session || !session.user) return [];

  const userId = session.user.id;
  const isDoctor = session.user.role === "DOCTOR";

  const chats = await prisma.chat.findMany({
    where: isDoctor ? { doctorId: userId } : { patientId: userId },
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1
      },
      // In a real app, join with User to get names
    }
  });

  return chats;
}
