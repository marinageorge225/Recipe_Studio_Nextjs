import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Star, Users, Flame, ChevronLeft } from "lucide-react";
import { getRecipeById } from "../../../../lib/recipes";

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

  return (
    <main className="mx-auto max-w-5xl px-8 py-12">
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-orange-500"
      >
        <ChevronLeft size={16} />
        Back to recipes
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative h-72 w-full overflow-hidden rounded-3xl md:h-96">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
            {recipe.cuisine}
          </span>

          <h1 className="mt-3 text-3xl font-extrabold text-gray-900">
            {recipe.name}
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <Clock size={16} className="text-orange-500" />
              {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min total
            </span>

            <span className="flex items-center gap-1.5">
              <Users size={16} className="text-orange-500" />
              {recipe.servings} servings
            </span>

            <span className="flex items-center gap-1.5">
              <Flame size={16} className="text-orange-500" />
              {recipe.caloriesPerServing} cal / serving
            </span>

            <span className="flex items-center gap-1.5">
              <Star size={16} className="fill-orange-500 text-orange-500" />
              {recipe.rating} ({recipe.reviewCount} reviews)
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-4 rounded-2xl bg-orange-50 p-4 text-center">
            <div>
              <dt className="text-xs text-gray-500">Prep</dt>
              <dd className="font-semibold text-gray-900">
                {recipe.prepTimeMinutes}m
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Cook</dt>
              <dd className="font-semibold text-gray-900">
                {recipe.cookTimeMinutes}m
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Difficulty</dt>
              <dd className="font-semibold text-gray-900">
                {recipe.difficulty}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Ingredients</h2>

          <ul className="mt-4 space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-gray-700"
              >
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">Instructions</h2>

          <ol className="mt-4 space-y-5">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex gap-4 text-sm text-gray-700">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}
