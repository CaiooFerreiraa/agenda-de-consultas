"use client";

import { useActionState, useState } from "react";
import { createAppointmentAction } from "@/actions/patient/appointments";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2, Calendar, Clock, CheckCircle2, AlertCircle, Stethoscope, MessageSquare, Heart } from "lucide-react";
import Link from "next/link";

interface PublicAppointmentFormProps {
  doctorId: string;
  timeSlots: any[];
  doctorServices: any[];
}

export function PublicAppointmentForm({ doctorId, timeSlots, doctorServices }: PublicAppointmentFormProps) {
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [state, formAction, isPending] = useActionState(createAppointmentAction, undefined);

  if (state?.success) {
    return (
      <div className="text-center p-10 bg-emerald-50/50 border border-emerald-100 rounded-[2.5rem] animate-in zoom-in duration-300">
        <div className="w-20 h-20 rounded-3xl bg-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200/50">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-black text-emerald-900 mb-3 tracking-tight">Agendamento Realizado!</h3>
        <p className="text-sm text-emerald-600/80 mb-8 font-medium leading-relaxed">Sua solicitação foi processada com sucesso. Você pode acompanhar todos os detalhes no seu painel.</p>
        <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-200">
          <Link href="/dashboard/consultas">Ver Minhas Consultas</Link>
        </Button>
      </div>
    );
  }

  const selectedService = doctorServices.find(s => s.id === selectedServiceId);

  return (
    <div className="space-y-8">
      {/* Negotiation Chat Button */}
      <Button asChild variant="outline" className="w-full h-14 rounded-2xl border-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all group font-black uppercase tracking-widest text-[10px] gap-3">
        <Link href={`/dashboard/chat/${doctorId}`}>
          <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Dúvidas? Fale com o Especialista
        </Link>
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-neutral-100"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase font-black tracking-[0.3em] text-neutral-300">
          <span className="bg-white px-4">Ou Agende Agora</span>
        </div>
      </div>

      <form action={formAction} className="space-y-8">
        <input type="hidden" name="doctorId" value={doctorId} />
        <input type="hidden" name="timeSlotId" value={selectedSlotId} />
        <input type="hidden" name="serviceId" value={selectedServiceId} />

        {/* 1. SELECTION OF SERVICES */}
        <div className="space-y-4">
          <label className="text-sm font-black text-neutral-800 flex items-center gap-2.5 uppercase tracking-wider">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-primary" />
            </div>
            1. Selecione o Serviço
          </label>

          <div className="grid grid-cols-1 gap-3">
            {doctorServices.length === 0 ? (
              <p className="text-xs text-neutral-400 italic bg-neutral-50 p-4 rounded-2xl border border-dashed text-center">
                O médico ainda não cadastrou serviços específicos.
              </p>
            ) : (
              doctorServices.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`flex flex-col p-5 rounded-2xl border-2 text-left transition-all group relative overflow-hidden ${selectedServiceId === service.id
                      ? "border-primary bg-primary/5 ring-4 ring-primary/5"
                      : "border-neutral-100 bg-white hover:border-primary/30"
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-base font-black tracking-tight ${selectedServiceId === service.id ? "text-primary" : "text-neutral-900"}`}>
                      {service.name}
                    </span>
                    <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      R$ {Number(service.price).toFixed(2)}
                    </span>
                  </div>
                  {service.description && (
                    <p className="text-xs text-neutral-500 font-medium leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  )}
                  {selectedServiceId === service.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* 2. SELECTION OF TIME SLOTS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-black text-neutral-800 flex items-center gap-2.5 uppercase tracking-wider">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-amber-600" />
              </div>
              2. Escolha o Horário
            </label>
            <span className="text-[10px] text-neutral-400 font-black tracking-widest uppercase">{timeSlots.length} disponíveis</span>
          </div>

          {timeSlots.length === 0 ? (
            <div className="text-center p-8 bg-neutral-50 border-2 border-dashed border-neutral-100 rounded-[2rem] flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                <Calendar className="w-6 h-6 text-neutral-200" />
              </div>
              <p className="text-sm text-neutral-500 font-bold">Nenhum horário disponível</p>
              <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-widest">Tente buscar mais tarde</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2.5 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-200">
              {timeSlots.map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all group ${isSelected
                        ? "bg-primary border-primary shadow-xl shadow-primary/10 text-white"
                        : "bg-white border-neutral-100 hover:border-primary/20 hover:bg-neutral-50 text-neutral-700"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isSelected ? "bg-white/20" : "bg-primary/10"}`}>
                        <Clock className={`w-4 h-4 ${isSelected ? "text-white" : "text-primary"}`} />
                      </div>
                      <div>
                        <p className="text-sm font-black tracking-tight leading-none uppercase">
                          {format(new Date(slot.date), "dd 'de' MMM", { locale: ptBR })}
                        </p>
                        <p className={`text-[10px] mt-1 font-bold ${isSelected ? "text-white/80" : "text-neutral-400"}`}>
                          {format(new Date(slot.date), "HH:mm")} • Horário Local
                        </p>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. SYMPTOMS / NOTES */}
        <div className="space-y-4">
          <label htmlFor="notes" className="text-sm font-black text-neutral-800 flex items-center gap-2.5 uppercase tracking-wider">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Heart className="w-4 h-4 text-emerald-600" />
            </div>
            3. Descrição & Sintomas
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Descreva brevemente o que está sentindo ou o motivo da consulta para ajudar na preparação do especialista..."
            className="w-full rounded-2xl border-2 border-neutral-100 bg-neutral-50 px-5 py-4 text-sm font-medium placeholder:text-neutral-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all resize-none shadow-inner"
          />
        </div>

        {state?.message && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-xs text-red-600 font-bold animate-in slide-in-from-top-1">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {state.message}
          </div>
        )}

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-16 text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all"
            disabled={isPending || !selectedSlotId || !selectedServiceId}
          >
            {isPending ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : null}
            Finalizar Agendamento
          </Button>

          <p className="text-[10px] text-center text-neutral-400 font-medium px-6 mt-6 leading-relaxed">
            Ao finalizar, o horário e o serviço serão bloqueados para você. Cancelamentos gratuitos permitidos em até 24h.
          </p>
        </div>
      </form>
    </div>
  );
}
