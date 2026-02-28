"use client";

import { useActionState } from "react";
import { bulkCreateTimeSlotsAction } from "@/actions/doctor/time-slots";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Calendar, Clock, ChevronRight, AlertCircle, Plus } from "lucide-react";

export function BulkCreateForm() {
  const [state, formAction, isPending] = useActionState(bulkCreateTimeSlotsAction, undefined);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-primary" /> Data
          </Label>
          <Input
            id="date"
            name="date"
            type="date"
            required
            className="h-11 rounded-xl border-neutral-200 bg-neutral-50 focus:bg-white transition-all shadow-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startHour" className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-primary" /> Início
          </Label>
          <Input
            id="startHour"
            name="startHour"
            type="time"
            required
            className="h-11 rounded-xl border-neutral-200 bg-neutral-50 focus:bg-white transition-all shadow-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endHour" className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-red-400" /> Fim
          </Label>
          <Input
            id="endHour"
            name="endHour"
            type="time"
            required
            className="h-11 rounded-xl border-neutral-200 bg-neutral-50 focus:bg-white transition-all shadow-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interval" className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <Plus className="w-3.5 h-3.5 text-primary" /> Intervalo
          </Label>
          <div className="relative">
            <select
              id="interval"
              name="interval"
              required
              defaultValue="30"
              className="flex h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer appearance-none"
            >
              <option value="15">15 minutos</option>
              <option value="20">20 minutos</option>
              <option value="30">30 minutos</option>
              <option value="40">40 minutos</option>
              <option value="60">1 hora</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronRight className="w-4 h-4 text-neutral-400 rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {state?.message && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-sm text-red-600 font-medium">
          <AlertCircle className="w-4 h-4" />
          {state.message}
        </div>
      )}

      {state?.success && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 text-sm text-emerald-600 font-medium">
          <Plus className="w-4 h-4" />
          Horários gerados com sucesso!
        </div>
      )}

      <Button type="submit" className="w-full sm:w-auto h-11 px-8 rounded-xl font-bold shadow-lg shadow-primary/10" disabled={isPending}>
        {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
        Gerar Agenda para este Dia
      </Button>
    </form>
  );
}
