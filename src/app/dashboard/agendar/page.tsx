import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppointmentForm } from "@/components/dashboard/appointment-form";

export default async function AgendarPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'PATIENT') {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-2xl mx-auto">
      <header className="mb-8 border-b border-neutral-100 pb-6">
        <h1 className="text-4xl font-playfair font-medium tracking-tight mb-2">
          Agendar Consulta
        </h1>
        <p className="text-neutral-500">
          Encontre o especialista ideal e marque seu horário.
        </p>
      </header>

      <AppointmentForm />
    </div>
  );
}
