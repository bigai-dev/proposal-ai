import { ProposalStatus, STATUS_LABELS } from "@/lib/constants";

const BADGE_STYLES: Record<ProposalStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  generating: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  sent: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  won: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  lost: "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400",
  failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function StatusBadge({ status }: { status: string }) {
  const s = (status in BADGE_STYLES ? status : "generating") as ProposalStatus;
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${BADGE_STYLES[s]}`}>
      {STATUS_LABELS[s]}
    </span>
  );
}
