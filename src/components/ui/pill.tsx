import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type PillProps = ComponentProps<"span"> & {
  tone?: "brand" | "gold" | "white" | "glass" | "navy" | "soft";
  size?: "sm" | "md";
  /** 앞에 작은 점(라이브 인디케이터) */
  dot?: boolean | "gold" | "green" | "white";
};

const tones = {
  brand: "bg-cobalt-50 text-brand-strong",
  gold: "bg-gold-100 text-gold-700",
  white: "border border-line-strong bg-white text-brand-strong",
  glass: "border border-white/30 bg-white/12 text-white backdrop-blur",
  navy: "bg-navy text-white",
  soft: "bg-soft text-body",
};

const dots = {
  gold: "bg-gold-400 shadow-[0_0_12px_rgba(245,185,64,0.9)]",
  green: "bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]",
  white: "bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]",
};

export function Pill({ tone = "brand", size = "md", dot, className, children, ...props }: PillProps) {
  const dotTone = dot === true ? "gold" : dot;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full font-bold whitespace-nowrap",
        size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-3.5 py-2 text-[13px]",
        tones[tone],
        className,
      )}
      {...props}
    >
      {dotTone && <span aria-hidden="true" className={cn("size-2 rounded-full", dots[dotTone])} />}
      {children}
    </span>
  );
}

/** 솔루션 카드 안의 작은 키워드 칩 */
export function Chip({ tone = "brand", className, ...props }: Omit<PillProps, "size" | "dot">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1.5 text-xs font-semibold",
        tone === "gold" ? "bg-gold-100 text-gold-700" : "bg-soft text-brand-strong",
        className,
      )}
      {...props}
    />
  );
}
