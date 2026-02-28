"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm border-neutral-200/60 transition-all">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-playfair tracking-tight">Login</CardTitle>
        <CardDescription className="text-neutral-500">
          Acesse sua conta para gerenciar agendamentos.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-4">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Link href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="bg-neutral-50/50"
            />
          </div>

          {state?.message && (
            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-100">
              {state.message}
            </div>
          )}

          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Entrar
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t border-neutral-100 pt-6">
        <p className="text-sm text-neutral-500">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-neutral-900 font-medium hover:underline underline-offset-4">
            Cadastre-se
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
