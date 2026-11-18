"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { DEMO_CREDENTIALS, isSignedIn, signIn } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password);
  const [error, setError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (isSignedIn()) router.replace("/admin/dashboard");
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (
      email.trim().toLowerCase() !== DEMO_CREDENTIALS.email ||
      password !== DEMO_CREDENTIALS.password
    ) {
      setError("Incorrect email or password.");
      return;
    }

    setSigningIn(true);
    // Brief pause so signing in feels like a real round trip
    await new Promise((r) => setTimeout(r, 700));
    signIn();
    router.replace("/admin/dashboard");
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="text-2xl">
              <span className="font-bold text-blue-600 dark:text-blue-500">CodeForge</span>{" "}
              <span className="text-slate-600 dark:text-slate-400">Solutions</span>
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Admin Portal
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={signingIn}
              className="w-full py-2.5 px-6 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
            >
              {signingIn ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
            Demo credentials are pre-filled — just click Sign In.
          </p>
          <p className="mt-2 text-center text-sm">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              &larr; Back to website
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
