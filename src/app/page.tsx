import Link from "next/link";
import Hero from "@/app/_components/Hero/Hero";
import RecipeCard from "@/app/_components/RecipeCard/RecipeCard";
import { getRecipes } from "../../lib/recipes";

export default async function Home() {
  const { recipes } = await getRecipes({ limit: 8 });

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-7xl px-8 py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Popular Recipes
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Hand-picked dishes our community loves to cook.
            </p>
          </div>

          <Link
            href="/products"
            className="text-sm font-semibold text-orange-500 hover:text-orange-600"
          >
            View all recipes →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </main>
  );
}
