import RecipeCard from "@/app/_components/RecipeCard/RecipeCard";
import type { Recipe } from "../../../../types/recipe";
import { Smile } from "lucide-react";

export default function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  if (recipes.length === 0) {
    return (
      <div className="rounded-[2.5rem] border border-dashed border-stone-200 bg-white/50 py-24 text-center backdrop-blur-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 animate-bounce items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
          <Smile size={26} />
        </div>
        <p className="font-serif text-xl font-bold text-stone-900">
          No recipes found
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-stone-500">
          We couldn&apos;t find any matches. Try adjusting your search query or
          selecting a different cuisine filter.
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
