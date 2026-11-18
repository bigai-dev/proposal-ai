"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminHeader from "@/components/AdminHeader";
import SendProposalModal from "@/components/SendProposalModal";
import StatusBadge from "@/components/StatusBadge";
import { Proposal, ProposalStatus, BUDGET_VALUES } from "@/lib/constants";
import { useAdminGuard } from "@/lib/adminAuth";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatRM(value: number) {
  return `RM ${value.toLocaleString("en-MY")}`;
}

type FilterKey = "all" | "in_progress" | "completed" | "sent" | "won" | "lost";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "in_progress", label: "Generating" },
  { key: "completed", label: "Ready" },
  { key: "sent", label: "Sent" },
  { key: "won", label: "Won" },
  { key: "lost", label: "Lost" },
];

function matchesFilter(p: Proposal, filter: FilterKey) {
  if (filter === "all") return true;
  if (filter === "in_progress")
    return p.status === "pending" || p.status === "generating";
  return p.status === filter;
}

export default function DashboardPage() {
  const authed = useAdminGuard();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");
  const [sendTarget, setSendTarget] = useState<Proposal | null>(null);

  useEffect(() => {
    let cancelled = false;

    function load() {
      fetch("/api/proposals")
        .then((res) => res.json())
        .then((data) => {
          if (cancelled) return;
          setProposals(data);
          setLoading(false);
        })
        .catch(() => {
          if (!cancelled) setLoading(false);
        });
    }

    load();
    const interval = setInterval(load, 4000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const stats = useMemo(() => {
    const total = proposals.length;
    const pipeline = proposals
      .filter((p) => p.status === "completed" || p.status === "sent")
      .reduce((sum, p) => sum + (BUDGET_VALUES[p.budget] ?? 0), 0);
    const won = proposals.filter((p) => p.status === "won").length;
    const lost = proposals.filter((p) => p.status === "lost").length;
    const winRate = won + lost > 0 ? Math.round((won / (won + lost)) * 100) : null;
    const ready = proposals.filter((p) => p.status === "completed").length;
    return { total, pipeline, winRate, ready };
  }, [proposals]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return proposals.filter(
      (p) =>
        matchesFilter(p, filter) &&
        (q === "" ||
          p.company_name.toLowerCase().includes(q) ||
          p.full_name.toLowerCase().includes(q) ||
          p.service.toLowerCase().includes(q))
    );
  }, [proposals, filter, search]);

  async function updateStatus(id: string, status: ProposalStatus) {
    const res = await fetch(`/api/proposals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setProposals((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this proposal?")) return;
    const res = await fetch(`/api/proposals/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProposals((prev) => prev.filter((p) => p.id !== id));
    }
  }

  function RowActions({ p }: { p: Proposal }) {
    return (
      <div className="flex items-center justify-end gap-3">
        <Link
          href={`/admin/dashboard/${p.id}`}
          className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
        >
          View
        </Link>
        {p.status === "completed" && (
          <button
            onClick={() => setSendTarget(p)}
            className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
          >
            Send
          </button>
        )}
        {p.status === "sent" && (
          <>
            <button
              onClick={() => updateStatus(p.id, "won")}
              className="text-green-600 dark:text-green-400 text-sm font-medium hover:underline"
            >
              Won
            </button>
            <button
              onClick={() => updateStatus(p.id, "lost")}
              className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:underline"
            >
              Lost
            </button>
          </>
        )}
        <button
          onClick={() => handleDelete(p.id)}
          className="text-slate-400 dark:text-slate-500 text-sm font-medium hover:text-red-600 dark:hover:text-red-400 hover:underline"
        >
          Delete
        </button>
      </div>
    );
  }

  if (!authed) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <AdminHeader />
      <main className="flex-1 px-4 py-8 md:py-12 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Proposals</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Track every enquiry from first contact to closed deal
              </p>
            </div>
            <Link
              href="/apply"
              className="px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              New Proposal
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Proposals", value: String(stats.total) },
              { label: "Est. Pipeline Value", value: formatRM(stats.pipeline) },
              {
                label: "Win Rate",
                value: stats.winRate === null ? "—" : `${stats.winRate}%`,
              },
              { label: "Ready to Send", value: String(stats.ready) },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
                <p className="text-2xl font-bold mt-1">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <input
              type="search"
              placeholder="Search company, contact, or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-72 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex items-center gap-1 overflow-x-auto">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    filter === f.key
                      ? "bg-blue-600 text-white dark:bg-blue-500"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : visible.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                {proposals.length === 0
                  ? "No proposals yet"
                  : "Nothing matches your search or filter"}
              </p>
              {proposals.length === 0 && (
                <Link
                  href="/apply"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Create your first proposal &rarr;
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Company</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Service</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Budget</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {visible.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium">{p.company_name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{p.full_name}</p>
                        </td>
                        <td className="px-6 py-4 text-sm">{p.service}</td>
                        <td className="px-6 py-4 text-sm">{p.budget}</td>
                        <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{formatDate(p.created_at)}</td>
                        <td className="px-6 py-4"><RowActions p={p} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3">
                {visible.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{p.company_name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{p.full_name}</p>
                      </div>
                      <StatusBadge status={p.status} />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <span>{p.service}</span>
                      <span>{p.budget}</span>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                      {formatDate(p.created_at)}
                    </p>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                      <RowActions p={p} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {sendTarget && (
        <SendProposalModal
          proposal={sendTarget}
          onClose={() => setSendTarget(null)}
          onSent={({ status, sent_at }) => {
            setProposals((prev) =>
              prev.map((p) =>
                p.id === sendTarget.id ? { ...p, status, sent_at } : p
              )
            );
            setSendTarget(null);
          }}
        />
      )}
    </div>
  );
}
