import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { hasHangul, Stat } from "@/components/ui/stat";
import { Reveal } from "@/components/motion/reveal";

export type Fact = {
  label: ReactNode;
  /** 숫자면 카운트업, "4조 643억"처럼 문자열이면 그대로 */
  value: number | string;
  /** 값 바로 옆에 붙는 짧은 단위("억 원", "%"). 길어지면 sub로 내릴 것 — 이 줄은 절대 안 꺾인다 */
  unit?: ReactNode;
  /** 값 아래 작은 꼬리 정보("NICE · KoDATA · 이크레더블", "2026년 3분기") */
  sub?: ReactNode;
  prefix?: string;
  plain?: boolean;
};

/** 핵심 수치 4개를 한 줄로 — 규모·한도·기간·금리 같은 페이지의 숫자 요약 */
export function FactStrip({ facts, className }: { facts: Fact[]; className?: string }) {
  // "4조 643억"처럼 긴 값이 하나라도 있으면 모바일에서 1열로 — 2열 칸(≈134px)에는 안 들어간다.
  // 라틴·숫자("1.5~4.2", "T1~T10")는 한글보다 좁게 그려지므로 기준 글자 수를 다르게 본다
  const isLong = (value: Fact["value"]) => typeof value === "string" && (hasHangul(value) ? value.length > 4 : value.length > 8);
  const anyLong = facts.some((fact) => isLong(fact.value));
  return (
    <Reveal
      className={cn(
        "grid gap-px overflow-hidden rounded-3xl border border-line bg-line shadow-soft sm:grid-cols-2 lg:grid-cols-4",
        anyLong ? "grid-cols-1" : "grid-cols-2",
        className,
      )}
    >
      {facts.map((fact, i) => (
        <div key={i} className="bg-white p-5 sm:p-6 md:p-7">
          <Stat compact tone="light" label={fact.label} value={fact.value} unit={fact.unit} sub={fact.sub} prefix={fact.prefix} plain={fact.plain} />
        </div>
      ))}
    </Reveal>
  );
}
