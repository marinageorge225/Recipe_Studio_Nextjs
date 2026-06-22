import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Star,
  Users,
  Flame,
  ChevronLeft,
  Check,
  Compass,
  Eye,
} from "lucide-react";
import type { Metadata } from "next";
import { getRecipeById } from "../../../../lib/recipes";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    return { title: "Recipe Not Found | Recipe Studio" };
  }

  return {
    title: `${recipe.name} Recipe | Recipe Studio`,
    description: `How to make ${recipe.name}. Preparation: ${recipe.prepTimeMinutes}m, Cook: ${recipe.cookTimeMinutes}m. Ingredients: ${recipe.ingredients.slice(0, 4).join(", ")}.`,
  };
}

export default async function RecipeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <main className="relative min-h-screen bg-[#FFFDFB] pb-24">
      <div className="pointer-events-none absolute -top-40 right-1/4 h-80 w-80 rounded-full bg-orange-100/30 blur-3xl" />

      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        {/* Back link */}
        <Link
          href="/recipes"
          className="group mb-8 inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600 shadow-sm transition duration-300 hover:border-orange-200 hover:text-orange-500 hover:shadow-md"
        >
          <ChevronLeft
            size={16}
            className="transition duration-300 group-hover:-translate-x-0.5"
          />
          <span>Back to recipes</span>
        </Link>

        {/* Hero grid */}
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {/* Image */}
          <div className="relative h-80 w-full overflow-hidden rounded-[2.5rem] border-4 border-white bg-stone-100 shadow-xl md:h-[450px]">
            <Image
              src={recipe.image ?? "/placeholder-recipe.jpg"}
              alt={recipe.name}
              fill
              sizes="(min-width: 1024px) 500px, 100vw"
              className="object-cover transition duration-700 hover:scale-[1.03]"
              priority
            />
            <span className="absolute left-4 top-4 rounded-2xl bg-white/95 px-4 py-1.5 text-xs font-bold text-orange-600 shadow-md backdrop-blur-md">
              {recipe.cuisine}
            </span>
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="mb-3 flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-stone-500"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
              {recipe.name}
            </h1>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Clock, label: "Time", value: `${totalTime} mins` },
                {
                  icon: Users,
                  label: "Servings",
                  value: `${recipe.servings} portions`,
                },
                {
                  icon: Flame,
                  label: "Calories",
                  value: `${recipe.caloriesPerServing} kcal`,
                },
                {
                  icon: Star,
                  label: "Rating",
                  value: recipe.rating,
                  sub: `(${recipe.reviewCount})`,
                  fillStar: true,
                },
              ].map(({ icon: Icon, label, value, sub, fillStar }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-stone-100 bg-white p-3 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-orange-500">
                    <Icon
                      size={16}
                      className={fillStar ? "fill-orange-500" : undefined}
                    />
                    <span className="text-[11px] font-bold uppercase text-stone-400">
                      {label}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-extrabold text-stone-900">
                    {value}{" "}
                    {sub && (
                      <span className="text-[10px] font-medium text-stone-400">
                        {sub}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>

            {/* Cooking details */}
            <div className="rounded-3xl bg-gradient-to-br from-amber-50/50 to-orange-50/50 p-6 ring-1 ring-orange-100/30">
              <h3 className="mb-4 flex items-center gap-1.5 font-serif text-base font-bold text-stone-800">
                <Compass size={18} className="text-orange-500" />
                Cooking details
              </h3>
              <dl className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: "Prep Time", value: `${recipe.prepTimeMinutes}m` },
                  { label: "Cook Time", value: `${recipe.cookTimeMinutes}m` },
                  { label: "Difficulty", value: recipe.difficulty },
                ].map(({ label, value }, i, arr) => (
                  <div
                    key={label}
                    className={
                      i < arr.length - 1
                        ? "border-r border-orange-100/50"
                        : undefined
                    }
                  >
                    <dt className="text-xs font-semibold text-stone-500">
                      {label}
                    </dt>
                    <dd className="mt-1 text-lg font-extrabold text-orange-600">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Ingredients + Instructions */}
        <div className="mt-16 grid gap-12 md:grid-cols-[1.2fr_2fr]">
          {/* Ingredients */}
          <div className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 border-b border-stone-50 pb-4 font-serif text-2xl font-bold text-stone-900">
              Ingredients
            </h2>
            <ul className="space-y-4">
              {recipe.ingredients.map((ingredient, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3.5 text-sm text-stone-700"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                    <Check size={12} className="stroke-[3]" />
                  </span>
                  <span className="leading-relaxed">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 flex items-center gap-2 border-b border-stone-50 pb-4 font-serif text-2xl font-bold text-stone-900">
              <Eye size={22} className="text-orange-500" />
              Step-by-Step Directions
            </h2>
            <ol className="space-y-6">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="group flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition duration-300 group-hover:scale-105">
                    {i + 1}
                  </span>
                  <div className="w-full border-b border-stone-50 pb-4 pt-1 last:border-0 last:pb-0">
                    <p className="text-sm leading-relaxed text-stone-700">
                      {step}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
