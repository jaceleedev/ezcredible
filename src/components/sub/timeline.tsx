import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/reveal";

export type TimelineEntry = { date: string; year: string; title: ReactNode; description?: ReactNode };

/**
 * 연혁 타임라인. 연도별로 묶어 왼쪽에 큰 연도, 오른쪽에 세로선 위의 카드들을 놓는다.
 * 최신순으로 넘기면 최신순으로 보여 준다(정렬하지 않는다).
 */
export function Timeline({ entries, className }: { entries: TimelineEntry[]; className?: string }) {
  const years = entries.reduce<{ year: string; items: TimelineEntry[] }[]>((acc, entry) => {
    const last = acc[acc.length - 1];
    if (last && last.year === entry.year) last.items.push(entry);
    else acc.push({ year: entry.year, items: [entry] });
    return acc;
  }, []);

  return (
    <div className={cn("flex flex-col", className)}>
      {years.map((group, g) => (
        <div key={group.year} className="grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-10">
          <Reveal className="lg:pt-1">
            <div className="flex items-baseline gap-2 lg:sticky lg:top-28">
              <span className="font-display text-h2 text-brand">{group.year}</span>
              <span className="text-sm font-semibold text-muted">{group.items.length}건</span>
            </div>
          </Reveal>
          <ol className={cn("relative flex flex-col gap-4 border-l-2 border-line pl-8 md:pl-10", g < years.length - 1 ? "pb-12 md:pb-14" : "pb-2")}>
            {group.items.map((entry, i) => (
              <Reveal as="li" key={`${entry.date}-${i}`} delay={i * 70} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[41px] top-7 size-4 rounded-full border-[3px] border-white bg-brand shadow-[0_0_0_2px_var(--color-line)] md:-left-[49px]"
                />
                <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-6 shadow-soft md:flex-row md:gap-8 md:p-7">
                  <div className="shrink-0 font-display text-lg font-extrabold tracking-tight text-brand-strong tabular-nums md:w-24">{entry.date}</div>
                  <div className="flex flex-col gap-1.5">
                    <div className="font-display text-lg font-extrabold tracking-tight text-ink">{entry.title}</div>
                    {entry.description && <p className="text-[15px] leading-relaxed text-body">{entry.description}</p>}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
