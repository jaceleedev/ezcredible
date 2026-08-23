import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Counter } from "@/components/motion/counter";

type StatProps = {
  label: ReactNode;
  /** 숫자면 카운트업 애니메이션 */
  value: number | string;
  unit?: ReactNode;
  /** 값 아래 붙는 부가 설명 — "NICE · KoDATA · 이크레더블"처럼 단위가 아닌 꼬리 정보 */
  sub?: ReactNode;
  /** 앞에 붙는 기호 (예: "+") */
  prefix?: string;
  /** 연도처럼 천 단위 콤마를 찍지 않는 숫자 */
  plain?: boolean;
  tone?: "light" | "dark";
  /** 서브페이지 수치 칸용 — 값 크기를 한 단계 줄이고 전 칸이 같은 크기를 쓴다 */
  compact?: boolean;
  className?: string;
};

/** SUIT은 한글이 라틴 대문자·숫자보다 시각적으로 크게 그려져, 같은 px면 한글 값만 도드라진다 */
export const hasHangul = (value: number | string) => /[가-힣]/.test(String(value));

export function Stat({ label, value, unit, sub, prefix, plain = false, tone = "dark", compact = false, className }: StatProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className={cn("text-[13px] font-semibold", dark ? "text-cobalt-300" : "text-muted")}>{label}</div>
      <div>
        <div className={cn("flex items-baseline gap-x-1.5", compact ? "flex-wrap gap-y-1" : "whitespace-nowrap gap-x-1")}>
          <span
            className={cn(
              "font-display font-extrabold whitespace-nowrap tabular-nums",
              // compact는 칸마다 크기가 달라지지 않도록 한 단계로 고정한다.
              // 한글 값만 8%쯤 줄여 라틴·숫자 값과 시각 크기를 맞춘다(광학 보정 — 다른 크기로 보이면 안 된다)
              compact
                ? cn("leading-none tracking-[-0.02em]", hasHangul(value) ? "text-[1.625rem] xl:text-[1.875rem]" : "text-[1.75rem] xl:text-[2rem]")
                : "text-stat",
              dark ? "text-white" : "text-ink",
            )}
          >
            {prefix}
            {typeof value === "number" ? <Counter value={value} plain={plain} /> : value}
          </span>
          {unit && <span className={cn("text-base font-bold whitespace-nowrap", dark ? "text-gold-400" : "text-brand-strong")}>{unit}</span>}
        </div>
        {sub && <p className={cn("mt-1.5 text-[13px] leading-snug font-medium", dark ? "text-white/60" : "text-muted")}>{sub}</p>}
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
