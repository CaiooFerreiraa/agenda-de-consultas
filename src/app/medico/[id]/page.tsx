import { getPublicDoctorByIdAction } from "@/actions/public/doctors";
import { notFound } from "next/navigation";
import { Stethoscope, MapPin, Star, Calendar as CalendarIcon, ArrowLeft, Heart, ShieldCheck, Clock, Award, Medal, CheckCircle2, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PublicAppointmentForm } from "@/components/public/public-appointment-form";
import { DoctorProfileTabs } from "@/components/public/doctor-profile-tabs";
import { listDoctorAvailableTimeSlots } from "@/actions/patient/options";
import { auth } from "@/auth";
import { prisma } from "@/infrastructure/database/prisma";

export default async function DoctorProfilePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const doctor = await getPublicDoctorByIdAction(params.id);
  const session = await auth();

  if (!doctor) {
    notFound();
  }

  const [timeSlots, doctorServices] = await Promise.all([
    listDoctorAvailableTimeSlots(doctor.id),
    prisma.service.findMany({
      where: { doctorId: doctor.id },
      orderBy: { price: "asc" }
    })
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FE] selection:bg-primary/20">
      {/* Dynamic Header */}
      <header className="py-4 px-4 sm:px-8 bg-white border-b border-neutral-100 sticky top-0 z-50 shadow-sm shadow-black/2 bg-white/80 backdrop-blur-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          <Link href="/busca" className="flex items-center gap-2 group transition-all">
            <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
              <ArrowLeft className="w-4 h-4 text-neutral-600 group-hover:text-white" />
            </div>
            <span className="text-sm font-semibold text-neutral-600 group-hover:text-neutral-900 hidden sm:block">
              Voltar para Busca
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-neutral-900">MedSchedule</span>
          </div>

          <div className="flex items-center gap-3">
            {session ? (
              <Button asChild size="sm" className="rounded-xl h-9 text-xs font-bold shadow-md shadow-primary/20">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="sm" variant="outline" className="rounded-xl border-neutral-200 hidden sm:flex h-9 text-xs font-medium">
                  <Link href="/register">Cadastre-se</Link>
                </Button>
                <Button asChild size="sm" className="rounded-xl h-9 text-xs font-bold shadow-md shadow-primary/20">
                  <Link href="/login">Entrar</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">

          {/* Main Info Columns */}
          <div className="lg:col-span-8 space-y-6 md:space-y-10">

            {/* Header Content Section */}
            <div className="bg-white rounded-[2.5rem] border border-neutral-100 p-8 md:p-12 shadow-sm shadow-black/2 relative overflow-hidden">
              {/* Decorative Gradient Overlay */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/30 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative z-10 items-center md:items-start text-center md:text-left">
                {/* Big Initials Avatar Circle */}
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2rem] bg-gradient-to-br from-primary/10 to-blue-50 border-4 border-white shadow-xl flex items-center justify-center text-4xl md:text-6xl font-bold text-primary shrink-0 select-none group relative overflow-hidden ring-1 ring-primary/5">
                  {doctor.name?.charAt(0) || "D"}
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg" title="Verificado">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col pt-2 w-full">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight leading-none">
                          Dr(a). {doctor.name}
                        </h1>
                        {doctor.lastSeen && (new Date().getTime() - new Date(doctor.lastSeen).getTime()) < 120000 && (
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Online Agora</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm font-semibold mt-3">
                        <span className="text-primary px-3 py-1 bg-primary/8 rounded-full">
                          Especialista em {doctor.specialty || "Clínico Geral"}
                        </span>
                        <span className="text-neutral-400 font-normal">| CRM {doctor.crm || "48293"}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-1.5 shrink-0 bg-amber-50 rounded-3xl px-5 py-3 border border-amber-100/50 shadow-sm">
                      <div className="flex items-center gap-1.5 font-bold text-2xl text-amber-700 leading-none">
                        <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                        4.9
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 opacity-80">Altamente Recomendado</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-8 pt-6 border-t border-neutral-50">
                    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white border border-neutral-100 hover:border-primary/20 hover:shadow-sm transition-all text-xs font-semibold text-neutral-600">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> Atendimento Presencial
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white border border-neutral-100 hover:border-primary/20 hover:shadow-sm transition-all text-xs font-semibold text-neutral-600">
                      <Clock className="w-3.5 h-3.5 text-primary" /> +5 anos Experiência
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white border border-neutral-100 hover:border-primary/20 hover:shadow-sm transition-all text-xs font-semibold text-neutral-600">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Especialista Verificado
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Functional Tabs Component */}
            <DoctorProfileTabs doctor={doctor} />

          </div>

          {/* Booking Widget Sidebar */}
          <div className="lg:col-span-4 lg:relative">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-primary/10 shadow-xl shadow-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 mb-8 pb-6 border-b border-neutral-100">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2 leading-none">Agendar Consulta</h2>
                  <p className="text-sm text-neutral-400 font-medium tracking-tight">Reserve seu horário em segundos.</p>
                </div>

                <div className="relative z-10">
                  {!session?.user ? (
                    <div className="text-center p-8 bg-neutral-50/50 border border-dashed border-neutral-200 rounded-3xl">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4 border border-neutral-100">
                        <ShieldCheck className="w-6 h-6 text-neutral-300" />
                      </div>
                      <p className="text-sm text-neutral-600 font-medium mb-6">Acesse sua conta para agendar sua consulta hoje.</p>
                      <Button asChild className="w-full h-12 rounded-2xl font-bold shadow-lg shadow-primary/20">
                        <Link href={`/login?callbackUrl=/medico/${doctor.id}`}>
                          Entrar ou Criar Conta
                        </Link>
                      </Button>
                    </div>
                  ) : session.user.role === 'PATIENT' ? (
                    <PublicAppointmentForm
                      doctorId={doctor.id}
                      timeSlots={timeSlots}
                      doctorServices={doctorServices}
                    />
                  ) : (
                    <div className="text-center p-8 bg-red-50/30 border border-dashed border-red-200 rounded-3xl">
                      <p className="text-sm font-semibold text-red-600 mb-1">Acesso Restrito</p>
                      <p className="text-xs text-red-500 font-medium">Apenas contas de paciente podem realizar agendamentos no marketplace.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Secondary Info Card */}
              <div className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm shadow-black/2 flex items-center gap-4 group cursor-help transition-all hover:bg-neutral-50">
                <div className="w-10 h-10 rounded-xl bg-[#F4F7FE] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900 group-hover:text-primary transition-colors">Segurança & Privacidade</p>
                  <p className="text-[10px] text-neutral-400 font-medium leading-tight">Dados protegidos conforme normativa médica vigente.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="py-12 bg-neutral-900 text-neutral-500 text-sm mt-20 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-playfair font-bold text-neutral-300 mb-4 flex items-center justify-center gap-2">
            <Stethoscope className="w-4 h-4 text-primary" /> MedSchedule Marketplace
          </p>
          <p className="text-xs max-w-sm mx-auto mb-8 opacity-60">Plataforma dedicada a aproximar profissionais de saúde e pacientes com transparência e inovação tecnológica.</p>
          <div className="flex justify-center gap-6 text-xs font-semibold uppercase tracking-widest text-neutral-600">
            <Link href="#" className="hover:text-primary transition-colors">Termos</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-primary transition-colors">Suporte</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
