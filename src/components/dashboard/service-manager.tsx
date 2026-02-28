"use client";

import { useActionState, useState } from "react";
import { createServiceAction, deleteServiceAction } from "@/actions/doctor/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Trash2, Clock, Sparkles, Briefcase, Info, Timer } from "lucide-react";

export function ServiceManager({ initialServices = [] }: { initialServices: any[] }) {
  const [state, formAction, isPending] = useActionState(createServiceAction, undefined);
  const [durationUnit, setDurationUnit] = useState<"min" | "h">("min");
  const [durationValue, setDurationValue] = useState("");
  const [services, setServices] = useState(initialServices);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover este serviço?")) return;
    setServices(services.filter((s: any) => s.id !== id));
    await deleteServiceAction(id);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDurationValue(e.target.value);
  };

  const finalDuration = durationUnit === "h"
    ? (parseFloat(durationValue) * 60).toString()
    : durationValue;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Premium Form Card - Expansive Layout */}
      <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-[0_4px_35px_rgb(0,0,0,0.03)] overflow-hidden transition-all hover:shadow-[0_20px_80px_rgb(0,0,0,0.05)]">
        <div className="px-10 py-10 border-b border-neutral-50 bg-gradient-to-br from-neutral-50/50 via-white to-white flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-[1.5rem] bg-primary/5 flex items-center justify-center shadow-inner group-hover:bg-primary transition-all duration-500">
              <Sparkles className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Novo Atendimento</h2>
              <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.25em] mt-1.5 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                Configurar Portfólio Profissional
              </p>
            </div>
          </div>
        </div>

        <form action={formAction} className="p-10 lg:p-14 space-y-12">
          <input type="hidden" name="duration" value={finalDuration} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Service Name */}
            <div className="lg:col-span-6 space-y-3">
              <Label htmlFor="name" className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1.5">Nome do Atendimento</Label>
              <div className="relative group">
                <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300 group-focus-within:text-primary transition-all" />
                <Input
                  id="name"
                  name="name"
                  placeholder="Ex: Consulta Prime, Telemedicina VIP..."
                  required
                  className="pl-14 h-16 rounded-[1.25rem] border-neutral-100 bg-neutral-50/30 focus:bg-white focus:ring-[10px] focus:ring-primary/5 transition-all font-bold text-neutral-800 text-lg"
                />
              </div>
            </div>

            {/* Price */}
            <div className="lg:col-span-3 space-y-3">
              <Label htmlFor="price" className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1.5">Investimento (R$)</Label>
              <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-base font-black text-neutral-400 group-focus-within:text-primary transition-all">R$</span>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  required
                  className="pl-16 h-16 rounded-[1.25rem] border-neutral-100 bg-neutral-50/30 focus:bg-white focus:ring-[10px] focus:ring-primary/5 transition-all font-black text-neutral-900 text-xl"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="lg:col-span-3 space-y-3">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1.5">Tempo Estimado</Label>
              <div className="flex gap-3 h-16">
                <div className="relative flex-1 group">
                  <Timer className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300 group-focus-within:text-primary transition-all" />
                  <Input
                    type="number"
                    value={durationValue}
                    onChange={handleDurationChange}
                    placeholder={durationUnit === "min" ? "45" : "1"}
                    className="pl-14 h-full rounded-[1.25rem] border-neutral-100 bg-neutral-50/30 focus:bg-white focus:ring-[10px] focus:ring-primary/5 transition-all font-black text-neutral-800 text-lg"
                  />
                </div>
                <div className="flex bg-neutral-100/50 p-2 rounded-[1.25rem] border border-neutral-100 min-w-[120px]">
                  <button
                    type="button"
                    onClick={() => setDurationUnit("min")}
                    className={`flex-1 flex items-center justify-center rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${durationUnit === "min" ? "bg-white text-primary shadow-sm" : "text-neutral-400 hover:text-neutral-600"}`}
                  >
                    Min
                  </button>
                  <button
                    type="button"
                    onClick={() => setDurationUnit("h")}
                    className={`flex-1 flex items-center justify-center rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${durationUnit === "h" ? "bg-white text-primary shadow-sm" : "text-neutral-400 hover:text-neutral-600"}`}
                  >
                    Hrs
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label htmlFor="description" className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1.5">Protocolo e Detalhes do Atendimento</Label>
            <div className="relative group">
              <Info className="absolute left-6 top-7 w-5 h-5 text-neutral-300 group-focus-within:text-primary transition-all" />
              <Textarea
                id="description"
                name="description"
                placeholder="Descreva o que torna este atendimento único..."
                className="pl-14 min-h-[180px] rounded-[2rem] border-neutral-100 bg-neutral-50/30 focus:bg-white focus:ring-[10px] focus:ring-primary/5 transition-all font-medium py-7 text-neutral-700 text-base leading-relaxed resize-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-10 pt-4">
            <div className="flex items-center gap-6">
              <Button type="submit" disabled={isPending} className="h-16 px-12 rounded-[1.25rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-[0_15px_40px_rgba(var(--primary),0.2)] hover:shadow-[0_20px_50px_rgba(var(--primary),0.3)] active:scale-95 transition-all">
                {isPending ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : <Plus className="w-5 h-5 mr-3 stroke-[3]" />}
                {isPending ? "Processando..." : "Confirmar Novo Serviço"}
              </Button>
              {state?.success && (
                <div className="flex items-center gap-3 text-emerald-600 animate-in slide-in-from-left-4 duration-500">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                  <p className="text-xs font-black uppercase tracking-widest">{state.message}</p>
                </div>
              )}
            </div>

            {state?.error && (
              <div className="flex items-center gap-3 px-6 py-3 bg-red-50 rounded-2xl border border-red-100/50">
                <p className="text-xs font-bold text-red-600 uppercase tracking-widest leading-none">⚠️ {state.error}</p>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Services Grid - Maximizing Horizontal Flow */}
      <div className="space-y-12">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.3)]" />
            <h3 className="text-xl font-black uppercase tracking-[0.3em] text-neutral-400">Serviços Ativos</h3>
          </div>
          <span className="text-xs font-black text-neutral-400 uppercase tracking-widest bg-neutral-50 px-5 py-2.5 rounded-xl border border-neutral-100">
            {services.length} Intens no Catálogo
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-8">
          {services.length === 0 ? (
            <div className="col-span-full py-32 bg-white rounded-[2.5rem] border border-neutral-50 shadow-sm flex flex-col items-center justify-center text-center px-10">
              <div className="w-20 h-20 rounded-[2rem] bg-neutral-50 flex items-center justify-center mb-6 border border-neutral-100 shadow-inner">
                <Briefcase className="w-9 h-9 text-neutral-200" />
              </div>
              <h4 className="text-xl font-black text-neutral-900 mb-2">Sua lista está vazia</h4>
              <p className="text-xs text-neutral-400 max-w-[280px] font-medium leading-relaxed">
                Cadastre seus atendimentos para começar a receber seus pacientes.
              </p>
            </div>
          ) : (
            services.map((service: any) => (
              <div key={service.id} className="group relative bg-white rounded-[2rem] p-8 border border-neutral-50 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_25px_60px_rgb(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 flex flex-col min-h-[340px]">
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:text-white hover:bg-red-500 flex items-center justify-center transition-all shadow-sm active:scale-90"
                    title="Remover serviço"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>

                <div className="flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-500 shadow-inner">
                    <Briefcase className="w-7 h-7 text-primary group-hover:text-white transition-all duration-500" />
                  </div>
                  <h3 className="text-xl font-black text-neutral-900 mb-3 group-hover:text-primary transition-colors leading-tight">{service.name}</h3>
                  {service.description && (
                    <p className="text-[11px] text-neutral-500 font-medium leading-relaxed line-clamp-4">{service.description}</p>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-50 flex items-end justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-neutral-300">Investimento</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-black text-primary">R$</span>
                      <span className="text-3xl font-black text-neutral-900 leading-none tracking-tighter">
                        {parseFloat(service.price).toFixed(2).split('.')[0]}
                        <span className="text-sm">,{parseFloat(service.price).toFixed(2).split('.')[1]}</span>
                      </span>
                    </div>
                  </div>
                  {service.duration && (
                    <div className="flex flex-col items-end gap-1.5 px-4 py-2.5 rounded-2xl bg-neutral-50/80 border border-neutral-100 group-hover:bg-primary/5 group-hover:border-primary/10 transition-all">
                      <span className="text-[8px] font-black uppercase tracking-widest text-neutral-400">Estimado</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-black text-neutral-800 tracking-tight">
                          {service.duration >= 60
                            ? `${(service.duration / 60).toFixed(1).replace('.0', '')}h`
                            : `${service.duration}min`}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
