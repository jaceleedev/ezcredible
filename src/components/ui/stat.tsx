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
  /** 서브페이지 수치 칸용 — 모바일에서 숫자를 줄이고 단위가 다음 줄로 내려갈 수 있다 */
  compact?: boolean;
  className?: string;
};

export function Stat({ label, value, unit, prefix, plain = false, tone = "dark", compact = false, className }: StatProps) {
  const dark = tone === "dark";
  // "3조 3,620억"·"입찰·자금·거래"처럼 긴 문자열은 compact에서 작게 — 1200폭의 4열 칸(≈228px)에도 들어가야 한다
  const long = typeof value === "string" && value.length > 6;
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className={cn("text-[13px] font-semibold", dark ? "text-cobalt-300" : "text-muted")}>{label}</div>
      <div className={cn("flex items-baseline gap-x-1", compact ? "flex-wrap" : "whitespace-nowrap")}>
        <span
          className={cn(
            "font-display font-extrabold whitespace-nowrap tabular-nums",
            compact ? (long ? "text-[1.75rem] leading-none tracking-[-0.02em] sm:text-[2rem]" : "text-[1.75rem] leading-none tracking-[-0.02em] sm:text-stat") : "text-stat",
            dark ? "text-white" : "text-ink",
          )}
        >
          {prefix}
          {typeof value === "number" ? <Counter value={value} plain={plain} /> : value}
        </span>
        {unit && <span className={cn("text-base font-bold", compact && "whitespace-nowrap", dark ? "text-gold-400" : "text-brand-strong")}>{unit}</span>}
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
