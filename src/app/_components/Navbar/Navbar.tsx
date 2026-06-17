"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <div className="text-3xl font-bold font-serif">
          Recipe{" "}
          <span className="text-orange-500 text-xl font-serif">Studio</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className="rounded-full border border-orange-400 px-5 py-2 text-sm font-medium text-orange-500"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium hover:text-orange-500"
          >
            About
          </Link>

          <Link
            href="/products"
            className="text-sm font-medium hover:text-orange-500"
          >
            Menu
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium hover:text-orange-500"
          >
            Contact
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          <Search size={20} className="cursor-pointer hover:text-orange-500" />

          <ShoppingCart
            size={20}
            className="cursor-pointer hover:text-orange-500"
          />

          <Heart size={20} className="cursor-pointer hover:text-orange-500" />

          <button className="rounded-full bg-orange-500 px-6 py-2 text-sm font-medium text-white hover:bg-orange-600">
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
}
