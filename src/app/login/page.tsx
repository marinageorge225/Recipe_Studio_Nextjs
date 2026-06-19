"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChefHat, Mail, Lock, Loader2 } from "lucide-react";
import { isAuthenticated, saveAuth } from "../../../lib/auth";

const API_URL = "http://localhost:3001";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Already signed in? Skip the login form entirely.
  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/");
    }
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.message ||
            "Couldn't sign you in. Check your details and try again.",
        );
        return;
      }

      saveAuth(data.access_token, data.user);
      router.push("/");
    } catch {
      setError("Something went wrong. Is the server running?");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFF8F0] px-4">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-rose-200/60 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-10 h-24 w-24 rounded-full bg-amber-100/70 blur-2xl" />

      <div className="relative w-full max-w-md">
        <div className="rounded-[2rem] border border-orange-100 bg-white/90 p-8 shadow-xl shadow-orange-100/50 backdrop-blur-sm sm:p-10">
          {/* Badge */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-orange-400 to-rose-400 shadow-lg shadow-orange-200">
            <ChefHat className="h-8 w-8 text-white" />
          </div>

          <h1 className="text-center font-serif text-3xl font-bold text-stone-800">
            Welcome back
          </h1>
          <p className="mb-7 mt-2 text-center text-sm text-stone-500">
            Sign in to get cooking again at{" "}
            <span className="font-serif font-semibold text-orange-500">
              Recipe Studio
            </span>
          </p>

          {error && (
            <div className="mb-5 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-400">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-11 pr-4 text-sm text-stone-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-400">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-11 pr-4 text-sm text-stone-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-rose-400 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-orange-200 transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-stone-500">
            New here?{" "}
            <Link
              href="/register"
              className="font-semibold text-orange-500 hover:text-orange-600"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
