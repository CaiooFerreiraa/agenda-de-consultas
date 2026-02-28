import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { listPatientAppointments } from "@/actions/patient/appointments";
import { listDoctorAppointments, completeAppointmentAction, cancelDoctorAppointmentAction } from "@/actions/doctor/appointments";
import { cancelAppointmentAction } from "@/actions/patient/appointments";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function ConsultasPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const isDoctor = session.user.role === 'DOCTOR';

  const appointments = isDoctor
    ? await listDoctorAppointments()
    : await listPatientAppointments();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-4xl font-playfair font-medium tracking-tight mb-2">
          {isDoctor ? 'Agenda de Consultas' : 'Minhas Consultas'}
        </h1>
        <p className="text-neutral-500">
          Histórico e próximos agendamentos.
        </p>
      </header>

      {appointments.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-2xl border border-neutral-100 border-dashed">
          <p className="text-neutral-500">Nenhuma consulta encontrada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((appt: any) => (
            <div key={appt.id} className="p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm flex flex-col gap-4">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${appt.status === 'SCHEDULED' ? 'bg-blue-50 text-blue-600' :
                      appt.status === 'COMPLETED' ? 'bg-green-50 text-green-600' :
                        'bg-red-50 text-red-600'
                    }`}>
                    {appt.status === 'SCHEDULED' ? 'Agendada' : appt.status === 'COMPLETED' ? 'Concluída' : 'Cancelada'}
                  </span>
                  <span className="text-sm text-neutral-500 font-medium">
                    {format(new Date(appt.timeSlot.date), "dd 'de' MMMM, HH:mm", { locale: ptBR })}
                  </span>
                </div>
                <h3 className="text-lg font-playfair font-medium truncate mt-2">
                  {isDoctor ? `Paciente: ${appt.patient.name}` : `Doutor(a): ${appt.doctor.name}`}
                </h3>
                {appt.notes && (
                  <p className="text-sm text-neutral-500 mt-2 line-clamp-2 italic">
                    "{appt.notes}"
                  </p>
                )}
              </div>

              {appt.status === 'SCHEDULED' && (
                <div className="flex gap-2 mt-auto pt-4 border-t border-neutral-50">
                  {isDoctor ? (
                    <>
                      <form action={completeAppointmentAction.bind(null, appt.id)} className="flex-1">
                        <Button type="submit" variant="default" className="w-full h-9 text-xs bg-neutral-900 border-neutral-900">
                          Concluir
                        </Button>
                      </form>
                      <form action={cancelDoctorAppointmentAction.bind(null, appt.id)} className="flex-1">
                        <Button type="submit" variant="outline" className="w-full h-9 text-xs text-red-600 border-red-100 bg-red-50/50 hover:bg-red-100">
                          Cancelar
                        </Button>
                      </form>
                    </>
                  ) : (
                    <form action={cancelAppointmentAction.bind(null, appt.id)} className="w-full">
                      <Button type="submit" variant="outline" className="w-full h-9 text-xs text-red-600 border-red-100 bg-red-50/50 hover:bg-red-100">
                        Cancelar Consulta
                      </Button>
                    </form>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
