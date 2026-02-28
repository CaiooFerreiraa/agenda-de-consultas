"use client";

import { useState, useTransition } from "react";
import { updateBlockedDaysAction } from "@/actions/doctor/time-slots";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";

interface BlockedDaysFormProps {
  initialDates: Date[];
}

export function BlockedDaysForm({ initialDates }: BlockedDaysFormProps) {
  const [dates, setDates] = useState<Date[] | undefined>(initialDates);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = () => {
    startTransition(async () => {
      setMessage(null);
      const isoStrings = (dates || []).map(d => d.toISOString());
      const res = await updateBlockedDaysAction(isoStrings);

      if (res?.message) {
        setMessage(res.message);
      } else {
        setMessage("Horários atualizados com sucesso!");
        setTimeout(() => setMessage(null), 3000);
      }
    });
  };

  const today = new Date();

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm inline-block">
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={setDates}
          locale={ptBR}
          disabled={(date) => date < new Date(today.setHours(0, 0, 0, 0))}
          className="rounded-md"
        />
      </div>

      <div className="flex-1 space-y-6">
        <div>
          <h3 className="text-lg font-playfair font-medium mb-2">Instruções</h3>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Selecione no calendário os dias em que você <strong>NÃO</strong> estará disponível para atendimento.
            Você pode escolher múltiplos dias e navegar pelos próximos meses.
          </p>
          <p className="text-sm text-neutral-500 leading-relaxed mt-2">
            Os horários padrão de atendimento (09:00 - 17:00, seg a sex) serão automaticamente bloqueados para os dias selecionados.
          </p>
        </div>

        <div className="pt-4 border-t border-neutral-100">
          <p className="text-sm font-medium mb-4">
            {dates?.length || 0} dias selecionados como ausentes.
          </p>

          <Button
            onClick={handleSave}
            disabled={isPending}
            className="w-full sm:w-auto h-11 px-8"
          >
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Salvar Alterações
          </Button>

          {message && (
            <p className={`mt-3 text-sm ${message.includes('sucesso') ? 'text-green-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
