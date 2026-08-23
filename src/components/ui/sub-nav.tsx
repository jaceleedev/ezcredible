"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
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

/** 서브페이지 배너 아래에 떠 있는 알약형 섹션 내비. 모바일에서는 가로 스크롤되며 활성 항목이 보이도록 맞춘다. */
export function SubNav({ items, current, action, className }: SubNavProps) {
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    const active = el?.querySelector<HTMLElement>("[aria-current='page']");
    if (!el || !active) return;
    // 활성 알약이 잘려 있으면 가운데로 — 페이지 세로 스크롤은 건드리지 않는다
    const left = active.offsetLeft - (el.clientWidth - active.offsetWidth) / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: "instant" });
  }, [current]);

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-full border border-line bg-white p-2 shadow-[0_20px_48px_-20px_rgba(11,30,77,0.35)] sm:p-3",
        className,
      )}
    >
      <div ref={scroller} className="flex min-w-0 items-center gap-1 overflow-x-auto [scrollbar-width:none]">
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
