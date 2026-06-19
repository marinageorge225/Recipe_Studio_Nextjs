"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Heart } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Menu", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <div className="font-serif text-3xl font-bold">
          Recipe{" "}
          <span className="font-serif text-xl text-orange-500">Studio</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                relative px-4 py-2 text-sm font-medium
                transition-all duration-300

                ${
                  pathname === link.href
                    ? "text-orange-500 scale-110"
                    : "text-black hover:text-orange-500 hover:scale-105"
                }
              `}
            >
              {link.name}

              {/* Animated underline */}
              <span
                className={`
                  absolute bottom-0 left-0 h-[2px]
                  bg-orange-500 transition-all duration-300

                  ${pathname === link.href ? "w-full" : "w-0"}
                `}
              />
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          <Search size={20} className="cursor-pointer hover:text-orange-500" />

          <Heart size={20} className="cursor-pointer hover:text-orange-500" />

          <button className="rounded-full bg-orange-500 px-6 py-2 text-sm font-medium text-white hover:bg-orange-600">
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
}
