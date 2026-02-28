"use client";

import { useActionState } from "react";
import { registerAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();

  const handleRegister = async (prevState: any, formData: FormData) => {
    const result = await registerAction(prevState, formData);
    if (result && result.success) {
      router.push("/login?registered=true");
      return;
    }
    return result;
  };

  const [state, formAction, isPending] = useActionState(handleRegister, undefined);

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm border-neutral-200/60 transition-all">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-playfair tracking-tight">Criar Conta</CardTitle>
        <CardDescription className="text-neutral-500">
          Junte-se à plataforma para agendar consultas facilmente.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Ex: João da Silva"
              required
              className="bg-neutral-50/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              className="bg-neutral-50/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              className="bg-neutral-50/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Tipo de Conta</Label>
            <select
              name="role"
              id="role"
              className="flex h-10 w-full rounded-md border border-neutral-200/60 bg-neutral-50/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="PATIENT">Paciente</option>
              <option value="DOCTOR">Médico</option>
            </select>
          </div>

          {state?.message && (
            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-100">
              {state.message}
            </div>
          )}

          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Cadastrar
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t border-neutral-100 pt-6">
        <p className="text-sm text-neutral-500">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-neutral-900 font-medium hover:underline underline-offset-4">
            Faça login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
