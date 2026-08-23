import { cn } from "@/lib/cn";
import { statusLabels, type ConsultationStatus } from "@/lib/consultations-repo";

/** 신규는 눈에 띄게, 스팸은 눈에 안 띄게 */
const tones: Record<ConsultationStatus, string> = {
  new: "bg-cobalt-100 text-cobalt-700",
  in_progress: "bg-gold-100 text-gold-700",
  won: "bg-emerald-100 text-emerald-700",
  lost: "bg-rose-100 text-rose-700",
  spam: "bg-slate-100 text-slate-500",
};

export function StatusBadge({ status, className }: { status: ConsultationStatus; className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold", tones[status], className)}>
      {statusLabels[status]}
    </span>
  );
}
