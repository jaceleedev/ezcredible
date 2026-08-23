import type { ReactNode } from "react";
import { Callout } from "@/components/ui/callout";
import { Reveal } from "@/components/motion/reveal";

/** 골드 콜아웃 안의 불릿 목록 — 융자제한·거래 주의사항 */
export function RestrictionsCallout({ title, items, footer }: { title: ReactNode; items: string[]; footer?: ReactNode }) {
  return (
    <Reveal delay={120}>
      <Callout tone="gold" className="text-base">
        <strong>{title}</strong>
        <ul className="mt-3 flex flex-col gap-1.5 text-[15px] text-slate-700">
          {items.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden="true" className="font-extrabold text-gold-600">
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {footer && <div className="mt-4 rounded-xl bg-white/70 px-4 py-3 text-sm leading-relaxed text-slate-700">{footer}</div>}
      </Callout>
    </Reveal>
  );
}
