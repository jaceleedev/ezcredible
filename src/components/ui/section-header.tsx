import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Pill } from "./pill";

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  eyebrowTone?: "brand" | "gold" | "white" | "glass";
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  /** 어두운 배경 위 */
  tone?: "light" | "dark";
  /** 오른쪽에 붙는 액션 (링크·화살표 등) — align="left"에서만 */
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  eyebrowTone,
  title,
  lead,
  align = "left",
  tone = "light",
  action,
  className,
}: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex gap-6",
        align === "center" ? "flex-col items-center text-center" : "flex-col items-start md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-4", align === "center" ? "items-center" : "items-start")}>
        {eyebrow && <Pill tone={eyebrowTone ?? (dark ? "glass" : "brand")}>{eyebrow}</Pill>}
        <h2 className={cn("text-h2", dark ? "text-white" : "text-ink")}>{title}</h2>
        {lead && (
          <p className={cn("max-w-2xl text-lead", dark ? "text-white/80" : "text-muted")}>{lead}</p>
        )}
      </div>
      {action && align === "left" && <div className="shrink-0">{action}</div>}
    </div>
  );
}
