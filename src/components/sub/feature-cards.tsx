import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { Award, Chart, Check, Cycle, Doc, ListCheck, Star, Trend } from "@/components/ui/icons";

/** 콘텐츠 파일(.ts)에서 아이콘을 문자열로 고를 수 있게 이름 → 컴포넌트로 맵핑 */
export type FeatureIcon = "trend" | "list" | "star" | "doc" | "chart" | "cycle" | "check" | "award";

const icons: Record<FeatureIcon, (p: { size?: number }) => ReactNode> = {
  trend: Trend,
  list: ListCheck,
  star: Star,
  doc: Doc,
  chart: Chart,
  cycle: Cycle,
  check: Check,
  award: Award,
};

export type Feature = {
  icon?: FeatureIcon;
  title: ReactNode;
  /** 문단 또는 불릿 목록 */
  body: ReactNode | string[];
  /** navy는 "이지크레더블 솔루션" 카드처럼 강조 */
  tone?: "white" | "navy";
};

/** 장점·특징·솔루션 같은 카드 3장(또는 4장). 마지막을 navy로 주면 캔버스 02 섹션이 된다. */
export function FeatureCards({ items, columns = 3, className }: { items: Feature[]; columns?: 3 | 4; className?: string }) {
  return (
    <div className={cn("grid gap-5 md:gap-6", columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3", className)}>
      {items.map((item, i) => {
        const navy = item.tone === "navy";
        const Icon = item.icon ? icons[item.icon] : null;
        return (
          <Reveal key={i} delay={i * 90} className="flex">
            <Card tone={navy ? "navy" : "white"} padding="lg" className="w-full gap-4">
              {Icon && (
                <div
                  className={cn(
                    "flex size-[52px] items-center justify-center rounded-2xl",
                    navy ? "bg-white/10 text-gold-400" : "bg-cobalt-50 text-brand-strong",
                  )}
                >
                  <Icon size={24} />
                </div>
              )}
              <h3 className={cn("text-h3", navy ? "text-white" : "text-ink")}>{item.title}</h3>
              {Array.isArray(item.body) ? (
                <ul className={cn("flex flex-col gap-2 text-[15px] leading-relaxed", navy ? "text-white/82" : "text-body")}>
                  {item.body.map((line, j) => (
                    <li key={j} className="flex gap-2.5">
                      <span aria-hidden="true" className={cn("font-extrabold", navy ? "text-gold-400" : "text-brand")}>
                        ·
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={cn("text-[15px] leading-relaxed", navy ? "text-white/82" : "text-body")}>{item.body}</p>
              )}
            </Card>
          </Reveal>
        );
      })}
    </div>
  );
}
