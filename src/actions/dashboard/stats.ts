"use server";

import { auth } from "@/auth";
import { prisma } from "@/infrastructure/database/prisma";
import { startOfDay, endOfDay } from "date-fns";

export async function getDashboardStatsAction() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Não autorizado");
  }

  const userId = session.user.id;
  const isDoctor = session.user.role === "DOCTOR";

  if (isDoctor) {
    const today = new Date();

    const [totalAppointments, todayAppointments, availableSlots] = await Promise.all([
      prisma.appointment.count({
        where: { doctorId: userId }
      }),
      prisma.appointment.count({
        where: {
          doctorId: userId,
          timeSlot: {
            date: {
              gte: startOfDay(today),
              lte: endOfDay(today)
            }
          }
        }
      }),
      prisma.timeSlot.count({
        where: {
          doctorId: userId,
          isBooked: false,
          isBlocked: false,
          date: { gte: today }
        }
      })
    ]);

    // Calculate revenue manually since price is on User model
    const completedAppointments = await prisma.appointment.findMany({
      where: {
        doctorId: userId,
        status: "COMPLETED"
      },
      select: {
        doctor: {
          select: { price: true }
        }
      }
    });

    const revenue = completedAppointments.reduce((acc: number, curr: any) => acc + (Number(curr.doctor.price) || 0), 0);

    return {
      totalAppointments,
      todayAppointments,
      availableSlots,
      revenue
    };
  } else {
    // Patient Stats
    const [totalAppointments, upcomingAppointments] = await Promise.all([
      prisma.appointment.count({
        where: { patientId: userId }
      }),
      prisma.appointment.count({
        where: {
          patientId: userId,
          status: "SCHEDULED",
          timeSlot: { date: { gte: new Date() } }
        }
      })
    ]);

    return {
      totalAppointments,
      upcomingAppointments
    };
  }
}
