import Link from "next/link";
import Hero from "@/app/_components/Hero/Hero";
import RecipeCard from "@/app/_components/RecipeCard/RecipeCard";
import { getRecipes } from "../../lib/recipes";
import { Sparkles, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { recipes } = await getRecipes({ limit: 8 });

  return (
    <main className="min-h-screen bg-[#FFFDFB] pb-20">
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        {/* Section header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-stone-100 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600 ring-1 ring-orange-100/50">
              <Sparkles size={12} className="animate-pulse" />
              <span>Editor&apos;s Choice</span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Popular Recipes
            </h2>
            <p className="max-w-md text-sm text-stone-500">
              Hand-picked dishes our culinary community loves to cook and share.
            </p>
          </div>

          <Link
            href="/recipes"
            className="group inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-5 py-2.5 text-sm font-bold text-orange-600 transition duration-300 hover:bg-orange-100 active:scale-95"
          >
            <span>View all recipes</span>
            <ArrowRight
              size={15}
              className="transition duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Recipe grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </main>
  );
}
