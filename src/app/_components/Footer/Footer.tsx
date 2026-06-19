"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <footer className="bg-orange-50 border-t border-orange-100">
      <div className="mx-auto max-w-7xl px-8 py-12">
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold">
              Recipe <span className="text-orange-500">Studio</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Discover delicious recipes from around the world and turn everyday
              ingredients into unforgettable meals.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Explore</h3>

            <div className="space-y-3 text-gray-600">
              <Link href="/" className="block hover:text-orange-500">
                Home
              </Link>

              <Link href="/recipes" className="block hover:text-orange-500">
                Recipes
              </Link>

              <Link href="/categories" className="block hover:text-orange-500">
                Categories
              </Link>

              <Link href="/contact" className="block hover:text-orange-500">
                Contact
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Popular Categories</h3>

            <div className="space-y-3 text-gray-600">
              <p>🥗 Healthy Meals</p>

              <p>🍝 Pasta</p>

              <p>🍰 Desserts</p>

              <p>🥘 Dinner Ideas</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Stay Updated</h3>

            <p className="mb-4 text-sm text-gray-600">
              Get new recipes every week.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-full border px-4 py-2 outline-none focus:border-orange-500"
              />

              <button className="rounded-r-full bg-orange-500 px-5 text-white hover:bg-orange-600">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}

        <div className="mt-10 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <p className="text-sm text-gray-500">
              © 2026 Recipe Studio. All rights reserved.
            </p>

            <div className="flex gap-5">
              <SiFacebook
                size={22}
                className="cursor-pointer text-gray-600 hover:text-orange-500"
              />

              <SiInstagram
                size={22}
                className="cursor-pointer text-gray-600 hover:text-orange-500"
              />

              <SiX
                size={22}
                className="cursor-pointer text-gray-600 hover:text-orange-500"
              />

              <SiYoutube
                size={22}
                className="cursor-pointer text-gray-600 hover:text-orange-500"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
