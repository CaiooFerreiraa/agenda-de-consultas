"use client";

import { useTransition } from "react";
import { blockTimeSlotAction, unblockTimeSlotAction } from "@/actions/doctor/time-slots";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, Calendar, Lock, Unlock, CheckCircle2, AlertCircle } from "lucide-react";

export function TimeSlotList({ timeSlots }: { timeSlots: any[] }) {
  const [isPending, startTransition] = useTransition();

  const handleToggleBlock = (id: string, isBlocked: boolean) => {
    startTransition(async () => {
      if (isBlocked) {
        await unblockTimeSlotAction(id);
      } else {
        await blockTimeSlotAction(id);
      }
    });
  };

  if (timeSlots.length === 0) {
    return (
      <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-neutral-200">
        <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mx-auto mb-4 border border-neutral-100">
          <Calendar className="w-7 h-7 text-neutral-300" />
        </div>
        <p className="text-neutral-700 font-playfair font-bold text-lg">
          Sua agenda está vazia
        </p>
        <p className="text-sm text-neutral-400 mt-1 max-w-xs mx-auto">
          Utilize o formulário de geração em lote para criar seus horários de atendimento.
        </p>
      </div>
    );
  }

  // Group by date
  const grouped = timeSlots.reduce((acc: any, slot: any) => {
    const d = new Date(slot.date);
    const dateKey = format(d, "yyyy-MM-dd");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(slot);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([dateKey, slots]: [string, any]) => {
          const dateObj = new Date(dateKey + "T12:00:00");

          return (
            <div key={dateKey} className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden divide-y divide-neutral-50">
              <div className="px-6 py-4 bg-neutral-50/50 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center border border-neutral-100">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 capitalize leading-none mb-0.5">
                      {format(dateObj, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                    </h3>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">
                      {slots.length} Slots Criados
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {slots
                    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map((slot: any) => {
                      const slotDate = new Date(slot.date);
                      const isPassed = slotDate.getTime() < Date.now();
                      const isBlocked = slot.isBlocked;
                      const isBooked = slot.isBooked;

                      let statusStyles = "bg-white border-neutral-100 text-neutral-700 hover:border-primary/40 hover:bg-primary/5 hover:text-primary";
                      let Icon = Clock;

                      if (isBooked) {
                        statusStyles = "bg-emerald-50 border-emerald-100 text-emerald-700 cursor-not-allowed";
                        Icon = CheckCircle2;
                      } else if (isBlocked) {
                        statusStyles = "bg-red-50 border-red-100 text-red-600 hover:bg-white hover:border-emerald-200 hover:text-emerald-600";
                        Icon = Lock;
                      } else if (isPassed) {
                        statusStyles = "bg-neutral-50 border-neutral-100 text-neutral-300 cursor-not-allowed opacity-60";
                        Icon = Clock;
                      }

                      return (
                        <button
                          key={slot.id}
                          disabled={isPending || isBooked || isPassed}
                          onClick={() => handleToggleBlock(slot.id, isBlocked)}
                          className={`group flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 ${statusStyles}`}
                          title={isBooked ? "Agendado por paciente" : isBlocked ? "Liberar Horário" : "Bloquear Horário"}
                        >
                          <Icon className={`w-3.5 h-3.5 mb-1 opacity-60 transition-transform ${!isBooked && !isPassed ? "group-hover:scale-110" : ""}`} />
                          <span className="text-sm font-bold leading-none">{format(slotDate, "HH:mm")}</span>
                          {isBlocked && !isBooked && (
                            <span className="text-[8px] font-bold uppercase mt-1 tracking-tighter group-hover:hidden">Blocked</span>
                          )}
                          {!isBlocked && !isBooked && !isPassed && (
                            <span className="text-[8px] font-bold uppercase mt-1 tracking-tighter text-emerald-500 opacity-0 group-hover:opacity-100">Free</span>
                          )}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
