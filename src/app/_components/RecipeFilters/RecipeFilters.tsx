"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState, useTransition } from "react";

export default function RecipeFilters({ cuisines }: { cuisines: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeCuisine = searchParams.get("cuisine") ?? "All";
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function updateParams(next: { q?: string; cuisine?: string }) {
    const params = new URLSearchParams(searchParams.toString());

    if (next.q !== undefined) {
      next.q ? params.set("q", next.q) : params.delete("q");
    }

    if (next.cuisine !== undefined) {
      next.cuisine && next.cuisine !== "All"
        ? params.set("cuisine", next.cuisine)
        : params.delete("cuisine");
    }

    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateParams({ q: query });
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="relative max-w-md">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes, e.g. pasta, chicken..."
          className="w-full rounded-full border border-gray-200 py-2.5 pl-11 pr-4 text-sm outline-none focus:border-orange-500"
        />
      </form>

      <div className="flex flex-wrap gap-2">
        {["All", ...cuisines].map((cuisine) => {
          const isActive = cuisine === activeCuisine;

          return (
            <button
              key={cuisine}
              type="button"
              onClick={() => updateParams({ cuisine })}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "bg-orange-50 text-gray-600 hover:bg-orange-100"
              }`}
            >
              {cuisine}
            </button>
          );
        })}
      </div>

      {isPending && <p className="text-xs text-gray-400">Updating results…</p>}
    </div>
  );
}
