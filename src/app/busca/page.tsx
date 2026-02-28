import { getPublicDoctorsAction } from "@/actions/public/doctors";
import { auth } from "@/auth";
import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/public/hero-search";
import { Stethoscope, ArrowRight, Star, Search, BadgeCheck, LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Heart, Brain, Bone, Eye, Baby, Activity } from "lucide-react";

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

export default async function BuscaPage(props: { searchParams: Promise<{ query?: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const doctors = await getPublicDoctorsAction(query);
  const session = await auth();

  const initials = session?.user?.name
    ? session.user.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
    : session?.user?.email?.[0].toUpperCase() ?? "U";

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FE] selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="py-4 px-4 sm:px-8 bg-white border-b border-neutral-100 sticky top-0 z-50 shadow-sm shadow-black/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:bg-primary/90 transition-all">
              <ArrowLeft className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-neutral-900 hidden sm:block">MedSchedule</span>
          </Link>

          <div className="flex-1 max-w-2xl px-4 md:px-8">
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

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {query ? `Resultados para "${query}"` : "Buscar Profissionais"}
            </h1>
            <p className="text-base text-neutral-500 mt-2 font-medium">
              Encontre especialistas verificados e agende sua consulta em minutos.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-neutral-400 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-100 uppercase tracking-widest">
              {doctors.length} {doctors.length === 1 ? "médico" : "médicos"}
            </span>
            {query && (
              <Button asChild variant="outline" size="sm" className="h-9 rounded-xl border-primary/20 text-primary font-bold hover:bg-primary/5">
                <Link href="/busca">Limpar Busca</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide w-full max-w-full">
          <Button
            asChild
            variant={!query ? "default" : "outline"}
            className={`rounded-full shrink-0 h-10 px-5 font-bold transition-all ${!query
              ? "bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary/90"
              : "bg-white text-neutral-600 border-neutral-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              }`}
          >
            <Link href="/busca">Todos</Link>
          </Button>

          {SPECIALTIES.map((spec) => {
            const isActive = query === spec.exact;
            const Icon = spec.icon;

            return (
              <Button
                key={spec.exact}
                asChild
                variant={isActive ? "default" : "outline"}
                className={`rounded-full shrink-0 h-10 px-5 font-bold transition-all gap-2 ${isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary/90"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  }`}
              >
                <Link href={`/busca?query=${encodeURIComponent(spec.exact)}`}>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-primary/70'}`} />
                  {spec.label}
                </Link>
              </Button>
            );
          })}
        </div>

        {doctors.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-neutral-200">
            <div className="w-20 h-20 rounded-full bg-neutral-50 shadow-sm flex items-center justify-center mx-auto mb-6 border border-neutral-100">
              <Search className="w-10 h-10 text-neutral-300" />
            </div>
            <h3 className="text-xl font-bold text-neutral-700 tracking-tight">Nenhum profissional encontrado</h3>
            <p className="text-neutral-500 mt-2 max-w-sm mx-auto font-medium">Não encontramos nada relacionado à sua busca. Tente outras especialidades ou nomes.</p>
            <Button className="mt-8 rounded-2xl h-12 px-10 font-bold shadow-lg shadow-primary/20" asChild>
              <Link href="/busca">Ver todos os médicos</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <Link href={`/medico/${doctor.id}`} key={doctor.id} className="group">
                <div className="bg-white p-6 rounded-[2.5rem] border border-neutral-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full relative overflow-hidden group-hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-primary/5 transition-colors" />

                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-primary/10 to-blue-50 flex items-center justify-center text-3xl font-bold text-primary shadow-sm border border-primary/5">
                      {doctor.name?.charAt(0) || "D"}
                    </div>
                    {/* Nota visual simulada ou real, como já calculamos na página dinâmica */}
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
        )}
      </main>

      {/* Footer minimalista */}
      <footer className="py-8 bg-white border-t border-neutral-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] uppercase font-black text-neutral-400 tracking-[0.2em]">
            © {new Date().getFullYear()} MedSchedule
          </p>
        </div>
      </footer>
    </div>
  );
}
