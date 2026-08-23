import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Row = { label: ReactNode; value: ReactNode };

/** 자금 세부내용 같은 라벨:값 표. 모바일에서는 라벨이 위로 올라간다. */
export function KeyValueTable({ rows, className }: { rows: Row[]; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-3xl border border-line", className)} role="table">
      {rows.map((row, i) => (
        <div
          key={i}
          role="row"
          className={cn("grid grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)]", i < rows.length - 1 && "border-b border-line")}
        >
          <div role="rowheader" className="bg-soft px-7 py-4 text-[15px] font-bold text-cobalt-700 sm:py-5">
            {row.label}
          </div>
          <div role="cell" className="px-7 py-4 text-[15px] leading-relaxed text-slate-800 sm:py-5">
            {row.value}
          </div>
        </div>
      ))}
    </div>
  );
}
