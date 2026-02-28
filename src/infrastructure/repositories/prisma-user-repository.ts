import { prisma } from "../database/prisma";
import { UserEntity } from "@/domain/entities/user";
import { UserRepository } from "@/domain/repositories/user-repository";

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return user as UserEntity;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return user as UserEntity;
  }

  async create(data: Omit<UserEntity, "id">): Promise<UserEntity> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        specialty: data.specialty,
        crm: data.crm,
      },
    });
    return user as UserEntity;
  }
}
