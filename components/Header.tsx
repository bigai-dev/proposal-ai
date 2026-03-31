"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const active = pathname.startsWith(href);
    return `px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
      active
        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
    }`;
  };

  return (
    <header className="print-hidden border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/apply" className="flex items-center gap-1">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-500">
              CodeForge
            </span>
            <span className="text-xl text-slate-600 dark:text-slate-400">
              Solutions
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link href="/apply" className={linkClass("/apply")}>
              Apply
            </Link>
            <Link href="/dashboard" className={linkClass("/dashboard")}>
              Dashboard
            </Link>
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
