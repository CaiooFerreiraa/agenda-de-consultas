import { auth } from "@/auth";
import { prisma } from "@/infrastructure/database/prisma";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/dashboard/profile-form";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  // Convert Decimal and other non-serializeable types
  const serializableUser = {
    ...user,
    price: user.price ? Number(user.price) : null,
    emailVerified: user.emailVerified?.toISOString() || null,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-neutral-900 tracking-tight">Meu Perfil</h1>
        <p className="text-neutral-500 font-medium">Gerencie suas informações pessoais e profissionais</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
        <ProfileForm user={serializableUser} />
      </div>
    </div>
  );
}
