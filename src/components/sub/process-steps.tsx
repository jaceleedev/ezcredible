import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/reveal";
import { ChevronRight } from "@/components/ui/icons";

export type Step = { title: ReactNode; description?: ReactNode; /** 담당 주체 등 작은 꼬리표 */ tag?: ReactNode };

type ProcessStepsProps = {
  steps: Step[];
  /** 데스크톱 열 수. 기본은 단계 수(최대 6) */
  columns?: 3 | 4 | 5 | 6;
  className?: string;
};

const cols = {
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
  5: "md:grid-cols-3 lg:grid-cols-5",
  6: "md:grid-cols-3 lg:grid-cols-6",
};

/** 신청 절차·업무 절차. 번호 카드가 가로로 이어지고 데스크톱에서는 사이에 화살표가 보인다. */
export function ProcessSteps({ steps, columns, className }: ProcessStepsProps) {
  const n = (columns ?? Math.min(6, Math.max(3, steps.length))) as keyof typeof cols;
  // 화살표는 한 줄에 다 들어오는 폭에서만 — 줄이 바뀌는 지점에서 허공을 가리키지 않도록
  const arrows = steps.length <= n ? (n === 3 ? "md:flex" : "lg:flex") : "";
  return (
    <ol className={cn("grid gap-4 md:gap-5", cols[n], className)}>
      {steps.map((step, i) => (
        <Reveal as="li" key={i} delay={i * 80} className="relative flex">
          <div className="flex w-full flex-col gap-3 rounded-2xl border border-line bg-white p-6 shadow-soft">
            <div className="flex size-11 items-center justify-center rounded-full bg-brand font-display text-sm font-extrabold text-white tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="flex flex-col gap-1.5">
              {step.tag && <div className="text-xs font-bold tracking-[0.08em] text-gold-700">{step.tag}</div>}
              <div className="font-display text-lg font-extrabold tracking-tight text-ink">{step.title}</div>
              {step.description && <div className="text-sm leading-relaxed text-muted">{step.description}</div>}
            </div>
          </div>
          {arrows && i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={cn(
                "absolute -right-[18px] top-7 z-10 hidden size-6 items-center justify-center rounded-full bg-white text-brand shadow-soft",
                arrows,
              )}
            >
              <ChevronRight size={14} />
            </span>
          )}
        </Reveal>
      ))}
    </ol>
  );
}
