"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AdminHeader from "@/components/AdminHeader";
import { useAdminGuard } from "@/lib/adminAuth";
import StatusBadge from "@/components/StatusBadge";
import SendProposalModal from "@/components/SendProposalModal";
import { Proposal, ProposalStatus } from "@/lib/constants";

export default function ProposalViewPage() {
  const authed = useAdminGuard();
  const params = useParams();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showSend, setShowSend] = useState(false);

  async function updateStatus(status: ProposalStatus) {
    if (!proposal) return;
    const res = await fetch(`/api/proposals/${proposal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setProposal((prev) => (prev ? { ...prev, status } : prev));
    }
  }

  useEffect(() => {
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | null = null;

    function load() {
      fetch(`/api/proposals/${params.id}`)
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data: Proposal) => {
          if (cancelled) return;
          setProposal(data);
          setLoading(false);
          if (
            data.status !== "pending" &&
            data.status !== "generating" &&
            interval
          ) {
            clearInterval(interval);
            interval = null;
          }
        })
        .catch(() => {
          if (cancelled) return;
          setError(true);
          setLoading(false);
          if (interval) {
            clearInterval(interval);
            interval = null;
          }
        });
    }

    load();
    interval = setInterval(load, 4000);
    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
    };
  }, [params.id]);

  if (!authed) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <AdminHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </main>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <AdminHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-500 dark:text-slate-400 mb-4">Proposal not found</p>
            <Link href="/admin/dashboard" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
              Back to Dashboard
            </Link>
          </div>
        </main>
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
      <AdminHeader />
      <main className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Proposal Card */}
          <div className="proposal-card bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12">
            {/* Proposal Header */}
            <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-start justify-between">
                <div>
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
                <div className="text-right shrink-0 ml-4">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-500">CodeForge</span>
                  <span className="text-xl text-slate-600 dark:text-slate-400 ml-1">Solutions</span>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">From Concept to Code — Shipped.</p>
                </div>
              </div>
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
                <p>proposals@codeforge.com.my</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="print-hidden flex items-center justify-between mt-6">
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              &larr; Back to Dashboard
            </Link>
            {proposal.proposal_content && (
              <div className="flex flex-wrap items-center gap-3">
                {proposal.status === "sent" && proposal.sent_at && (
                  <span className="text-sm text-slate-500 dark:text-slate-400 mr-1">
                    Sent{" "}
                    {new Date(proposal.sent_at).toLocaleDateString("en-MY", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2.5 rounded-lg font-semibold text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  Download as PDF
                </button>
                {proposal.status === "completed" && (
                  <button
                    onClick={() => setShowSend(true)}
                    className="px-6 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                  >
                    Send to Client
                  </button>
                )}
                {proposal.status === "sent" && (
                  <>
                    <button
                      onClick={() => updateStatus("won")}
                      className="px-6 py-2.5 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors"
                    >
                      Mark as Won
                    </button>
                    <button
                      onClick={() => updateStatus("lost")}
                      className="px-6 py-2.5 rounded-lg font-semibold text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      Mark as Lost
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {showSend && proposal && (
        <SendProposalModal
          proposal={proposal}
          onClose={() => setShowSend(false)}
          onSent={({ status, sent_at }) => {
            setProposal((prev) => (prev ? { ...prev, status, sent_at } : prev));
            setShowSend(false);
          }}
        />
      )}
    </div>
  );
}
