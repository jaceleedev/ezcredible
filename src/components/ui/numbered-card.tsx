import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type NumberedCardProps = {
  index: number;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function NumberedCard({ index, title, description, className }: NumberedCardProps) {
  return (
    <div className={cn("flex items-start gap-4 rounded-2xl border border-line bg-soft-2 p-7", className)}>
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand font-display text-sm font-extrabold text-white tabular-nums">
        {String(index).padStart(2, "0")}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="font-display text-lg font-extrabold tracking-tight text-ink">{title}</div>
        {description && <div className="text-sm leading-relaxed text-muted">{description}</div>}
      </div>
    </div>
  );
}
