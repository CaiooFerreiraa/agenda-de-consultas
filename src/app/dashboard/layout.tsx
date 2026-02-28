import { auth } from "@/auth";
import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut, Calendar, Clock, PlusCircle, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const isDoctor = session.user.role === 'DOCTOR';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-neutral-50">
      <aside className="w-full md:w-64 bg-white border-r border-neutral-100 flex flex-col">
        <div className="p-6 border-b border-neutral-100">
          <Link href="/dashboard" className="text-xl font-playfair font-semibold tracking-tight">
            MedSchedule
          </Link>
          <div className="mt-2 text-xs text-neutral-500 font-medium bg-neutral-100 px-2 py-1 rounded-md inline-block">
            {isDoctor ? 'Portal do Médico' : 'Portal do Paciente'}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            Visão Geral
          </Link>

          <Link href="/dashboard/consultas" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md transition-colors">
            <Calendar className="w-4 h-4" />
            Minhas Consultas
          </Link>

          {isDoctor ? (
            <Link href="/dashboard/horarios" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md transition-colors">
              <Clock className="w-4 h-4" />
              Gestão de Horários
            </Link>
          ) : (
            <Link href="/dashboard/agendar" className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md transition-colors">
              <PlusCircle className="w-4 h-4" />
              Agendar Consulta
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-neutral-100">
          <div className="mb-4 px-3 text-sm text-neutral-600 truncate">
            {session.user.name || session.user.email}
          </div>
          <form action={logoutAction}>
            <Button variant="outline" type="submit" className="w-full justify-start gap-2 shadow-none text-neutral-600">
              <LogOut className="w-4 h-4" />
              Sair da Conta
            </Button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
