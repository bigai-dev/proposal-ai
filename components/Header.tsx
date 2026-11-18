"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
      active
        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
    }`;
  };

  return (
    <header className="print-hidden sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-500">
              CodeForge
            </span>
            <span className="text-xl text-slate-600 dark:text-slate-400">
              Solutions
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/apply" className={linkClass("/apply")}>
              Get a Proposal
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/apply"
            className="hidden sm:inline-block px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </header>
  );
}
