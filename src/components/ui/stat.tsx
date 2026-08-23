import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Counter } from "@/components/motion/counter";

type StatProps = {
  label: ReactNode;
  /** 숫자면 카운트업 애니메이션 */
  value: number | string;
  unit?: ReactNode;
  /** 앞에 붙는 기호 (예: "+") */
  prefix?: string;
  /** 연도처럼 천 단위 콤마를 찍지 않는 숫자 */
  plain?: boolean;
  tone?: "light" | "dark";
  className?: string;
};

export function Stat({ label, value, unit, prefix, plain = false, tone = "dark", className }: StatProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className={cn("text-[13px] font-semibold", dark ? "text-cobalt-300" : "text-muted")}>{label}</div>
      <div className="flex items-baseline gap-1 whitespace-nowrap">
        <span className={cn("font-display text-stat font-extrabold tabular-nums", dark ? "text-white" : "text-ink")}>
          {prefix}
          {typeof value === "number" ? <Counter value={value} plain={plain} /> : value}
        </span>
        {unit && <span className={cn("text-base font-bold", dark ? "text-gold-400" : "text-brand-strong")}>{unit}</span>}
      </div>
    </div>
  );
}

/** 네이비 카드 안에 2×2로 들어가는 스탯 묶음 */
export function StatGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 divide-x divide-y divide-white/10 *:p-5 *:nth-[1]:border-t-0 *:nth-[2]:border-t-0 sm:*:p-7 md:*:p-9",
        className,
      )}
    >
      {children}
    </div>
  );
}
