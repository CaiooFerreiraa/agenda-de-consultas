import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CalendarDays, ShieldCheck, Stethoscope } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-neutral-200">
      <header className="py-6 px-8 border-b border-neutral-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-6 h-6 text-neutral-900" />
          <span className="text-xl font-playfair font-semibold tracking-tight">MedSchedule</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            Entrar
          </Link>
          <Button asChild className="rounded-full px-6">
            <Link href="/register">Cadastre-se</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-neutral-100/50 blur-3xl -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium mb-8 border border-neutral-200 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-500"></span>
          </span>
          Agenda Inteligente 2.0
        </div>

        <h1 className="text-5xl md:text-7xl font-playfair font-medium text-neutral-900 tracking-tight max-w-4xl mb-6">
          Agendamentos com <span className="italic text-neutral-500">precisão</span> e <span className="italic text-neutral-500">elegância</span>.
        </h1>

        <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mb-10 leading-relaxed">
          A plataforma definitiva para conectar pacientes e especialistas. Menos burocracia, mais tempo para cuidar de quem importa.
        </p>

        <div className="flex items-center gap-4 flex-col sm:flex-row">
          <Button asChild size="lg" className="rounded-full px-8 h-12 text-base">
            <Link href="/register">
              Começar Agora
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-base border-neutral-200">
            <Link href="/sobre">
              Conhecer a Plataforma
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mt-32 text-left">
          <div className="p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
              <CalendarDays className="w-6 h-6 text-neutral-700" />
            </div>
            <h3 className="text-xl font-playfair font-medium mb-3">Agenda Inteligente</h3>
            <p className="text-neutral-500 leading-relaxed">
              Sistema de reservas otimizado que evita conflitos e gerencia o tempo com eficiência máxima.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 translate-y-0 md:-translate-y-4">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-neutral-700" />
            </div>
            <h3 className="text-xl font-playfair font-medium mb-3">Dados Seguros</h3>
            <p className="text-neutral-500 leading-relaxed">
              Infraestrutura moderna e criptografia de ponta a ponta garantindo total privacidade para médicos e pacientes.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
              <Stethoscope className="w-6 h-6 text-neutral-700" />
            </div>
            <h3 className="text-xl font-playfair font-medium mb-3">Rede de Excelência</h3>
            <p className="text-neutral-500 leading-relaxed">
              Conectamos você aos melhores especialistas através de uma curadoria rigorosa de profissionais.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-neutral-400 border-t border-neutral-100">
        <p>© {new Date().getFullYear()} MedSchedule. Design minimalista e alta performance.</p>
      </footer>
    </div>
  );
}
