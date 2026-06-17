import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
            Discover the Flavor
            <br />
            Your Ultimate Recipe
            <br />
            Collection
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 text-gray-500">
            From quick weeknight dinners to weekend baking projects, explore
            thousands of recipes with step-by-step ingredients and instructions,
            all in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Find a Recipe
            </Link>

            <Link
              href="/products"
              className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:border-orange-300 hover:text-orange-500"
            >
              Browse Categories
            </Link>
          </div>
        </div>

        {/* Right: image + floating cards */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative h-72 w-72 overflow-hidden rounded-full shadow-lg md:h-96 md:w-96">
            <Image
              src="https://cdn.dummyjson.com/recipe-images/4.webp"
              alt="Featured recipe"
              fill
              sizes="(min-width: 768px) 384px, 288px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
