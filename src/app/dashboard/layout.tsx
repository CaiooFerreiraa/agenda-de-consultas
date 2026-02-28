import { auth } from "@/auth";
import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut, Calendar, Clock, LayoutDashboard, Search, Stethoscope, ChevronRight, UserCircle, Package } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PresenceHeartbeat } from "@/components/dashboard/presence-heartbeat";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const isDoctor = session.user.role === "DOCTOR";
  const firstName = session.user.name?.split(" ")[0] || session.user.email?.split("@")[0];
  const initials = session.user.name
    ? session.user.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
    : session.user.email?.[0].toUpperCase() ?? "U";

  const navItems = [
    { href: "/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/dashboard/consultas", label: isDoctor ? "Agenda de Consultas" : "Minhas Consultas", icon: Calendar },
    ...(isDoctor
      ? [
        { href: "/dashboard/horarios", label: "Gestão de Horários", icon: Clock },
        { href: "/dashboard/servicos", label: "Meus Serviços", icon: Package },
      ]
      : []),
    { href: "/dashboard/perfil", label: "Meu Perfil", icon: UserCircle },
  ];

  return (
    <div className="min-h-screen flex bg-[#F4F7FE]">
      <PresenceHeartbeat />
      {/* Sidebar - FIXED HEIGHT, NO SCROLL TO SEE SAIR */}
      <aside className="w-64 shrink-0 bg-white border-r border-neutral-100 flex flex-col hidden md:flex h-screen sticky top-0 overflow-hidden">
        {/* Logo */}
        <div className="p-5 border-b border-neutral-100">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black text-neutral-900 tracking-tight">Conecta Saúde</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 mt-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="group flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-neutral-600 hover:bg-neutral-50 hover:text-primary transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center group-hover:bg-white shadow-sm transition-all border border-transparent group-hover:border-neutral-100">
                  <Icon className="w-4 h-4" />
                </div>
                {label}
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-neutral-300" />
            </Link>
          ))}
        </nav>

        {/* User Footer - ALWAYS VISIBLE */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50/30 space-y-4">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-primary hover:bg-white transition-all border border-transparent hover:border-neutral-100"
          >
            <div className="w-6 h-6 rounded-lg bg-neutral-100 flex items-center justify-center">
              <LogOut className="w-3 h-3 rotate-180" />
            </div>
            Voltar para o Site
          </Link>

          <div className="bg-white p-3 rounded-2xl border border-neutral-200/60 shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-10 h-10 bg-primary/5 rounded-full blur-xl translate-x-1/2 -translate-y-1/2" />

            <div className="flex items-center gap-3 mb-3 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-primary/20">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-neutral-900 truncate tracking-tight">{firstName}</p>
                <p className="text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-1 py-0.5 rounded-md inline-block">
                  {isDoctor ? "🩺 Especialista" : "👤 Paciente"}
                </p>
              </div>
            </div>

            <form action={logoutAction} className="relative z-10">
              <Button
                variant="outline"
                size="sm"
                className="w-full h-8 rounded-lg text-[9px] font-bold uppercase tracking-widest border-neutral-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all flex items-center gap-2 px-2"
              >
                <LogOut className="w-2.5 h-2.5" />
                Sair da Conta
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-100 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-neutral-900 text-sm">Conecta Saúde</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Desktop Top Header */}
        <header className="hidden md:flex items-center justify-between px-10 lg:px-14 xl:px-20 py-5 bg-white/50 backdrop-blur-md sticky top-0 z-30 border-b border-neutral-100/50">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-bold uppercase tracking-widest">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="opacity-50">/</span>
            <span>{isDoctor ? "Portal do Especialista" : "Portal do Paciente"}</span>
          </div>
          <Button asChild variant="outline" size="sm" className="rounded-xl h-9 px-4 text-xs font-bold border-neutral-200 hover:bg-neutral-50 gap-2">
            <Link href="/">
              <Search className="w-3.5 h-3.5" />
              Voltar para o Site
            </Link>
          </Button>
        </header>

        <div className="p-6 md:p-10 w-full pt-16 md:pt-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="w-full max-w-[1700px] mx-auto">
            {children}
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-2 py-2 flex items-center justify-around z-50">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={label} href={href} className="flex flex-col items-center gap-1 text-neutral-500 hover:text-primary transition-colors px-3 py-1">
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label.split(" ")[0]}</span>
            </Link>
          ))}
          <form action={logoutAction}>
            <button type="submit" className="flex flex-col items-center gap-1 text-neutral-500 hover:text-red-500 transition-colors px-3 py-1 cursor-pointer">
              <LogOut className="w-5 h-5" />
              <span className="text-[10px] font-medium">Sair</span>
            </button>
          </form>
        </nav>
      </main>
    </div>
  );
}
