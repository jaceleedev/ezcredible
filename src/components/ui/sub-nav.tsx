import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SubNavItem = { label: string; href: string };

type SubNavProps = {
  items: SubNavItem[];
  /** 현재 경로 — 일치하는 항목이 활성 */
  current: string;
  /** 오른쪽 끝 액션 (빠른 상담신청 버튼 등) */
  action?: ReactNode;
  className?: string;
};

/** 서브페이지 배너 아래에 떠 있는 알약형 섹션 내비 */
export function SubNav({ items, current, action, className }: SubNavProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-full border border-line bg-white p-2 shadow-[0_20px_48px_-20px_rgba(11,30,77,0.35)] sm:p-3",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-1 overflow-x-auto [scrollbar-width:none]">
        {items.map((item) => {
          const active = item.href === current;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "shrink-0 rounded-full px-4 py-2.5 text-[15px] font-semibold transition-colors sm:px-5 sm:py-3",
                active ? "bg-brand text-white" : "text-body hover:bg-soft hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      {action && <div className="hidden shrink-0 md:block">{action}</div>}
    </div>
  );
}
