import { UserRepository } from "@/domain/repositories/user-repository";
import { UserEntity } from "@/domain/entities/user";
import bcrypt from "bcryptjs";

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(data: Omit<UserEntity, "id">): Promise<UserEntity> {
    if (!data.email || !data.password) {
      throw new Error("Email and password are required");
    }

    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }
}
