import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  listDoctorTimeSlots,
  createTimeSlotAction,
  blockTimeSlotAction,
  unblockTimeSlotAction
} from "@/actions/doctor/time-slots";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function HorariosPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'DOCTOR') {
    redirect("/dashboard");
  }

  const timeSlots = await listDoctorTimeSlots();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <header className="mb-8 border-b border-neutral-100 pb-6">
        <h1 className="text-4xl font-playfair font-medium tracking-tight mb-2">
          Gestão de Horários
        </h1>
        <p className="text-neutral-500">
          Adicione, bloqueie ou libere horários de atendimento.
        </p>
      </header>

      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm mb-12">
        <h2 className="text-xl font-playfair font-medium mb-4">Novo Horário</h2>
        <form action={createTimeSlotAction} className="flex flex-col md:flex-row items-end gap-4">
          <div className="space-y-2 flex-1 w-full">
            <Label htmlFor="date">Data da Consulta</Label>
            <Input id="date" name="date" type="date" required className="bg-neutral-50/50" />
          </div>
          <div className="space-y-2 flex-1 w-full">
            <Label htmlFor="time">Horário (HH:mm)</Label>
            <Input id="time" name="time" type="time" required className="bg-neutral-50/50" />
          </div>
          <Button type="submit" className="w-full md:w-auto h-10 px-8">Adicionar</Button>
        </form>
      </div>

      <h2 className="text-2xl font-playfair font-medium mb-6">Horários Cadastrados</h2>

      {timeSlots.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-2xl border border-neutral-100 border-dashed">
          <p className="text-neutral-500">Nenhum horário cadastrado ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {timeSlots.map((ts: any) => {
            const date = new Date(ts.date);
            const isBooked = ts.isBooked;
            const isBlocked = ts.isBlocked;

            return (
              <div key={ts.id} className="p-4 bg-white rounded-xl border border-neutral-100 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full ${isBooked ? 'bg-amber-100 text-amber-700' :
                      isBlocked ? 'bg-red-100 text-red-700' :
                        'bg-green-100 text-green-700'
                    }`}>
                    {isBooked ? 'Ocupado' : isBlocked ? 'Bloqueado' : 'Livre'}
                  </span>
                </div>

                <h3 className="text-lg font-medium mb-1 truncate">
                  {format(date, "dd MMM yyyy", { locale: ptBR })}
                </h3>
                <p className="text-neutral-500 text-sm mb-4">
                  {format(date, "HH:mm")}
                </p>

                <div className="mt-auto">
                  {isBooked ? (
                    <Button disabled variant="outline" className="w-full text-xs h-8 opacity-50 cursor-not-allowed">
                      Indisponível (Agendado)
                    </Button>
                  ) : isBlocked ? (
                    <form action={unblockTimeSlotAction.bind(null, ts.id)}>
                      <Button type="submit" variant="outline" className="w-full text-xs h-8 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800">
                        Desbloquear
                      </Button>
                    </form>
                  ) : (
                    <form action={blockTimeSlotAction.bind(null, ts.id)}>
                      <Button type="submit" variant="outline" className="w-full text-xs h-8 border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800">
                        Bloquear
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
