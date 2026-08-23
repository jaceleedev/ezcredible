import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type CalloutProps = ComponentProps<"div"> & {
  /** brand: 정의 콜아웃(기본) / gold: 주의사항·유의점 */
  tone?: "brand" | "gold";
};

const tones = {
  brand: "border-brand bg-soft **:[strong]:text-cobalt-700",
  gold: "border-gold-400 bg-gold-50 **:[strong]:text-gold-700",
};

/** 핵심 정의나 주의사항을 담는 콜아웃. <strong>으로 강조 구절을 감싼다. */
export function Callout({ tone = "brand", className, ...props }: CalloutProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border-l-4 px-7 py-6 text-lg leading-relaxed text-slate-800 **:[strong]:font-bold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
