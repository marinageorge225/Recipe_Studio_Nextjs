import Link from "next/link";
import Image from "next/image";
import { Sparkles, UtensilsCrossed } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-radial from-amber-50/50 via-white to-white py-16 lg:py-24">
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-100/50 blur-3xl" />
      <div className="pointer-events-none absolute top-20 right-10 h-72 w-72 rounded-full bg-rose-100/40 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-8 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3.5 py-1.5 text-xs font-semibold text-orange-600 ring-1 ring-orange-100/50">
            <Sparkles size={12} className="animate-pulse" />
            <span>Discover culinary inspiration</span>
          </div>

          <h1 className="font-serif text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl lg:leading-tight">
            Discover the Flavor
            <br />
            Your Ultimate{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              Recipe
            </span>{" "}
            Collection
          </h1>

          <p className="max-w-md text-base leading-relaxed text-stone-500">
            From quick weeknight dinners to weekend baking projects, explore
            thousands of recipes with step-by-step ingredients and instructions,
            all in one place.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/recipes"
              className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-rose-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/35 hover:brightness-105 active:translate-y-0"
            >
              <span>Find a Recipe</span>
              <UtensilsCrossed
                size={16}
                className="transition duration-300 group-hover:rotate-12"
              />
            </Link>

            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-7 py-3.5 text-sm font-semibold text-stone-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:text-orange-500 hover:shadow-md active:translate-y-0"
            >
              Browse Categories
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div className="relative">
            <div className="relative h-80 w-80 overflow-hidden rounded-full border-8 border-white bg-stone-100 shadow-2xl md:h-96 md:w-96 lg:h-[400px] lg:w-[400px] transition duration-500 hover:scale-[1.02]">
              <Image
                src="https://cdn.dummyjson.com/recipe-images/4.webp"
                alt="Featured recipe"
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 384px, 320px"
                className="object-cover transition duration-700 hover:scale-105"
                priority
              />
            </div>

            <div className="absolute -left-6 bottom-10 animate-bounce rounded-2xl border border-white/60 bg-white/80 p-4 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-lg">
                  ⭐️
                </span>
                <div>
                  <p className="text-xs text-stone-400">Average Rating</p>
                  <p className="font-serif text-sm font-bold text-stone-800">
                    4.9 Stars
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 top-12 animate-bounce rounded-2xl border border-white/60 bg-white/80 p-4 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-lg">
                  🍲
                </span>
                <div>
                  <p className="text-xs text-stone-400">Easy Cooking</p>
                  <p className="font-serif text-sm font-bold text-stone-800">
                    5k+ Recipes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
