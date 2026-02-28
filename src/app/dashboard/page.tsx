import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CalendarDays, Clock, CheckCircle, ArrowRight, Search, Calendar, DollarSign, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDashboardStatsAction } from "@/actions/dashboard/stats";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const isDoctor = session.user.role === "DOCTOR";
  const stats = await getDashboardStatsAction();
  const firstName = session.user.name?.split(" ")[0] || session.user.email?.split("@")[0];

  if (!isDoctor) {
    // PATIENT HOME VIEW
    return (
      <div className="space-y-10 animate-in fade-in duration-500 selection:bg-primary/10">
        {/* Patient Welcome Header */}
        <div className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-[2.5rem] p-10 lg:p-14 relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                Portal do Paciente
              </p>
              <h1 className="text-5xl font-black mb-4 tracking-[-0.04em]">
                Olá, {firstName}! 🩺
              </h1>
              <p className="text-white/80 text-lg font-medium leading-relaxed">
                Bem-vindo à sua Home. Aqui você gerencia seus agendamentos e encontra os melhores especialistas.
              </p>
            </div>
            <div className="flex gap-4">
              <Button asChild variant="secondary" className="rounded-2xl h-14 px-8 font-black text-primary hover:scale-105 transition-all shadow-xl shadow-black/10">
                <Link href="/dashboard/perfil">Gerenciar Perfil</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Patient Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 flex flex-col gap-6 hover:border-primary/20 hover:shadow-2xl hover:shadow-black/[0.04] transition-all group">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <p className="text-4xl font-black text-neutral-900 leading-none tracking-tighter">{(stats as any).totalAppointments}</p>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-neutral-400 mt-3 group-hover:text-primary transition-colors">Total de Consultas</p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 flex flex-col gap-6 hover:border-emerald-500/20 hover:shadow-2xl hover:shadow-black/[0.04] transition-all group text-emerald-600">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-50 text-emerald-500 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <p className="text-4xl font-black text-neutral-900 leading-none tracking-tighter">{(stats as any).upcomingAppointments}</p>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-neutral-400 mt-3 group-hover:text-emerald-500 transition-colors">Próximos Compromissos</p>
            </div>
          </div>

          <Link href="/" className="bg-gradient-to-br from-emerald-50 to-white rounded-[2rem] border border-emerald-100/50 p-8 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                <Search className="w-7 h-7" />
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-300 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="mt-6">
              <p className="text-lg font-black text-neutral-900 tracking-tight">Buscar Médicos</p>
              <p className="text-xs text-neutral-500 font-medium mt-1">Encontre um especialista e agende agora.</p>
            </div>
          </Link>
        </div>

        {/* Next Appointment Alert (if any) */}
        {(stats as any).upcomingAppointments > 0 ? (
          <div className="bg-white rounded-[2.5rem] border border-neutral-100 p-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-20 h-20 rounded-[1.5rem] bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
              <CalendarDays className="w-10 h-10" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Você tem atendimentos marcados!</h3>
              <p className="text-neutral-500 font-medium mt-1 leading-relaxed">
                Confira os detalhes das suas consultas confirmadas na sua agenda completa.
              </p>
            </div>
            <Button asChild className="h-16 px-10 rounded-[1.25rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-lg shadow-primary/20">
              <Link href="/dashboard/consultas">Ver Minha Agenda</Link>
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] border border-dashed border-neutral-200 p-16 flex flex-col items-center gap-6 text-center">
            <div className="w-20 h-20 rounded-[1.5rem] bg-neutral-50 flex items-center justify-center border border-neutral-100/50">
              <Calendar className="w-10 h-10 text-neutral-200" />
            </div>
            <div className="max-w-md">
              <h3 className="text-2xl font-black text-neutral-800 tracking-tight">Cuidado em primeiro lugar</h3>
              <p className="text-neutral-400 mt-2 font-medium leading-relaxed">
                Você ainda não tem consultas agendadas. Que tal dar o primeiro passo para sua saúde hoje?
              </p>
            </div>
            <Button asChild className="rounded-2xl mt-4 h-14 px-10 font-black shadow-xl shadow-primary/20 text-xs uppercase tracking-[0.2em]">
              <Link href="/">Encontrar um Especialista</Link>
            </Button>
          </div>
        )}
      </div>
    );
  }

  // DOCTOR DASHBOARD VIEW
  const statCards = [
    { label: "Total de Consultas", value: stats.totalAppointments, icon: CalendarDays, color: "text-primary bg-primary/10" },
    { label: "Consultas Hoje", value: (stats as any).todayAppointments, icon: Clock, color: "text-amber-600 bg-amber-50" },
    { label: "Horários Disponíveis", value: (stats as any).availableSlots, icon: CheckCircle, color: "text-emerald-600 bg-emerald-50" },
    { label: "Faturamento Realizado", value: `R$ ${(stats as any).revenue?.toFixed(2)}`, icon: DollarSign, color: "text-blue-600 bg-blue-50" },
  ];

  const quickLinks = [
    { href: "/dashboard/horarios", label: "Gerenciar Horários", desc: "Crie e edite seus slots de atendimento", icon: Clock, color: "bg-blue-50 text-blue-600 border-blue-100" },
    { href: "/dashboard/servicos", label: "Gestão de Serviços", desc: "Configure seus procedimentos e valores", icon: CheckCircle, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 selection:bg-primary/10">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-[2.5rem] p-10 lg:p-14 relative overflow-hidden shadow-2xl shadow-primary/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              Portal do Especialista
            </p>
            <h1 className="text-5xl font-black mb-4 tracking-[-0.04em]">
              Olá, {firstName}! 🛡️
            </h1>
            <p className="text-white/80 text-lg font-medium leading-relaxed">
              Acompanhe seu desempenho e gerencie seus próximos atendimentos de forma eficiente.
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild variant="secondary" className="rounded-2xl h-14 px-8 font-black text-primary hover:scale-105 transition-all shadow-xl shadow-black/10">
              <Link href="/dashboard/perfil">Editar Perfil</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-[2rem] border border-neutral-100 p-8 flex flex-col gap-6 hover:border-primary/20 hover:shadow-2xl hover:shadow-black/[0.04] transition-all group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${color}`}>
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-4xl font-black text-neutral-900 leading-none tracking-tighter">{value}</p>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-neutral-400 mt-3 group-hover:text-primary transition-colors">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & compromissos */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Quick Actions */}
        <div className="xl:col-span-4 space-y-6">
          <h2 className="text-xl font-black text-neutral-900 tracking-tight flex items-center gap-3">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {quickLinks.map(({ href, label, desc, icon: Icon, color }) => (
              <Link key={href} href={href} className="group bg-white rounded-3xl border border-neutral-100 p-7 hover:border-primary/20 hover:shadow-2xl hover:shadow-black/[0.04] transition-all duration-300 flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 transition-colors ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-black text-neutral-900 group-hover:text-primary transition-colors leading-tight">{label}</p>
                  <p className="text-xs text-neutral-400 font-medium mt-1 leading-relaxed">{desc}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Latest Appointment Block */}
        <div className="xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-neutral-900 tracking-tight flex items-center gap-3">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              Próximos Compromissos
            </h2>
            <Button variant="ghost" asChild size="sm" className="text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/5">
              <Link href="/dashboard/consultas" className="flex items-center gap-2">
                Ver Agenda Completa <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-dashed border-neutral-200 p-12 lg:p-20 flex flex-col items-center gap-6 text-center">
            <div className="w-20 h-20 rounded-[1.5rem] bg-neutral-50 flex items-center justify-center border border-neutral-100/50">
              <Calendar className="w-10 h-10 text-neutral-200" />
            </div>
            <div className="max-w-xs">
              <h3 className="text-xl font-black text-neutral-800 tracking-tight">Tudo em dia!</h3>
              <p className="text-sm text-neutral-400 mt-2 font-medium leading-relaxed">
                Nenhum atendimento imediato pendente no sistema.
              </p>
            </div>
            <Button asChild className="rounded-2xl mt-4 h-14 px-10 font-black shadow-xl shadow-primary/20 text-xs uppercase tracking-widest">
              <Link href="/dashboard/horarios">Configurar Minha Agenda</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
