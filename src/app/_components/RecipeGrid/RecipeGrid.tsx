import RecipeCard from "@/app/_components/RecipeCard/RecipeCard";
import type { Recipe } from "../../../../types/recipe";

export default function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  if (recipes.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-200 py-20 text-center">
        <p className="text-lg font-semibold text-gray-700">No recipes found</p>
        <p className="mt-1 text-sm text-gray-500">
          Try a different search term or cuisine filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
