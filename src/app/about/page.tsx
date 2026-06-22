import Image from "next/image";
import { ChefHat, Heart, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Recipe Studio",
  description:
    "Learn more about Recipe Studio, our tested recipe philosophies, and our passionate community of home cooks.",
};

const values = [
  {
    icon: ChefHat,
    title: "Tested Recipes",
    description:
      "Every recipe is written with clear steps so nothing gets lost in translation between page and plate.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Ratings and reviews come from real home cooks trying these dishes in their own kitchens.",
  },
  {
    icon: Heart,
    title: "Made with Care",
    description:
      "We obsess over the small details, from ingredient lists to step-by-step clarity.",
  },
];

export default function About() {
  return (
    <main>
      {/* Hero section */}
      <section className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
              About Us
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-stone-900">
              Cooking made simple, one recipe at a time
            </h1>
            <p className="mt-5 text-sm leading-6 text-stone-500">
              Recipe Studio started as a small side project for home cooks who
              wanted clear, no-nonsense instructions without scrolling through a
              life story to get to the ingredients list. Today we host a growing
              collection of recipes from cuisines around the world, each one
              broken down into simple steps anyone can follow.
            </p>
            <p className="mt-4 text-sm leading-6 text-stone-500">
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

      {/* Values section */}
      <section className="border-t border-stone-100 bg-stone-50/50 py-20">
        <div className="mx-auto max-w-7xl px-8">
          <h2 className="text-center font-serif text-3xl font-bold text-stone-900">
            What we care about
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-3xl border border-stone-100 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200/50 hover:shadow-lg"
              >
                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <Icon size={24} />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
