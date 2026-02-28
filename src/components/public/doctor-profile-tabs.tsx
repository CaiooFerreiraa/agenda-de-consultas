"use client";

import { useState } from "react";
import { Medal, Award, Users, Star, Info, GraduationCap, MessageSquare, CheckCircle2 } from "lucide-react";

interface DoctorProfileTabsProps {
  doctor: any;
}

export function DoctorProfileTabs({ doctor }: DoctorProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("sobre");

  const tabs = [
    { id: "sobre", label: "Sobre o Especialista" },
    { id: "info", label: "Informações" },
    { id: "formacao", label: "Formação" },
    { id: "avaliacoes", label: "Avaliações" },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm shadow-black/2 overflow-hidden min-h-[500px] flex flex-col">
      {/* Tab Navigation */}
      <div className="flex items-center gap-6 px-10 pt-8 border-b border-neutral-50 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === tab.id
              ? "border-primary text-primary"
              : "border-transparent text-neutral-400 hover:text-neutral-900"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-10 md:p-12 flex-1 animate-in fade-in duration-300">
        {activeTab === "sobre" && (
          <div className="space-y-12">
            <section>
              <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                <Medal className="w-5 h-5 text-primary" /> Perfil Profissional
              </h3>
              <div className="text-neutral-600 leading-relaxed space-y-4 max-w-3xl">
                {doctor.bio ? (
                  <p className="font-light">{doctor.bio}</p>
                ) : (
                  <p className="font-light">
                    Profissional dedicado com foco em medicina humanizada e resultados de excelência no cuidado ao paciente. Oferece tratamentos modernos, diagnósticos precisos e acompanhamento contínuo em todo o processo terapêutico.
                  </p>
                )}
                <p className="font-light">
                  Atendimento especializado em ambiente acolhedor, utilizando as melhores práticas para garantir segurança clínica e bem-estar físico-mental integral.
                </p>
              </div>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Award, label: "Experiência", value: `${doctor.experience || 0} Anos` },
                { icon: Users, label: "Pacientes", value: doctor.totalPatients ? `+${doctor.totalPatients}` : "Início" },
                { icon: Star, label: "Reviews", value: doctor.reviewsRaw?.length || 0 },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-[#F4F7FE]/50 rounded-3xl p-6 border border-neutral-50 hover:bg-white hover:shadow-md hover:border-primary/10 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900 leading-none mb-1">{value}</p>
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ... Tab Info can stay similar for now ... */}

        {activeTab === "formacao" && (
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-primary" /> Histórico Acadêmico
              </h3>
              <div className="space-y-6">
                {doctor.formation ? (
                  doctor.formation.split('\n').filter(Boolean).map((line: string, idx: number, arr: any[]) => (
                    <div key={idx} className="flex gap-6 relative">
                      {idx !== arr.length - 1 && <div className="absolute left-3 top-10 bottom-0 w-0.5 bg-neutral-100" />}
                      <div className="w-6 h-6 rounded-full bg-primary/10 border-2 border-white shadow-sm flex items-center justify-center shrink-0 z-10">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-neutral-900 mt-1">{line}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-400 font-medium italic">Nenhuma formação cadastrada ainda.</p>
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === "avaliacoes" && (
          <div className="space-y-8">
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-primary" /> O que dizem os pacientes
                </h3>
                <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-100">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="text-lg font-black text-amber-700">
                    {doctor.reviewsRaw?.length ? (doctor.reviewsRaw.reduce((acc: number, r: any) => acc + r.rating, 0) / doctor.reviewsRaw.length).toFixed(1) : "0.0"}
                  </span>
                </div>
              </div>

              {doctor.reviewsRaw && doctor.reviewsRaw.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {doctor.reviewsRaw.map((review: any) => (
                    <div key={review.id} className="p-6 bg-white rounded-3xl border border-neutral-100 shadow-sm hover:border-primary/10 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center font-bold text-neutral-500 uppercase">
                            {review.patient?.name?.charAt(0) || "P"}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-neutral-900">{review.patient?.name || "Paciente Anonimo"}</p>
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
                              {new Intl.DateTimeFormat('pt-BR').format(new Date(review.createdAt))}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`w-3 h-3 ${s <= review.rating ? "fill-amber-500 text-amber-500" : "fill-neutral-200 text-neutral-200"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-neutral-500 font-medium leading-relaxed italic">
                        "{review.comment || "Nenhum comentário adicional."}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-12 bg-neutral-50 rounded-3xl border border-dashed border-neutral-200">
                  <MessageSquare className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
                  <p className="text-neutral-500 font-medium">Este profissional ainda não possui avaliações.</p>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
