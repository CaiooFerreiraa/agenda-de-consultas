"use client";

import { useActionState, useState, useEffect } from "react";
import { createAppointmentAction } from "@/actions/patient/appointments";
import { listAvailableDoctors, listDoctorAvailableTimeSlots } from "@/actions/patient/options";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { UserEntity } from "@/domain/entities/user";
import { TimeSlotEntity } from "@/domain/entities/time-slot";
import { useRouter } from "next/navigation";

export function AppointmentForm() {
  const router = useRouter();

  const handleAction = async (prevState: any, formData: FormData) => {
    const res = await createAppointmentAction(prevState, formData);
    if (res?.success) {
      router.push("/dashboard/consultas");
      return;
    }
    return res;
  };

  const [state, formAction, isPending] = useActionState(handleAction, undefined);
  const [doctors, setDoctors] = useState<UserEntity[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<TimeSlotEntity[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    listAvailableDoctors().then((data) => {
      setDoctors(data);
      setLoadingDoctors(false);
    });
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      setLoadingSlots(true);
      listDoctorAvailableTimeSlots(selectedDoctor).then((data) => {
        setTimeSlots(data);
        setLoadingSlots(false);
      });
    } else {
      setTimeSlots([]);
    }
  }, [selectedDoctor]);

  return (
    <Card className="shadow-sm border-neutral-100 bg-white">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl font-playfair tracking-tight">Agendar Nova Consulta</CardTitle>
        <CardDescription className="text-neutral-500">
          Selecione um profissional e o horário de sua preferência.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="doctorId">Especialista</Label>
            <select
              id="doctorId"
              name="doctorId"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              required
              disabled={loadingDoctors}
              className="flex h-10 w-full rounded-md border border-neutral-200/60 bg-neutral-50/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>Selecione um especialista</option>
              {doctors.map(doc => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} - {doc.specialty || 'Clínico Geral'}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeSlotId">Horário Disponível</Label>
            <select
              id="timeSlotId"
              name="timeSlotId"
              required
              disabled={!selectedDoctor || loadingSlots || timeSlots.length === 0}
              className="flex h-10 w-full rounded-md border border-neutral-200/60 bg-neutral-50/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>
                {loadingSlots ? "Carregando horários..." :
                  !selectedDoctor ? "Selecione o médico primeiro" :
                    timeSlots.length === 0 ? "Nenhum horário disponível" :
                      "Selecione um horário"}
              </option>
              {timeSlots.map(slot => (
                <option key={slot.id} value={slot.id}>
                  {format(new Date(slot.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </option>
              ))}
            </select>
            {selectedDoctor && !loadingSlots && timeSlots.length === 0 && (
              <p className="text-xs text-red-500 mt-1">Este profissional não possui horários disponíveis no momento.</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas ou Sintomas (Opcional)</Label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Descreva brevemente o motivo da consulta..."
              className="flex w-full rounded-md border border-neutral-200/60 bg-neutral-50/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {state?.message && (
            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-100">
              {state.message}
            </div>
          )}

          <Button type="submit" className="w-full h-11" disabled={isPending || !selectedDoctor || timeSlots.length === 0}>
            {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Confirmar Agendamento
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
