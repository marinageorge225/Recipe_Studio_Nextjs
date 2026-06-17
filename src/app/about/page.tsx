import Image from "next/image";
import { ChefHat, Heart, Users } from "lucide-react";

export default function About() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
              About Us
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-gray-900">
              Cooking made simple, one recipe at a time
            </h1>

            <p className="mt-5 text-sm leading-6 text-gray-500">
              Recipe Studio started as a small side project for home cooks who
              wanted clear, no-nonsense instructions without scrolling through a
              life story to get to the ingredients list. Today we host a growing
              collection of recipes from cuisines around the world, each one
              broken down into simple steps anyone can follow.
            </p>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Whether you&apos;re cooking for one or hosting a dinner party, our
              goal is the same: help you find a recipe you&apos;ll actually want
              to make again.
            </p>
          </div>

          <div className="relative h-80 w-full overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="https://cdn.dummyjson.com/recipe-images/18.webp"
              alt="A home-cooked meal"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-orange-50 py-16">
        <div className="mx-auto max-w-7xl px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            What we care about
          </h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
              <ChefHat className="mx-auto text-orange-500" size={32} />
              <h3 className="mt-4 font-semibold text-gray-900">
                Tested Recipes
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Every recipe is written with clear steps so nothing gets lost in
                translation between page and plate.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
              <Users className="mx-auto text-orange-500" size={32} />
              <h3 className="mt-4 font-semibold text-gray-900">
                Community Driven
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Ratings and reviews come from real home cooks trying these
                dishes in their own kitchens.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
              <Heart className="mx-auto text-orange-500" size={32} />
              <h3 className="mt-4 font-semibold text-gray-900">
                Made with Care
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                We obsess over the small details, from ingredient lists to
                step-by-step clarity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
