import Link from "next/link";
import { cn } from "@/lib/cn";

type Crumb = { label: string; href?: string };

export function Breadcrumb({ items, tone = "dark", className }: { items: Crumb[]; tone?: "dark" | "light"; className?: string }) {
  const onDark = tone === "dark";
  return (
    <nav aria-label="현재 위치" className={cn("flex flex-wrap items-center gap-2 text-[13px] font-medium", onDark ? "text-white/70" : "text-muted", className)}>
      <Link href="/" className="hover:underline">
        Home
      </Link>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-2">
            <span aria-hidden="true">›</span>
            {item.href && !last ? (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current={last ? "page" : undefined} className={cn(last && "font-bold", last && (onDark ? "text-white" : "text-ink"))}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
