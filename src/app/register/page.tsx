import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";
import { Stethoscope, BadgeCheck, Building2, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Cadastre-se | MedSchedule",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-[#F4F7FE]">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-gradient-to-br from-primary to-blue-700 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full border-2 border-white" />
          <div className="absolute top-32 left-24 w-48 h-48 rounded-full border border-white" />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full border-2 border-white" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-16">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">MedSchedule</span>
          </div>

          <h2 className="text-4xl font-extrabold leading-tight mb-6 tracking-tight">
            Faça parte da maior rede de saúde do país.
          </h2>
          <p className="text-white/80 text-lg leading-relaxed font-medium">
            Para pacientes que buscam cuidado acessível. Para médicos que querem crescer. Para hospitais que precisam de agilidade.
          </p>
        </div>

        <div className="relative z-10 space-y-3">
          {[
            { icon: Heart, label: "Para Pacientes", desc: "Encontre especialistas e agende consultas em minutos." },
            { icon: BadgeCheck, label: "Para Médicos", desc: "Gerencie sua agenda e expanda sua base de pacientes." },
            { icon: Building2, label: "Para Hospitais", desc: "Acione profissionais verificados sob demanda." },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-white">{label}</p>
                <p className="text-xs text-white/70 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
