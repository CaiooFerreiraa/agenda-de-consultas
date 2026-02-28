"use client";

import { useState, useRef, useEffect } from "react";
import { sendMessageAction } from "@/actions/chat/messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, MessageCircle, DollarSign, Stethoscope, Heart } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function ChatInterface({
  receiverId,
  initialMessages = [],
  currentUserId,
  receiverName,
  receiverRole
}: {
  receiverId: string;
  initialMessages: any[];
  currentUserId: string;
  receiverName: string;
  receiverRole?: string;
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [content, setContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newMsg = {
      id: "temp-" + Date.now(),
      content,
      senderId: currentUserId,
      createdAt: new Date(),
    };

    setMessages([...messages, newMsg]);
    const textToSend = content;
    setContent("");

    const res = await sendMessageAction(receiverId, textToSend);
    if (res.error) {
      console.error(res.error);
    }
  };

  const isReceiverDoctor = receiverRole === "DOCTOR";

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-[2rem] border border-neutral-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-neutral-100 bg-neutral-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-md">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-emerald-500 border-4 border-white flex items-center justify-center shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-neutral-900 tracking-tight leading-none">{receiverName}</h2>
              {isReceiverDoctor && <Stethoscope className="w-4 h-4 text-primary" />}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Online Agora</span>
              <span className="text-[10px] text-neutral-300 font-bold">•</span>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-neutral-400">
                {isReceiverDoctor ? "Especialista" : "Paciente"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-amber-100/50 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Canal Direto</p>
              <p className="text-xs font-medium text-neutral-500">Tire suas dúvidas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50/30 scrollbar-thin scrollbar-thumb-neutral-200"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-neutral-100 flex items-center justify-center group">
              <MessageCircle className="w-6 h-6 text-neutral-300 group-hover:text-primary transition-colors" />
            </div>
            <div className="max-w-xs">
              <p className="text-lg font-bold text-neutral-900 tracking-tight">Comece a conversa!</p>
              <p className="text-sm text-neutral-500 mt-1">
                Diga um "Olá" para {receiverName}. Combine detalhes da consulta ou tire suas dúvidas sobre sintomas.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.senderId === currentUserId;
            const nextMsg = messages[idx + 1];
            const isLastInGroup = !nextMsg || nextMsg.senderId !== msg.senderId;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"} animate-in fade-in duration-200`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow-sm border ${isMe
                    ? "bg-primary text-white border-primary rounded-tr-sm"
                    : "bg-white text-neutral-700 border-neutral-100 rounded-tl-sm"
                    }`}
                >
                  {msg.content}
                </div>
                {isLastInGroup && (
                  <span className="text-[10px] font-black text-neutral-300 mt-2 px-3 uppercase tracking-widest">
                    {format(new Date(msg.createdAt), "HH:mm", { locale: ptBR })}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-neutral-100 bg-white">
        <form onSubmit={handleSendMessage} className="relative group">
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite algo para enviar..."
            className="h-12 pl-4 pr-14 rounded-xl border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-primary transition-all text-sm"
          />
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
            <Button
              type="submit"
              size="icon"
              disabled={!content.trim()}
              className="h-10 w-10 rounded-lg group-focus-within:scale-105 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-2.5">
          <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3" /> Chat Seguro
          </p>
        </div>
      </div>
    </div>
  );
}

import { ShieldCheck } from "lucide-react";
