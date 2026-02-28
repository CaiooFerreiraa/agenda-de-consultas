import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, CheckCircle } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const isDoctor = session.user.role === 'DOCTOR';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-4xl font-playfair font-medium tracking-tight mb-2">
          Olá, {session.user.name || session.user.email?.split('@')[0]}
        </h1>
        <p className="text-neutral-500">
          Acompanhe suas consultas e horários.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-neutral-100/50 bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Total de Consultas
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">0</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-neutral-100/50 bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">
              Consultas Hoje
            </CardTitle>
            <Clock className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">0</div>
          </CardContent>
        </Card>

        {isDoctor && (
          <Card className="shadow-sm border-neutral-100/50 bg-white/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neutral-600">
                Horários Disponíveis
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-neutral-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">0</div>
            </CardContent>
          </Card>
        )}
      </div>

      <h2 className="text-2xl font-playfair font-medium mt-12 mb-6 border-b border-neutral-100 pb-2">Próximos Compromissos</h2>

      <div className="text-center p-12 bg-white rounded-2xl border border-neutral-100 border-dashed">
        <p className="text-neutral-500">Nenhum compromisso encontrado para os próximos dias.</p>
      </div>
    </div>
  );
}
