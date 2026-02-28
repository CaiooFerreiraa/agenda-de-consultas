import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { listPatientAppointments } from "@/actions/patient/appointments";
import { listDoctorAppointments, completeAppointmentAction, cancelDoctorAppointmentAction } from "@/actions/doctor/appointments";
import { cancelAppointmentAction } from "@/actions/patient/appointments";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarX, Clock, CheckCircle2, XCircle, Calendar, MessageSquare, Stethoscope, Heart, Activity } from "lucide-react";
import Link from "next/link";
import { ReviewModal } from "@/components/dashboard/review-modal";

const STATUS_MAP = {
  SCHEDULED: { label: "Agendada", classes: "bg-blue-50 text-blue-700 border-blue-100", icon: Clock },
  COMPLETED: { label: "Concluída", classes: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: CheckCircle2 },
  CANCELLED: { label: "Cancelada", classes: "bg-red-50 text-red-700 border-red-100", icon: XCircle },
};

export default async function ConsultasPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const isDoctor = session.user.role === "DOCTOR";
  const appointments = isDoctor ? await listDoctorAppointments() : await listPatientAppointments();

  return (
    <div className="w-full space-y-12 animate-in fade-in duration-700 selection:bg-primary/10">
      {/* Expansive Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b-2 border-neutral-100">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
              Gerenciamento de Agenda
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
              <Activity className="w-3.5 h-3.5" />
              Sincronizado
            </div>
          </div>

          <h1 className="text-6xl font-black text-neutral-900 tracking-[-0.04em] leading-none mb-4">
            {isDoctor ? "Agenda de " : "Minhas "}<span className="text-primary">Consultas</span>
          </h1>
          <p className="text-base text-neutral-400 font-medium max-w-xl leading-relaxed">
            {isDoctor
              ? "Acompanhe todos os seus atendimentos marcados e o histórico de pacientes em um só lugar."
              : "Histórico completo e próximos agendamentos. Gerencie seus cuidados com saúde de forma simplificada."}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-10 px-10 py-6 bg-white rounded-[2rem] border-2 border-neutral-50 shadow-xl shadow-black/[0.02]">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-1">Total Geral</span>
              <span className="text-4xl font-black text-neutral-900 leading-none tracking-tighter">{appointments.length}</span>
            </div>
            <div className="w-px h-10 bg-neutral-100" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mb-1">Próximas</span>
              <span className="text-4xl font-black text-primary leading-none tracking-tighter">
                {appointments.filter((a: any) => a.status === "SCHEDULED").length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {appointments.length === 0 ? (
        <div className="text-center bg-white rounded-[3rem] border-2 border-dashed border-neutral-100 p-20 lg:p-32 flex flex-col items-center gap-6 shadow-sm">
          <div className="w-20 h-20 rounded-[2.5rem] bg-neutral-50 flex items-center justify-center border-2 border-neutral-100 shadow-inner">
            <CalendarX className="w-10 h-10 text-neutral-200" />
          </div>
          <div className="max-w-md">
            <h3 className="text-2xl font-black text-neutral-800 tracking-tight">Nenhuma consulta por enquanto</h3>
            <p className="text-neutral-400 mt-2 font-medium leading-relaxed">
              {isDoctor
                ? "Sua agenda será preenchida automaticamente à medida que os pacientes realizarem agendamentos."
                : "Seu histórico está vazio. Comece a cuidar da sua saúde agendando um horário com nossos especialistas."}
            </p>
          </div>
          {!isDoctor && (
            <Button asChild className="rounded-2xl mt-4 h-16 px-12 font-black shadow-2xl shadow-primary/20 text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95">
              <Link href="/">Encontrar Especialistas</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
          {appointments.map((appt: any) => {
            const status = STATUS_MAP[appt.status as keyof typeof STATUS_MAP] ?? STATUS_MAP.SCHEDULED;
            const StatusIcon = status.icon;
            return (
              <div
                key={appt.id}
                className="bg-white rounded-[2.5rem] border-2 border-neutral-50 shadow-xl shadow-black/[0.02] hover:shadow-black/[0.04] hover:border-primary/10 transition-all flex flex-col group relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 left-0 w-2 h-full ${appt.status === 'SCHEDULED' ? 'bg-primary' : appt.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-red-500'}`} />

                {/* Card Header */}
                <div className="p-8 border-b-2 border-neutral-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 shadow-sm transition-transform group-hover:scale-110 ${status.classes}`}>
                        <StatusIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-xl font-black text-neutral-900 tracking-tight leading-none mb-1.5 truncate max-w-[180px]">
                          {isDoctor ? appt.patient?.name : `Dr(a). ${appt.doctor?.name}`}
                        </p>
                        <div className="flex items-center gap-2">
                          {isDoctor ? (
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400">Paciente Verificado</span>
                          ) : (
                            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                              {appt.doctor?.specialty || "Clínico Geral"}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className={`text-[9px] px-3 py-1.5 rounded-xl font-black uppercase tracking-widest border-2 shadow-sm ${status.classes}`}>
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8 flex-1 space-y-6">
                  {/* Service Info (If exists) */}
                  {appt.service && (
                    <div className="bg-primary/5 px-6 py-4 rounded-2xl border border-primary/10">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 mb-1">Serviço Solicitado</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-black text-primary tracking-tight">{appt.service.name}</p>
                        <p className="text-sm font-black text-primary">R$ {Number(appt.service.price).toFixed(2)}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm text-neutral-700 bg-neutral-50 rounded-2xl px-5 py-4 w-full border border-neutral-100 shadow-inner">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="font-bold tracking-tight">
                        {format(new Date(appt.timeSlot.date), "dd 'de' MMMM", { locale: ptBR })}
                      </span>
                      <span className="text-neutral-300 mx-1">•</span>
                      <Clock className="w-4 h-4 text-neutral-400" />
                      <span className="font-bold text-neutral-500">
                        {format(new Date(appt.timeSlot.date), "HH:mm")}
                      </span>
                    </div>
                  </div>

                  {appt.notes && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-300 flex items-center gap-2">
                        <Heart className="w-3 h-3" /> Sintomas / Observações
                      </p>
                      <div className="bg-neutral-50/50 rounded-2xl p-4 border border-dashed border-neutral-200">
                        <p className="text-sm text-neutral-500 font-medium italic leading-relaxed">
                          "{appt.notes}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="p-8 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {appt.status === "SCHEDULED" && (
                    <>
                      <Button asChild variant="outline" className="h-14 rounded-2xl border-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all group font-black uppercase tracking-widest text-[9px] gap-2.5">
                        <Link href={`/dashboard/chat/${isDoctor ? appt.patientId : appt.doctorId}`}>
                          <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          Chat de Negociação
                        </Link>
                      </Button>

                      {isDoctor ? (
                        <div className="flex gap-2">
                          <form action={completeAppointmentAction.bind(null, appt.id) as any} className="flex-1">
                            <Button type="submit" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[9px] bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-200/50 gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              Concluir
                            </Button>
                          </form>
                          <form action={cancelDoctorAppointmentAction.bind(null, appt.id) as any}>
                            <Button type="submit" variant="ghost" className="h-14 w-14 rounded-2xl border-2 border-transparent hover:border-red-100 hover:bg-red-50 text-red-500 transition-all flex items-center justify-center p-0">
                              <XCircle className="w-5 h-5" />
                            </Button>
                          </form>
                        </div>
                      ) : (
                        <form action={cancelAppointmentAction.bind(null, appt.id) as any} className="w-full">
                          <Button type="submit" variant="ghost" className="w-full h-14 rounded-2xl border-2 border-transparent hover:border-red-100 hover:bg-red-50 text-red-400 hover:text-red-600 font-black uppercase tracking-widest text-[9px] transition-all gap-2">
                            <XCircle className="w-4 h-4" />
                            Cancelar Consulta
                          </Button>
                        </form>
                      )}
                    </>
                  )}

                  {!isDoctor && appt.status === "COMPLETED" && !appt.review && (
                    <div className="col-span-full">
                      <ReviewModal appointmentId={appt.id} doctorName={appt.doctor?.name || "Dr(a)."} />
                    </div>
                  )}

                  {!isDoctor && appt.status === "COMPLETED" && appt.review && (
                    <div className="col-span-full flex items-center gap-2 bg-emerald-50 px-4 py-3 rounded-2xl border border-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Avaliamos sua experiência, obrigado!</span>
                    </div>
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
