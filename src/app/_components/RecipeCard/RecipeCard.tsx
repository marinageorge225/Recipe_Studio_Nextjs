import Image from "next/image";
import Link from "next/link";
import { Clock, Star, Users } from "lucide-react";
import type { Recipe } from "../../../../types/recipe";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-stone-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-100 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-stone-100">
        <Image
          src={recipe.image || "/placeholder-recipe.jpg"}
          alt={recipe.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        {/* Cuisine badge */}
        <span className="absolute left-3 top-3 rounded-xl bg-white/95 px-3 py-1 text-[11px] font-bold text-orange-600 shadow-sm backdrop-blur-sm">
          {recipe.cuisine}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 font-serif text-base font-bold leading-snug text-stone-900 group-hover:text-orange-600 transition duration-200">
          {recipe.name}
        </h3>

        {/* Meta row */}
        <div className="mt-auto flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1">
            <Clock size={13} className="text-orange-400" />
            <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
          </div>

          <div className="flex items-center gap-1">
            <Users size={13} className="text-orange-400" />
            <span>{recipe.servings} servings</span>
          </div>

          <div className="flex items-center gap-1">
            <Star size={13} className="fill-orange-400 text-orange-400" />
            <span className="font-semibold text-stone-700">
              {recipe.rating}
            </span>
          </div>
        </div>

        {/* Difficulty pill */}
        <span
          className={`w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
            recipe.difficulty === "Easy"
              ? "bg-emerald-50 text-emerald-600"
              : recipe.difficulty === "Medium"
                ? "bg-amber-50 text-amber-600"
                : "bg-rose-50 text-rose-600"
          }`}
        >
          {recipe.difficulty}
        </span>
      </div>
    </Link>
  );
}
