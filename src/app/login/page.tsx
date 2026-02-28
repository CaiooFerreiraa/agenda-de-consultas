import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { Stethoscope, ShieldCheck, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Login | Conecta Saúde",
};

export default function LoginPage() {
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
            <span className="text-xl font-bold">Conecta Saúde</span>
          </div>

          <h2 className="text-4xl font-extrabold leading-tight mb-6 tracking-tight">
            A plataforma de saúde mais completa do Brasil.
          </h2>
          <p className="text-white/80 text-lg leading-relaxed font-medium">
            Conectando pacientes, médicos e hospitais de forma simples, rápida e segura.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4">
          {[
            { icon: Users, label: "+2.500 Especialistas" },
            { icon: ShieldCheck, label: "Plataforma Segura" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 flex items-center gap-3">
              <Icon className="w-5 h-5 text-white/80" />
              <span className="text-sm font-medium text-white/90">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
