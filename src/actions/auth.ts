"use server";

import { signIn, signOut } from "@/auth";
import { RegisterUserUseCase } from "@/domain/use-cases/auth/register-user";
import { PrismaUserRepository } from "@/infrastructure/repositories/prisma-user-repository";
import { AuthError } from "next-auth";

export async function loginAction(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Credenciais inválidas." };
        default:
          return { message: "Ocorreu um erro no login." };
      }
    }
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}

export async function registerAction(prevState: any, formData: FormData) {
  try {
    const userRepository = new PrismaUserRepository();
    const registerUser = new RegisterUserUseCase(userRepository);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const role = (formData.get("role") as 'PATIENT' | 'DOCTOR') || 'PATIENT';

    await registerUser.execute({
      email,
      password,
      name,
      role,
    });

    return { success: true };
  } catch (error: any) {
    return { message: error.message || "Erro ao registrar usuário." };
  }
}
