"use client";

import { useState } from "react";
import { Proposal } from "@/lib/constants";

interface SendProposalModalProps {
  proposal: Proposal;
  onClose: () => void;
  onSent: (updated: { status: "sent"; sent_at: string }) => void;
}

export default function SendProposalModal({
  proposal,
  onClose,
  onSent,
}: SendProposalModalProps) {
  const [phase, setPhase] = useState<"compose" | "sending" | "done">("compose");
  const [error, setError] = useState(false);

  async function handleSend() {
    setPhase("sending");
    setError(false);
    const sentAt = new Date().toISOString();
    // Brief pause so the send feels deliberate, like a real mail client
    await new Promise((r) => setTimeout(r, 1400));
    const res = await fetch(`/api/proposals/${proposal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "sent", sent_at: sentAt }),
    }).catch(() => null);

    if (res?.ok) {
      setPhase("done");
      setTimeout(() => onSent({ status: "sent", sent_at: sentAt }), 900);
    } else {
      setPhase("compose");
      setError(true);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={phase === "compose" ? onClose : undefined}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {phase === "done" ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-semibold text-lg">Proposal sent</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Delivered to {proposal.email}
            </p>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h2 className="font-semibold">Send proposal</h2>
              <button
                onClick={onClose}
                disabled={phase === "sending"}
                aria-label="Close"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-4 space-y-3 text-sm">
              <div className="flex gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
                <span className="w-16 text-slate-400 dark:text-slate-500 shrink-0">To</span>
                <span className="font-medium">
                  {proposal.full_name} &lt;{proposal.email}&gt;
                </span>
              </div>
              <div className="flex gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
                <span className="w-16 text-slate-400 dark:text-slate-500 shrink-0">From</span>
                <span>CodeForge Solutions &lt;proposals@codeforge.com.my&gt;</span>
              </div>
              <div className="flex gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
                <span className="w-16 text-slate-400 dark:text-slate-500 shrink-0">Subject</span>
                <span className="font-medium">
                  Your {proposal.service} proposal — {proposal.company_name}
                </span>
              </div>
              <div className="pt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>Dear {proposal.full_name},</p>
                <p className="mt-3">
                  Thank you for considering CodeForge Solutions for your{" "}
                  {proposal.service} project. Your full proposal —
                  including scope, timeline, and itemised pricing — is enclosed
                  below.
                </p>
                <p className="mt-3">
                  We&apos;d be glad to walk you through it on a short call.
                  Simply reply to this email with a time that suits you.
                </p>
                <p className="mt-3">
                  Best regards,
                  <br />
                  The CodeForge Solutions Team
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600">
                <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Proposal-{proposal.company_name.replace(/[^a-zA-Z0-9]/g, "")}.pdf
                </span>
              </div>
            </div>

            {error && (
              <p className="px-6 pb-2 text-sm text-red-600 dark:text-red-400">
                Sending failed. Please try again.
              </p>
            )}

            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                disabled={phase === "sending"}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={phase === "sending"}
                className="px-6 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors disabled:opacity-60 flex items-center gap-2"
              >
                {phase === "sending" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Proposal"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
