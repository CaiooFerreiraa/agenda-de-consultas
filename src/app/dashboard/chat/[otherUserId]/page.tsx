import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getChatAction } from "@/actions/chat/messages";
import { ChatInterface } from "@/components/dashboard/chat-interface";
import { prisma } from "@/infrastructure/database/prisma";
import { ArrowLeft, MessageSquare, Stethoscope, User2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ChatPage({ params }: { params: Promise<{ otherUserId: string }> }) {
  const session = await auth();
  const { otherUserId } = await params;

  if (!session?.user) {
    redirect("/login");
  }

  const currentUserId = session.user.id;

  // Fetch receiver info
  const receiver = await prisma.user.findUnique({
    where: { id: otherUserId },
    select: { name: true, role: true, specialty: true }
  });

  if (!receiver) {
    redirect("/dashboard/consultas");
  }

  const chat = await getChatAction(otherUserId);
  const initialMessages = chat?.messages || [];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500 max-w-5xl mx-auto selection:bg-primary/10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-100 pb-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-neutral-100 text-neutral-400 hover:text-primary hover:border-primary/20 transition-all active:scale-95 group">
            <Link href="/dashboard/consultas">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                Comunicação Direta
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-black uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Seguro
              </div>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-neutral-900 tracking-tight leading-none">Negociação</h1>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-neutral-500 text-sm font-medium mt-2 leading-relaxed max-w-lg">
              Combine detalhes, tire suas dúvidas e agilize seu atendimento direto pelo canal oficial.
            </p>
          </div>
        </div>

        {/* Receiver Quick Info */}
        <div className="hidden lg:flex items-center gap-3 bg-white p-3 rounded-2xl border border-neutral-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center">
            {receiver.role === "DOCTOR" ? <Stethoscope className="w-4 h-4 text-primary" /> : <User2 className="w-4 h-4 text-neutral-400" />}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Em conversa com</p>
            <p className="text-sm font-bold text-neutral-900 leading-none mt-1">
              {receiver.role === "DOCTOR" ? `Dr(a). ${receiver.name}` : receiver.name}
            </p>
            {receiver.specialty && <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">{receiver.specialty}</p>}
          </div>
        </div>
      </div>

      <ChatInterface
        receiverId={otherUserId}
        initialMessages={initialMessages}
        currentUserId={currentUserId}
        receiverName={receiver.name || "Usuário"}
        receiverRole={receiver.role}
      />
    </div>
  );
}
