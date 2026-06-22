"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { ChefHat, Send } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <footer className="border-t border-stone-100 bg-white">
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500 text-white transition duration-300 group-hover:rotate-6">
                <ChefHat size={16} />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-stone-900">
                Recipe<span className="text-orange-500">Studio</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-500">
              Discover delicious recipes from around the world and turn everyday
              ingredients into unforgettable meals.
            </p>
          </div>

          {/* Explore links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-stone-400">
              Explore
            </h3>
            <ul className="space-y-3 text-sm font-semibold text-stone-600">
              {[
                { label: "Home", href: "/" },
                { label: "Recipes", href: "/recipes" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition duration-200 hover:text-orange-500"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular dishes */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-stone-400">
              Popular Dishes
            </h3>
            <ul className="space-y-3 text-sm text-stone-500">
              {[
                { emoji: "🥗", label: "Healthy Meals" },
                { emoji: "🍝", label: "Italian Pasta" },
                { emoji: "🍰", label: "Sweet Desserts" },
                { emoji: "🥘", label: "Dinner Ideas" },
              ].map(({ emoji, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 font-semibold"
                >
                  <span>{emoji}</span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-stone-400">
              Stay Updated
            </h3>
            <p className="mb-4 text-sm text-stone-500">
              Get new culinary secrets and recipes delivered every week.
            </p>
            <div className="relative flex">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-full border border-stone-200 bg-white py-3 pl-4 pr-12 text-xs outline-none transition focus:border-orange-400"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-orange-500 text-white shadow-md shadow-orange-500/10 transition hover:scale-105 hover:bg-orange-600"
              >
                <Send size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-stone-100 pt-8">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <p className="text-xs font-medium text-stone-400">
              © 2026 Recipe Studio. All rights reserved. Built with love for
              home cooks.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: SiFacebook, label: "Facebook" },
                { Icon: SiInstagram, label: "Instagram" },
                { Icon: SiX, label: "Twitter/X" },
                { Icon: SiYoutube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="rounded-full bg-stone-100/50 p-2 text-stone-600 transition duration-300 hover:bg-orange-50 hover:text-orange-500"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
