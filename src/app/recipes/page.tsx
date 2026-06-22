import { Suspense } from "react";
import type { Metadata } from "next";
import type { Recipe } from "../../../types/recipe";
import RecipeFilters from "../_components/RecipeFilters/RecipeFilters";
import RecipeGrid from "@/app/_components/RecipeGrid/RecipeGrid";
import {
  getAllRecipes,
  getCuisines,
  searchRecipes,
} from "../../../lib/recipes";

export const metadata: Metadata = {
  title: "All Recipes | Recipe Studio",
  description:
    "Browse our entire recipe collection, filter by cuisines like Italian, Mexican, and Seafood, or search by name.",
};

export const dynamic = "force-dynamic";

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cuisine?: string }>;
}) {
  const { q, cuisine } = await searchParams;

  const allRecipes = await getAllRecipes();
  const cuisines = getCuisines(allRecipes);

  let recipes: Recipe[] = q ? await searchRecipes(q) : allRecipes;

  if (cuisine && cuisine !== "All") {
    recipes = recipes.filter((r) => r.cuisine === cuisine);
  }

  return (
    <main className="relative min-h-screen bg-[#FFFDFB] pb-24">
      <div className="pointer-events-none absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-orange-100/40 blur-3xl" />

      {/* Page header */}
      <section className="bg-gradient-to-b from-amber-50/60 to-transparent py-16">
        <div className="mx-auto max-w-7xl px-8">
          <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 ring-1 ring-orange-100/50">
            Our Menu
          </span>
          <h1 className="mt-4 font-serif text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
            Explore All Recipes
          </h1>
          <p className="mt-3 max-w-xl text-stone-500">
            Find the perfect dish for any occasion. Filter by cuisine or search
            for specific ingredients and meals.
          </p>
          <div className="mt-4 text-xs font-medium text-stone-400">
            {recipes.length} exquisite recipe{recipes.length === 1 ? "" : "s"}{" "}
            found
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8">
        {/* Filters */}
        <div className="mb-10 rounded-3xl border border-stone-100 bg-white/70 p-6 shadow-sm backdrop-blur-md">
          <Suspense
            fallback={
              <div className="h-20 animate-pulse rounded-2xl bg-stone-100" />
            }
          >
            <RecipeFilters cuisines={cuisines} />
          </Suspense>
        </div>

        {/* Grid */}
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse rounded-3xl bg-stone-100"
                />
              ))}
            </div>
          }
        >
          <RecipeGrid recipes={recipes} />
        </Suspense>
      </section>
    </main>
  );
}
