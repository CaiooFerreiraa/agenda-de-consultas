import { getPublicDoctorsAction } from "@/actions/public/doctors";
import { auth } from "@/auth";
import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/public/hero-search";
import { Stethoscope, ArrowRight, Star, Search, BadgeCheck, Users, Clock, Building2, ChevronRight, Heart, Brain, Bone, Eye, Baby, LogOut, Activity } from "lucide-react";
import Link from "next/link";

const SPECIALTIES = [
  { label: "Cardiologia", icon: Heart, exact: "Cardiologia" },
  { label: "Neurologia", icon: Brain, exact: "Neurologia" },
  { label: "Ortopedia", icon: Bone, exact: "Ortopedia" },
  { label: "Oftalmologia", icon: Eye, exact: "Oftalmologia" },
  { label: "Pediatria", icon: Baby, exact: "Pediatria" },
  { label: "Anestesiologia", icon: Activity, exact: "Anestesiologia" },
  { label: "Clínico Geral", icon: Stethoscope, exact: "Clínico Geral" },
  { label: "Dermatologia", icon: BadgeCheck, exact: "Dermatologia" },
];

export default async function Home(props: { searchParams: Promise<{ query?: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const allDoctors = await getPublicDoctorsAction(query);
  const doctors = allDoctors.slice(0, 6); // Apenas até 6 médicos na Home
  const session = await auth();

  const initials = session?.user?.name
    ? session.user.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
    : session?.user?.email?.[0].toUpperCase() ?? "U";

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FE] selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="py-4 px-4 sm:px-8 bg-white border-b border-neutral-100 sticky top-0 z-50 shadow-sm shadow-black/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-neutral-900">Conecta Saúde</span>
          </Link>

          <div className="flex-1 max-w-md hidden md:block">
            <HeroSearch initialQuery={query} />
          </div>

          <nav className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard" className="hidden lg:flex items-center gap-2 group">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-[10px] font-bold shadow-md shadow-primary/10 group-hover:scale-105 transition-transform">
                    {initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-neutral-800 leading-none">Minha Conta</span>
                    <span className="text-[10px] text-neutral-400">Ver Dashboard</span>
                  </div>
                </Link>
                <div className="flex items-center gap-2">
                  <Button asChild size="sm" variant="outline" className="rounded-xl h-10 px-4 text-xs font-bold border-neutral-200 hover:bg-neutral-50 hidden sm:flex">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <form action={logoutAction}>
                    <Button type="submit" variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-all" title="Sair da Conta">
                      <LogOut className="w-5 h-5" />
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold text-neutral-600 hover:text-primary transition-colors hidden sm:block">
                  Acessar Conta
                </Link>
                <Button asChild className="rounded-xl px-6 h-10 text-sm font-bold shadow-lg shadow-primary/20">
                  <Link href="/register">Cadastre-se</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-16 px-4 relative overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-widest mb-6 border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Plataforma de Saúde
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
                Sua saúde, na <br className="hidden md:block" />
                <span className="text-white/80">ponta dos dedos.</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto md:mx-0 font-medium">
                A plataforma que centraliza a gestão de documentos, pagamentos e atendimento para médicos e hospitais. Agende consultas em minutos com especialistas verificados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-neutral-100 rounded-2xl px-10 h-14 text-base font-bold shadow-2xl shadow-blue-900/40 border-0">
                  <Link href="/busca">Encontrar seu médico <ArrowRight className="w-5 h-5 ml-2" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-2xl px-10 h-14 border-white/20 text-white bg-white/5 hover:bg-white/10 text-base font-bold backdrop-blur-md">
                  <Link href="#empresas">Para Empresas</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-white border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "+2.500", label: "Especialistas", icon: Users },
              { value: "+50.000", label: "Consultas", icon: BadgeCheck },
              { value: "24h", label: "Suporte", icon: Clock },
              { value: "+300", label: "Parceiros", icon: Building2 },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center md:items-start md:flex-row gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 border border-primary/5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-2xl font-black text-neutral-900 leading-none">{value}</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mt-2">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Specialties */}
        <section className="py-20 px-4 bg-[#F4F7FE]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">Especialidades</h2>
                <p className="text-sm text-neutral-500 mt-1">Encontre o cuidado específico que você precisa.</p>
              </div>
              <Link href="/busca" className="text-sm font-bold text-primary flex items-center gap-1 hover:opacity-80 transition-opacity">
                Ver todas <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {SPECIALTIES.map(({ label, icon: Icon, exact }) => (
                <Link
                  key={exact}
                  href={`/busca?query=${encodeURIComponent(exact)}`}
                  className={`group flex flex-col items-center gap-4 px-4 py-8 rounded-[2rem] border transition-all duration-300 ${query === exact
                    ? "bg-primary border-primary shadow-xl shadow-primary/20 text-white"
                    : "bg-white border-neutral-100 hover:border-primary/20 hover:shadow-xl hover:shadow-black/[0.02] text-neutral-700 hover:text-primary"
                    }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${query === exact ? "bg-white/20" : "bg-primary/5 group-hover:bg-primary/10"}`}>
                    <Icon className={`w-7 h-7 ${query === exact ? "text-white" : "text-primary"}`} />
                  </div>
                  <span className="text-xs font-bold text-center leading-tight uppercase tracking-wider">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Doctors Listing */}
        <section className="py-20 px-4 bg-white rounded-t-[3rem] -mt-10 relative z-10 border-t border-neutral-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">Especialistas em destaque</h2>
                <p className="text-base text-neutral-500 mt-2">
                  Uma seleção dos nossos profissionais mais qualificados.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" className="text-primary font-bold">
                  <Link href="/busca">Ver todos os profissionais <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {doctors.map((doctor) => (
                <Link href={`/medico/${doctor.id}`} key={doctor.id} className="group">
                  <div className="bg-white p-6 rounded-[2.5rem] border border-neutral-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full relative overflow-hidden group-hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-primary/5 transition-colors" />

                    <div className="flex items-start justify-between mb-8">
                      <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-primary/10 to-blue-50 flex items-center justify-center text-3xl font-bold text-primary shadow-sm border border-primary/5">
                        {doctor.name?.charAt(0) || "D"}
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-amber-600 bg-amber-50/50 border border-amber-100/50 px-3 py-1 rounded-full text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        4.9
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary transition-colors leading-tight mb-1 flex items-center gap-2">
                        Dr(a). {doctor.name}
                        <BadgeCheck className="w-4 h-4 text-emerald-500" />
                      </h3>
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4 opacity-80">{doctor.specialty || "Clínico Geral"}</p>
                      <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 font-medium">
                        {doctor.bio || "Especialista altamente qualificado e dedicado ao cuidado integral dos pacientes."}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-50 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1">A partir de</p>
                        <p className="text-lg font-black text-neutral-900 leading-none">
                          {doctor.price ? `R$ ${doctor.price}` : "Sob consulta"}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-primary/5 group-hover:bg-primary flex items-center justify-center transition-all duration-300 shadow-sm border border-primary/5">
                        <ArrowRight className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* For Hospitals Section */}
        <section id="empresas" className="py-24 px-4 bg-[#F4F7FE] relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-primary/10">
                  <Building2 className="w-3.5 h-3.5" />
                  Hospitais & Clínicas
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 leading-[1.1] mb-6 tracking-tight">
                  Gestão de escalas <br /><span className="text-primary">inteligente.</span>
                </h2>
                <p className="text-neutral-500 text-lg leading-relaxed mb-6 font-medium">
                  Hospitais e clínicas podem acionar especialistas verificados para coberturas sob demanda. Nossa plataforma centraliza a gestão de documentos, pagamentos e atendimento em um único ecossistema.
                </p>

                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <BadgeCheck className="w-3 h-3 text-primary" />
                    </div>
                    <p className="text-sm text-neutral-600"><strong>Gestão de Documentos:</strong> Repositório seguro para CRM, títulos e seguros.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <BadgeCheck className="w-3 h-3 text-primary" />
                    </div>
                    <p className="text-sm text-neutral-600"><strong>Pagamentos Unificados:</strong> Faturamento automático com transparência total.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <BadgeCheck className="w-3 h-3 text-primary" />
                    </div>
                    <p className="text-sm text-neutral-600"><strong>Atendimento Centralizado:</strong> Histórico de escalas e performance clínica.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button asChild size="lg" className="rounded-2xl px-10 h-14 text-base font-bold shadow-xl shadow-primary/20">
                    <Link href="/register">Solicitar Apresentação</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-2xl px-10 h-14 text-base font-bold border-neutral-200">
                    <Link href="#contato">Falar com Consultor</Link>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Stethoscope, label: "Clínicos", count: "320" },
                  { icon: Heart, label: "Cards", count: "85" },
                  { icon: Brain, label: "Neuros", count: "60" },
                  { icon: Bone, label: "Ortos", count: "90" },
                ].map(({ icon: Icon, label, count }) => (
                  <div key={label} className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-xl hover:border-primary/10 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6 text-primary group-hover:text-white" />
                    </div>
                    <p className="text-3xl font-black text-neutral-900 leading-none mb-1 tracking-tight">{count}</p>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center bg-neutral-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                {session ? "Sua próxima consulta a um clique." : "Comece a cuidar da sua saúde hoje."}
              </h2>
              <p className="text-neutral-400 text-lg mb-12 max-w-xl mx-auto">
                {session
                  ? "Gerencie sua agenda, encontre novos especialistas e mantenha seu histórico sempre à mão."
                  : "Cadastre-se para agendar consultas com os melhores especialistas de forma rápida e segura."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {session ? (
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-12 h-14 text-base font-bold shadow-xl shadow-primary/20 border-0">
                    <Link href="/dashboard">Ir para meu Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-12 h-14 text-base font-bold shadow-xl shadow-primary/20 border-0">
                      <Link href="/register">Criar Conta Gratuita</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-2xl px-12 h-14 border-white/10 text-white bg-white/5 hover:bg-white/10 text-base font-bold">
                      <Link href="/login">Acessar minha conta</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-neutral-900 border-r border-neutral-200 pr-4 mr-1">Conecta Saúde</span>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Marketplace</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center gap-8 text-sm font-bold text-neutral-500">
              <Link href="#" className="hover:text-primary transition-colors">Termos</Link>
              <Link href="#" className="hover:text-primary transition-colors">Privacidade</Link>
              <Link href="#" className="hover:text-primary transition-colors">Suporte</Link>
            </div>
            <p className="text-[10px] uppercase font-black text-neutral-400 tracking-[0.2em]">
              © {new Date().getFullYear()} Conecta Saúde
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
