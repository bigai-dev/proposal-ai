"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Proposal } from "@/lib/constants";

function StatusBadge({ status }: { status: string }) {
  const styles = {
    completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    generating: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.generating}`}>
      {status}
    </span>
  );
}

export default function ProposalViewPage() {
  const params = useParams();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/proposals/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setProposal(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-500 dark:text-slate-400 mb-4">Proposal not found</p>
            <Link href="/dashboard" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
              Back to Dashboard
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const date = new Date(proposal.created_at).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Header />
      <main className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Proposal Card */}
          <div className="proposal-card bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12">
            {/* Proposal Header */}
            <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Proposal
                </p>
                <StatusBadge status={proposal.status} />
              </div>
              <p className="text-lg text-slate-700 dark:text-slate-300">
                Prepared for <span className="font-semibold">{proposal.company_name}</span>
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {proposal.full_name} &middot; {date}
              </p>
            </div>

            {/* Proposal Content */}
            {proposal.proposal_content ? (
              <div className="proposal-prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {proposal.proposal_content}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 italic">
                {proposal.status === "generating"
                  ? "This proposal is still being generated..."
                  : "No content available for this proposal."}
              </p>
            )}

            {/* Card Footer */}
            {proposal.proposal_content && (
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                <p className="font-medium text-slate-700 dark:text-slate-300">
                  CodeForge Solutions Sdn Bhd
                </p>
                <p>hello@codeforgesolutions.com</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="print-hidden flex items-center justify-between mt-6">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              &larr; Back to Dashboard
            </Link>
            {proposal.proposal_content && (
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              >
                Download as PDF
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
