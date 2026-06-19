import Link from "next/link";
import Image from "next/image";
import { Clock, Star } from "lucide-react";
import type { Recipe } from "../../../../types/recipe";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group block overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={recipe.image || "/placeholder-recipe.jpg"}
          alt={recipe.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-orange-600">
          {recipe.cuisine}
        </span>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-gray-900">
          {recipe.name}
        </h3>

        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {totalTime} min
          </span>

          <span className="flex items-center gap-1">
            <Star size={14} className="fill-orange-500 text-orange-500" />
            {recipe.rating}
          </span>

          <span className="rounded-full bg-orange-50 px-2 py-0.5 font-medium text-orange-600">
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </Link>
  );
}
