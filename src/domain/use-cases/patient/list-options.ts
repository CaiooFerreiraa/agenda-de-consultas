import { UserRepository } from "@/domain/repositories/user-repository";
import { UserEntity } from "@/domain/entities/user";
import { prisma } from "@/infrastructure/database/prisma";

export class ListOptionsUseCase {
  constructor(private userRepository: UserRepository) { }

  async listDoctors(): Promise<UserEntity[]> {
    const doctors = await prisma.user.findMany({
      where: {
        role: 'DOCTOR'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        specialty: true,
        crm: true,
      }
    });
    return doctors as UserEntity[];
  }
}
