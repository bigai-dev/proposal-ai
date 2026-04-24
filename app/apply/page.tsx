"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import { InquiryFormData } from "@/lib/constants";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: InquiryFormData) {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
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
        {submitted ? (
          <div className="max-w-xl mx-auto text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-3">Enquiry Received</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-2">
              Thank you for your interest in CodeForge Solutions.
            </p>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              Our team will review your project details and get back to you with a proposal shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded-lg font-medium text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              Submit Another Enquiry
            </button>
          </div>
        ) : (
          <>
            {error && (
              <p className="max-w-2xl mx-auto text-center text-red-600 dark:text-red-400 mb-4">{error}</p>
            )}
            <InquiryForm onSubmit={handleSubmit} submitting={submitting} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
