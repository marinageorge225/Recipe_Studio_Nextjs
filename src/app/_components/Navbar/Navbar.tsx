"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, Heart, LogOut } from "lucide-react";
import {
  type AuthUser,
  clearAuth,
  getInitials,
  getUser,
  onAuthChange,
} from "../../../../lib/auth";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getUser());
    const unsubscribe = onAuthChange(() => setUser(getUser()));
    return unsubscribe;
  }, []);

  // No navbar on the login/register pages.
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Menu", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  function handleLogout() {
    clearAuth();
    setMenuOpen(false);
    router.push("/login");
  }

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

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-rose-400 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
                title={user.name}
              >
                {getInitials(user.name) || "?"}
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-12 w-48 rounded-xl border border-stone-100 bg-white py-2 shadow-lg">
                  <div className="border-b border-stone-100 px-4 py-2">
                    <p className="truncate text-sm font-medium text-stone-800">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-stone-400">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-stone-600 hover:bg-orange-50 hover:text-orange-600"
                  >
                    <LogOut size={15} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-orange-500 px-6 py-2 text-sm font-medium text-white hover:bg-orange-600"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
