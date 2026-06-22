"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
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
      router.push(`/recipes?${params.toString()}`);
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateParams({ q: query });
  }

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <form onSubmit={handleSubmit} className="group relative max-w-md">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 transition duration-300 group-focus-within:text-orange-500"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes, e.g. pasta, chicken..."
          className="w-full rounded-full border border-stone-200 bg-stone-50 py-3 pl-11 pr-12 text-sm text-stone-800 outline-none transition duration-300 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              updateParams({ q: "" });
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 transition hover:text-stone-600"
          >
            Clear
          </button>
        )}
      </form>

      {/* Cuisine pills */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
          Cuisine Categories
        </h3>
        <div className="flex max-h-48 flex-wrap gap-2.5 overflow-y-auto pr-2">
          {["All", ...cuisines].map((cuisine) => {
            const isActive = cuisine === activeCuisine;
            return (
              <button
                key={cuisine}
                type="button"
                onClick={() => updateParams({ cuisine })}
                className={`rounded-xl px-4 py-2 text-xs font-bold tracking-wide transition duration-300 active:scale-95 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                    : "bg-stone-100 text-stone-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {cuisine}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pending indicator */}
      {isPending && (
        <div className="flex animate-pulse items-center gap-2 text-xs font-semibold text-orange-600">
          <Loader2 size={13} className="animate-spin" />
          <span>Updating culinary results…</span>
        </div>
      )}
    </div>
  );
}
