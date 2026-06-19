import RecipeFilters from "../_components/RecipeFilters/RecipeFilters";
import RecipeGrid from "@/app/_components/RecipeGrid/RecipeGrid";
import {
  getAllRecipes,
  getCuisines,
  searchRecipes,
} from "../../../lib/recipes";
import type { Recipe } from "../../../types/recipe";
import { Suspense } from "react";

export default async function Products({
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
    <main className="mx-auto max-w-7xl px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">All Recipes</h1>
        <p className="mt-2 text-sm text-gray-500">
          {recipes.length} recipe{recipes.length === 1 ? "" : "s"} found
        </p>
      </div>

      <div className="mb-10">
        <Suspense fallback={null}>
          <RecipeFilters cuisines={cuisines} />
        </Suspense>
      </div>

      <RecipeGrid recipes={recipes} />
    </main>
  );
}
