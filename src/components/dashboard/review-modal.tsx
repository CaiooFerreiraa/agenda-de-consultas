"use client";

import { useState } from "react";
import { Star, Loader2, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createReviewAction } from "@/actions/patient/reviews";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ReviewModalProps {
  appointmentId: string;
  doctorName: string;
}

export function ReviewModal({ appointmentId, doctorName }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSubmit() {
    setIsPending(true);
    const result = await createReviewAction(appointmentId, rating, comment);
    setIsPending(false);

    if (result.success) {
      setOpen(false);
      // Feedback UI could be added here
    } else {
      alert(result.error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 rounded-xl font-bold bg-amber-500 hover:bg-amber-600 text-white gap-2 shadow-lg shadow-amber-500/20">
          <Star className="w-4 h-4 fill-current" />
          Avaliar Atendimento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-tight">Avaliar Dr(a). {doctorName}</DialogTitle>
          <DialogDescription className="font-medium">
            Sua opinião é muito importante para nós e para outros pacientes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* Rating Stars */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-black uppercase tracking-widest text-neutral-400">Sua Nota</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-all hover:scale-110 active:scale-95"
                >
                  <Star
                    className={`w-10 h-10 ${star <= rating ? "fill-amber-500 text-amber-500" : "text-neutral-200"
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Comentário (Opcional)
            </p>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Fale um pouco sobre o atendimento..."
              className="min-h-[120px] rounded-2xl bg-neutral-50/50 border-neutral-100 focus:bg-white transition-all resize-none"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" /> Enviar Avaliação
              </div>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
