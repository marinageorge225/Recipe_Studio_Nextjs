"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, Heart, LogOut, Menu, X, ChefHat } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Defer to avoid hydration mismatch
    setTimeout(() => {
      setUser(getUser());
    }, 0);
    const unsubscribe = onAuthChange(() => setUser(getUser()));
    return unsubscribe;
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Recipes", href: "/recipes" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  function handleLogout() {
    clearAuth();
    setMenuOpen(false);
    router.push("/login");
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white transition duration-300 group-hover:rotate-6">
            <ChefHat size={20} />
          </div>
          <span className="font-serif text-2xl font-extrabold tracking-tight text-stone-850">
            Recipe<span className="text-orange-500">Studio</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-semibold transition-colors duration-300 ${
                  isActive
                    ? "text-orange-500"
                    : "text-stone-600 hover:text-orange-500"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-orange-500" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4 sm:gap-5">
          <button
            aria-label="Search"
            className="rounded-full p-2 text-stone-500 transition hover:bg-stone-50 hover:text-orange-500"
          >
            <Search size={19} />
          </button>

          <button
            aria-label="Favorites"
            className="rounded-full p-2 text-stone-500 transition hover:bg-stone-50 hover:text-orange-500"
          >
            <Heart size={19} />
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                title={user.name}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-rose-400 text-sm font-bold text-white shadow-sm ring-2 ring-white transition hover:brightness-105 active:scale-95"
              >
                {getInitials(user.name) || "?"}
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-12 w-52 origin-top-right rounded-2xl border border-stone-100 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="border-b border-stone-50 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-stone-800">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-stone-400">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-stone-600 transition hover:bg-orange-50 hover:text-orange-600"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/10 transition-all duration-300 hover:bg-orange-600 hover:shadow-lg"
            >
              Sign in
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className="flex rounded-full p-2 text-stone-700 transition hover:bg-stone-50 md:hidden"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-stone-100 bg-white/95 px-6 py-4 shadow-inner backdrop-blur-md animate-in fade-in slide-in-from-top duration-300 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-stone-600 hover:bg-stone-50 hover:text-orange-500"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
