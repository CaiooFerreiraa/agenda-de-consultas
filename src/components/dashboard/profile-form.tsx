"use client";

import { useActionState } from "react";
import { updateProfileAction } from "@/actions/user/update-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, User, Mail, BadgeCheck, Stethoscope, DollarSign, Save, FileText, Award } from "lucide-react";

export default function ProfileForm({ user }: { user: any }) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, null);

  return (
    <form action={formAction} className="p-8 md:p-10 space-y-8">
      {/* Section: Basic Info */}
      <div className="space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
          <User className="w-4 h-4" /> Informações Básicas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Nome Completo</Label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors" />
              <Input
                id="name"
                name="name"
                defaultValue={user.name || ""}
                placeholder="Seu nome"
                required
                className="pl-11 h-12 rounded-2xl border-neutral-200 bg-neutral-50/50 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Email</Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors" />
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={user.email || ""}
                placeholder="seu@email.com"
                required
                className="pl-11 h-12 rounded-2xl border-neutral-200 bg-neutral-50/50 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="role" className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Tipo de Perfil</Label>
            <div className="relative group">
              <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors z-10 pointer-events-none" />
              <select
                id="role"
                name="role"
                defaultValue={user.role}
                className="flex h-12 w-full font-sans rounded-2xl border border-neutral-200 bg-neutral-50/50 pl-11 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer appearance-none font-medium"
              >
                <option value="PATIENT" className="font-sans">👤 Paciente (Buscar Consultas)</option>
                <option value="DOCTOR" className="font-sans">🩺 Médico / Especialista (Gerir Agenda)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Professional Info (Only for Doctors) */}
      {user.role === 'DOCTOR' && (
        <div className="space-y-6 pt-6 border-t border-neutral-50">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
            <Stethoscope className="w-4 h-4" /> Informações Profissionais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <Label htmlFor="crm" className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">CRM (Registro Profissional)</Label>
              <div className="relative group">
                <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors" />
                <Input
                  id="crm"
                  name="crm"
                  defaultValue={user.crm || ""}
                  placeholder="000000-UF"
                  className="pl-11 h-12 rounded-2xl border-neutral-200 bg-neutral-50/50 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="specialty" className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Especialidade</Label>
              <div className="relative group">
                <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors z-10 pointer-events-none" />
                <select
                  id="specialty"
                  name="specialty"
                  defaultValue={user.specialty || ""}
                  className="flex h-12 w-full font-sans rounded-2xl border border-neutral-200 bg-neutral-50/50 pl-11 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer appearance-none font-medium text-neutral-800"
                >
                  <option value="" disabled className="font-sans">Selecione uma especialidade</option>
                  <option value="Cardiologia" className="font-sans">Cardiologia</option>
                  <option value="Neurologia" className="font-sans">Neurologia</option>
                  <option value="Ortopedia" className="font-sans">Ortopedia</option>
                  <option value="Oftalmologia" className="font-sans">Oftalmologia</option>
                  <option value="Pediatria" className="font-sans">Pediatria</option>
                  <option value="Anestesiologia" className="font-sans">Anestesiologia</option>
                  <option value="Clínico Geral" className="font-sans">Clínico Geral</option>
                  <option value="Dermatologia" className="font-sans">Dermatologia</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="experience" className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Anos de Experiência</Label>
              <div className="relative group">
                <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors" />
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  defaultValue={user.experience || 0}
                  placeholder="Ex: 8"
                  className="pl-11 h-12 rounded-2xl border-neutral-200 bg-neutral-50/50 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="formation" className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Formação / Histórico Acadêmico</Label>
              <div className="relative group">
                <FileText className="absolute left-4 top-4 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors" />
                <Textarea
                  id="formation"
                  name="formation"
                  defaultValue={user.formation || ""}
                  placeholder="Descreva sua formação (uma por linha ou separada por ponto)..."
                  className="pl-11 min-h-[100px] rounded-2xl border-neutral-200 bg-neutral-50/50 focus:bg-white transition-all font-medium py-3"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bio" className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Bio / Descrição Profissional</Label>
            <div className="relative group">
              <FileText className="absolute left-4 top-4 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors" />
              <Textarea
                id="bio"
                name="bio"
                defaultValue={user.bio || ""}
                placeholder="Conte um pouco sobre sua experiência..."
                className="pl-11 min-h-[120px] rounded-2xl border-neutral-200 bg-neutral-50/50 focus:bg-white transition-all font-medium py-3"
              />
            </div>
          </div>
        </div>
      )}

      <div className="pt-6 border-t border-neutral-50 flex flex-col sm:flex-row items-center gap-4">
        <Button
          type="submit"
          className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold shadow-lg shadow-primary/20"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isPending ? "Salvando..." : "Salvar Alterações"}
        </Button>

        {state?.success && (
          <p className="text-sm font-bold text-emerald-600 animate-in fade-in duration-300">
            ✨ {state.message}
          </p>
        )}

        {state?.error && (
          <p className="text-sm font-bold text-red-600 animate-in fade-in duration-300">
            ⚠️ {state.error}
          </p>
        )}
      </div>
    </form>
  );
}
