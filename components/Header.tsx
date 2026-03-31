"use client";

import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  showNewInquiry?: boolean;
  onNewInquiry?: () => void;
}

export default function Header({ showNewInquiry, onNewInquiry }: HeaderProps) {
  return (
    <header className="print-hidden border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-500">
            CodeForge
          </span>
          <span className="text-xl text-slate-600 dark:text-slate-400">
            Solutions
          </span>
        </div>
        <div className="flex items-center gap-2">
          {showNewInquiry && (
            <button
              onClick={onNewInquiry}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              New Inquiry
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
