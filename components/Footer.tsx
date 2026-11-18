import Link from "next/link";

export default function Footer() {
  return (
    <footer className="print-hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <p className="text-lg">
            <span className="font-bold text-blue-600 dark:text-blue-500">CodeForge</span>{" "}
            <span className="text-slate-600 dark:text-slate-400">Solutions</span>
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xs">
            Custom software development studio in Kuala Lumpur. From concept to
            code — shipped.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Contact</p>
          <p className="text-slate-500 dark:text-slate-400">proposals@codeforge.com.my</p>
          <p className="text-slate-500 dark:text-slate-400">+60 3-2148 9500</p>
          <p className="text-slate-500 dark:text-slate-400">
            Level 15, Menara UOA Bangsar, Kuala Lumpur
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Company</p>
          <div className="flex flex-col gap-1">
            <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
            <Link href="/apply" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
              Get a Proposal
            </Link>
            <Link href="/admin" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
              Staff Login
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-xs text-slate-400 dark:text-slate-500">
          &copy; 2026 CodeForge Solutions Sdn Bhd (1234567-X). All rights reserved.
        </div>
      </div>
    </footer>
  );
}
