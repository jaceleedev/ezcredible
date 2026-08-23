import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** 임시 이미지 표시. 프로덕션 빌드에서는 렌더되지 않는다. */
export function DevLabel({ children, className, tone = "dark" }: { children: ReactNode; className?: string; tone?: "dark" | "light" }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span
      className={cn(
        "pointer-events-none absolute z-10 rounded-md px-2 py-1 text-[11px] font-medium",
        tone === "dark" ? "bg-navy/55 text-white/80" : "bg-navy/8 text-brand-strong",
        className,
      )}
    >
      {children}
    </span>
  );
}
