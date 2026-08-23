import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** 핵심 정의를 담는 콜아웃. <strong>으로 강조 구절을 감싼다. */
export function Callout({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border-l-4 border-brand bg-soft px-7 py-6 text-lg leading-relaxed text-slate-800 **:[strong]:font-bold **:[strong]:text-cobalt-700",
        className,
      )}
      {...props}
    />
  );
}
