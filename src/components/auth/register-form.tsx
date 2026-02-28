"use client";

import { useActionState, useState } from "react";
import { registerAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2, Stethoscope, Mail, Lock, User, ArrowRight, ShieldCheck, Building2, BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = useState<'PATIENT' | 'DOCTOR' | 'COMPANY'>('PATIENT');

  const handleRegister = async (prevState: any, formData: FormData) => {
    const result = await registerAction(prevState, formData);
    if (result && result.success) {
      router.push("/login?registered=true");
      return;
    }
    return result;
  };

  const [state, formAction, isPending] = useActionState(handleRegister, null);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-neutral-900 tracking-tight">Conecta Saúde</span>
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-xl shadow-black/[0.03] p-8 md:p-10 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="text-center mb-10 relative z-10">
          <h1 className="text-3xl font-black text-neutral-900 mb-2 tracking-tight">Inicie sua Jornada</h1>
          <p className="text-sm text-neutral-500 font-medium">Selecione seu perfil para um atendimento personalizado</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-neutral-100 rounded-2xl mb-8 relative z-10">
          {[
            { id: 'PATIENT', label: 'Paciente', icon: User },
            { id: 'DOCTOR', label: 'Médico', icon: Stethoscope },
            { id: 'COMPANY', label: 'Empresa', icon: Building2 },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setRole(item.id as any)}
              className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl transition-all duration-200 ${role === item.id
                ? 'bg-white text-primary shadow-sm ring-1 ring-black/[0.05]'
                : 'text-neutral-500 hover:text-neutral-800'
                }`}
            >
              <item.icon className={`w-4 h-4 ${role === item.id ? 'text-primary' : 'text-neutral-400'}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </div>

        <form action={formAction} className="space-y-5 relative z-10">
          <input type="hidden" name="role" value={role} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">
                {role === 'COMPANY' ? 'Nome da Instituição' : 'Nome Completo'}
              </Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={role === 'COMPANY' ? "Ex: Hospital Central" : "Ex: João da Silva"}
                  required
                  className="pl-11 h-12 rounded-2xl border-neutral-200 bg-neutral-50/50 focus:bg-white focus:ring-primary/20 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Email Profissional</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contato@servico.com"
                  required
                  className="pl-11 h-12 rounded-2xl border-neutral-200 bg-neutral-50/50 focus:bg-white focus:ring-primary/20 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* Conditional Fields based on Role */}
          {role === 'DOCTOR' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in slide-in-from-top-2 duration-300">
              <div className="space-y-1.5">
                <Label htmlFor="crm" className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Registro Profissional (CRM)</Label>
                <div className="relative group">
                  <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="crm"
                    name="crm"
                    type="text"
                    placeholder="000000-UF"
                    required={role === 'DOCTOR'}
                    className="pl-11 h-12 rounded-2xl border-neutral-200 bg-neutral-50/50 focus:bg-white focus:ring-primary/20 transition-all font-medium"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="specialty" className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Especialidade Principal</Label>
                <div className="relative group">
                  <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors z-10 pointer-events-none" />
                  <select
                    id="specialty"
                    name="specialty"
                    required={role === 'DOCTOR'}
                    defaultValue=""
                    className="flex h-12 w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 pl-11 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer appearance-none font-medium text-neutral-800"
                  >
                    <option value="" disabled>Selecione uma especialidade</option>
                    <option value="Cardiologia">Cardiologia</option>
                    <option value="Neurologia">Neurologia</option>
                    <option value="Ortopedia">Ortopedia</option>
                    <option value="Oftalmologia">Oftalmologia</option>
                    <option value="Pediatria">Pediatria</option>
                    <option value="Anestesiologia">Anestesiologia</option>
                    <option value="Clínico Geral">Clínico Geral</option>
                    <option value="Dermatologia">Dermatologia</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {role === 'COMPANY' && (
            <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
              <Label htmlFor="cnpj" className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Identificação Fiscal (CNPJ)</Label>
              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors" />
                <Input
                  id="cnpj"
                  name="cnpj"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  required={role === 'COMPANY'}
                  className="pl-11 h-12 rounded-2xl border-neutral-200 bg-neutral-50/50 focus:bg-white focus:ring-primary/20 transition-all font-medium"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Senha de Acesso</Label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                required
                minLength={8}
                className="pl-11 h-12 rounded-2xl border-neutral-200 bg-neutral-50/50 focus:bg-white focus:ring-primary/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="pt-4">
            {state?.message && (
              <div className="text-xs font-bold text-red-600 bg-red-50 px-5 py-4 rounded-2xl border border-red-100 flex items-center gap-3 mb-6">
                <span className="shrink-0 text-lg">⚠️</span>
                {state.message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl text-base font-black shadow-xl shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              ) : (
                <>Finalizar Cadastro Profissional <ArrowRight className="w-5 h-5 ml-3" /></>
              )}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-neutral-400 mt-10 font-medium">
          Já faz parte da Conecta Saúde?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Acesse sua conta
          </Link>
        </p>
      </div>

      <div className="mt-8 text-center text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-bold opacity-50 flex items-center justify-center gap-4">
        <span>Dados Criptografados</span>
        <div className="w-1 h-1 bg-neutral-300 rounded-full" />
        <span>Conformidade Médica</span>
        <div className="w-1 h-1 bg-neutral-300 rounded-full" />
        <span>Suporte 24/7</span>
      </div>
    </div>
  );
}
