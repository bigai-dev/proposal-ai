"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DashboardPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/proposals")
      .then((res) => res.json())
      .then((data) => {
        setProposals(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this proposal?")) return;
    const res = await fetch(`/api/proposals/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProposals((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Header />
      <main className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Project Dashboard</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                All generated proposals
              </p>
            </div>
            <Link
              href="/apply"
              className="px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              New Proposal
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : proposals.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                No proposals yet
              </p>
              <Link
                href="/apply"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                Create your first proposal &rarr;
              </Link>
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
                    {proposals.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium">{p.company_name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{p.full_name}</p>
                        </td>
                        <td className="px-6 py-4 text-sm">{p.service}</td>
                        <td className="px-6 py-4 text-sm">{p.budget}</td>
                        <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{formatDate(p.created_at)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-3">
                            <Link
                              href={`/dashboard/${p.id}`}
                              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                            >
                              View
                            </Link>
                            <a
                              href={`mailto:${p.email}?subject=Proposal from CodeForge Solutions - ${p.company_name}&body=Dear ${p.full_name},%0D%0A%0D%0APlease find attached our proposal for your ${p.service} project.%0D%0A%0D%0ABest regards,%0D%0ACodeForge Solutions Sdn Bhd`}
                              className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                            >
                              Email
                            </a>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="text-slate-400 dark:text-slate-500 text-sm font-medium hover:text-red-600 dark:hover:text-red-400 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3">
                {proposals.map((p) => (
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
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                      <Link href={`/dashboard/${p.id}`} className="text-blue-600 dark:text-blue-400 text-sm font-medium">View</Link>
                      <a href={`mailto:${p.email}`} className="text-slate-500 dark:text-slate-400 text-sm font-medium">Email</a>
                      <button onClick={() => handleDelete(p.id)} className="text-slate-400 dark:text-slate-500 text-sm font-medium hover:text-red-600">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
