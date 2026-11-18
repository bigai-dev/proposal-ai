"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { signOut } from "@/lib/adminAuth";

export default function AdminHeader() {
  const router = useRouter();

  function handleSignOut() {
    signOut();
    router.replace("/admin");
  }

  return (
    <header className="print-hidden sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="flex items-center gap-1">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-500">
              CodeForge
            </span>
            <span className="text-xl text-slate-600 dark:text-slate-400">
              Solutions
            </span>
          </Link>
          <span className="px-2 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/admin/dashboard"
            className="px-3 py-1.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/"
            className="px-3 py-1.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            View Site
          </Link>
          <ThemeToggle />
          <button
            onClick={handleSignOut}
            className="px-3 py-1.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
