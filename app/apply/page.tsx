"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import ProposalOutput from "@/components/ProposalOutput";
import { InquiryFormData } from "@/lib/constants";

export default function ApplyPage() {
  const [formData, setFormData] = useState<InquiryFormData | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* Simple public header - no dashboard nav */}
      <header className="print-hidden border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/apply" className="flex items-center gap-1">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-500">
              CodeForge
            </span>
            <span className="text-xl text-slate-600 dark:text-slate-400">
              Solutions
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 px-4 py-8 md:py-12">
        {formData ? (
          <ProposalOutput
            key={JSON.stringify(formData)}
            formData={formData}
            onReset={() => setFormData(null)}
          />
        ) : (
          <InquiryForm onSubmit={setFormData} />
        )}
      </main>
      <Footer />
    </div>
  );
}
