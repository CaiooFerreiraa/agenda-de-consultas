import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { listDoctorTimeSlots } from "@/actions/doctor/time-slots";
import { BulkCreateForm } from "@/components/dashboard/bulk-create-form";
import { TimeSlotList } from "@/components/dashboard/time-slot-list";
import { Clock, Plus, CalendarCheck } from "lucide-react";

export default async function HorariosPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "DOCTOR") {
    redirect("/dashboard");
  }

  let dbSlots = await listDoctorTimeSlots();
  dbSlots = dbSlots.filter((s: any) => new Date(s.date).getUTCHours() !== 0);

  const available = dbSlots.filter((s: any) => !s.isBlocked && !s.isBooked).length;
  const booked = dbSlots.filter((s: any) => s.isBooked).length;
  const blocked = dbSlots.filter((s: any) => s.isBlocked).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 selection:bg-primary/10">
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-900 mb-1 tracking-tight">Gestão de Horários</h1>
        <p className="text-neutral-500 text-sm font-medium">Crie slots de atendimento e gerencie sua disponibilidade.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Disponíveis", value: available, color: "bg-emerald-50 text-emerald-600", icon: CalendarCheck },
          { label: "Agendados", value: booked, color: "bg-blue-50 text-primary", icon: Clock },
          { label: "Bloqueados", value: blocked, color: "bg-red-50 text-red-500", icon: Clock },
        ].map(({ label, value, color, icon: Icon }) => (
          <div key={label} className="bg-white rounded-3xl border border-neutral-100 p-6 text-center hover:border-primary/20 hover:shadow-xl hover:shadow-black/[0.02] transition-all group">
            <div className={`w-10 h-10 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-colors ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-neutral-900 leading-none tracking-tight">{value}</p>
            <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mt-2.5 group-hover:text-primary transition-colors">{label}</p>
          </div>
        ))}
      </div>

      {/* Create Form */}
      <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-neutral-100 flex items-center gap-4 bg-neutral-50/30">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Plus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Criar Horários em Lote</h2>
            <p className="text-xs text-neutral-400 font-medium">Gere múltiplos slots de atendimento de uma vez</p>
          </div>
        </div>
        <div className="p-8">
          <BulkCreateForm />
        </div>
      </div>

      {/* Time Slots List */}
      <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-neutral-100 flex items-center gap-4 bg-neutral-50/30">
          <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center">
            <Clock className="w-5 h-5 text-neutral-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Meus Horários</h2>
            <p className="text-xs text-neutral-400 font-medium">{dbSlots.length} horário(s) configurado(s)</p>
          </div>
        </div>
        <div className="p-8">
          <TimeSlotList timeSlots={dbSlots} />
        </div>
      </div>
    </div>
  );
}
