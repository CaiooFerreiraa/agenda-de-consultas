"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HeroSearchProps {
  initialQuery?: string;
}

export function HeroSearch({ initialQuery = "" }: HeroSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/busca?query=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`/busca`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full bg-neutral-100 hover:bg-neutral-200/80 transition-colors rounded-xl pl-4 pr-2 py-2 gap-2 border border-neutral-200 focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20"
    >
      <Search className="w-4 h-4 text-neutral-400 shrink-0" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar especialidade ou médico..."
        className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-neutral-400 text-neutral-800"
      />
      <button
        type="submit"
        className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors shrink-0 cursor-pointer"
      >
        Buscar
      </button>
    </form>
  );
}
