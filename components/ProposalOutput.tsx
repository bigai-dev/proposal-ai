"use client";

import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { InquiryFormData } from "@/lib/constants";

interface ProposalOutputProps {
  formData: InquiryFormData;
  onReset: () => void;
}

export default function ProposalOutput({ formData, onReset }: ProposalOutputProps) {
  const [content, setContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const proposalIdRef = useRef<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let fullContent = "";

    async function generate() {
      try {
        // Step 1: Save inquiry to Supabase, get proposal ID
        const saveRes = await fetch("/api/proposals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          signal: controller.signal,
        });

        if (!saveRes.ok) throw new Error("Failed to save proposal");
        const { id } = await saveRes.json();
        proposalIdRef.current = id;

        // Step 2: Stream the proposal from Claude
        const response = await fetch("/api/generate-proposal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Failed to generate proposal");

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;
          setContent((prev) => prev + chunk);
        }

        setIsStreaming(false);

        // Step 3: Save the completed proposal content
        await fetch(`/api/proposals/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            proposal_content: fullContent,
            status: "completed",
          }),
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Something went wrong. Please try again.");
          setIsStreaming(false);

          // Mark as failed if we have an ID
          if (proposalIdRef.current) {
            fetch(`/api/proposals/${proposalIdRef.current}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status: "failed" }),
            });
          }
        }
      }
    }

    generate();
    return () => controller.abort();
  }, [formData]);

  // Auto-scroll during streaming
  useEffect(() => {
    if (isStreaming && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [content, isStreaming]);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <button
          onClick={onReset}
          className="px-6 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Proposal Card */}
      <div
        ref={containerRef}
        className="proposal-card bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12"
      >
        {/* Proposal Header */}
        <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            Proposal
          </p>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Prepared for <span className="font-semibold">{formData.companyName}</span>
          </p>
        </div>

        {/* Loading state */}
        {content.length === 0 && isStreaming && (
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span>Generating your proposal...</span>
          </div>
        )}

        {/* Streamed content */}
        <div className="proposal-prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          {isStreaming && content.length > 0 && (
            <span className="inline-block w-2 h-5 bg-blue-500 animate-blink ml-0.5 align-text-bottom" />
          )}
        </div>

        {/* Card Footer */}
        {!isStreaming && content.length > 0 && (
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
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          &larr; Back to Form
        </button>
        {!isStreaming && content.length > 0 && (
          <button
            onClick={() => window.print()}
            className="px-6 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            Download as PDF
          </button>
        )}
      </div>
    </div>
  );
}
