import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { listDoctorServices } from "@/actions/doctor/services";
import { ServiceManager } from "@/components/dashboard/service-manager";
import { Sparkles, Activity, Plus } from "lucide-react";

export default async function ServicosPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'DOCTOR') {
    redirect("/dashboard");
  }

  const initialServices = await listDoctorServices();

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-500 selection:bg-primary/10">
      {/* Refined Header - Efficient width usage */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-neutral-100">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
              Gestão de Carreira
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
              <Activity className="w-3.5 h-3.5" />
              Catálogo Ativo
            </div>
          </div>

          <h1 className="text-5xl font-black text-neutral-900 tracking-[-0.04em] leading-tight mb-2">
            Meus <span className="text-primary">Serviços</span>
          </h1>
          <p className="text-sm text-neutral-500 font-medium max-w-xl leading-relaxed">
            Configure seus atendimentos, valores e tempos estimados.
            Mantenha seu portfólio atualizado para atrair mais pacientes.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-8 px-8 py-4 bg-white rounded-3xl border border-neutral-100 shadow-sm">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-0.5">Total</span>
              <span className="text-2xl font-black text-neutral-900 leading-none tracking-tighter">{initialServices.length}</span>
            </div>
            <div className="w-px h-8 bg-neutral-100" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-0.5">Status</span>
              <span className="text-xs font-black text-emerald-500 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content - Fully leveraging horizontal space */}
      <div className="w-full">
        <ServiceManager initialServices={initialServices} />

        {/* Balanced Institutional Tip */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-neutral-50 rounded-full border border-neutral-100">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-[10px] font-black uppercase tracking-[0.1em] text-neutral-400 leading-none">
              Dica: Utilize o <span className="text-neutral-900">Chat de Negociação</span> para casos complexos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
