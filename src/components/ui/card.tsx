import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type CardProps = ComponentProps<"div"> & {
  tone?: "white" | "soft" | "navy";
  /** 호버 시 살짝 떠오르는 카드 — 그림자는 의사요소 불투명도로만 바뀌어 끊김이 없다 */
  interactive?: boolean;
  padding?: "none" | "md" | "lg";
};

const tones = {
  white: "border border-line bg-white text-ink shadow-card",
  soft: "border border-line bg-soft-2 text-ink",
  navy: "bg-navy text-white shadow-navy",
};

const paddings = { none: "", md: "p-7", lg: "p-8" };

export function Card({ tone = "white", interactive = false, padding = "md", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative isolate flex flex-col rounded-3xl",
        tones[tone],
        paddings[padding],
        interactive &&
          "transition-transform duration-500 ease-out-quart will-change-transform hover:-translate-y-2 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:opacity-0 before:shadow-card-hover before:transition-opacity before:duration-500 hover:before:opacity-100",
        className,
      )}
      {...props}
    />
  );
}
