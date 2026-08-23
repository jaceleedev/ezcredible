import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type CardProps = ComponentProps<"div"> & {
  tone?: "white" | "soft" | "navy";
  /** 호버 시 살짝 떠오르는 카드 */
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
        "relative flex flex-col overflow-hidden rounded-3xl",
        tones[tone],
        paddings[padding],
        interactive &&
          "transition-[transform,box-shadow] duration-500 ease-(--ease-out-expo) hover:-translate-y-1.5 hover:shadow-card-hover",
        className,
      )}
      {...props}
    />
  );
}
