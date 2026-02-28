"use server";

import { PrismaUserRepository } from "@/infrastructure/repositories/prisma-user-repository";

import { prisma } from "@/infrastructure/database/prisma";

export async function getPublicDoctorsAction(query?: string) {
  const userRepo = new PrismaUserRepository();
  return userRepo.findDoctors(query);
}

export async function getPublicDoctorByIdAction(id: string) {
  const doctor = await prisma.user.findUnique({
    where: { id },
    include: {
      reviewsRaw: {
        include: {
          patient: {
            select: { name: true }
          }
        },
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!doctor || doctor.role !== "DOCTOR") {
    return null;
  }

  return doctor;
}
