"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { consultationHref, nav } from "@/content/site";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Close, Menu } from "@/components/ui/icons";

/**
 * 사이트 헤더. 페이지 상단의 어두운 히어로/배너 위에 흰색으로 얹혀 있다가(overlay),
 * 스크롤하면 흰 바탕의 고정 바로 바뀐다. 모바일은 전체화면 드로어.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300",
        solid ? "bg-white/92 text-ink shadow-[0_1px_0_rgba(15,23,42,0.06)] backdrop-blur-md" : "bg-transparent text-white",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-(--container-site) items-center justify-between px-5 sm:px-8 lg:h-[88px]">
        <Link href="/" className="flex items-center gap-2.5" aria-label="(주)이지크레더블 홈">
          <Logo variant="mark" tone={solid ? "blue" : "white"} priority className="h-6 sm:h-7" />
          <span className={cn("font-sans text-[17px] font-bold tracking-tight transition-colors sm:text-lg", solid ? "text-brand" : "text-white")}>(주)이지크레더블</span>
        </Link>

        <nav aria-label="주 메뉴" className="hidden items-center gap-1 lg:flex">
          {nav.map((group) => {
            const active = group.items.some((item) => pathname.startsWith(item.href.split("/").slice(0, 2).join("/")));
            return (
              <div key={group.label} className="group relative">
                <Link
                  href={group.href}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                    solid ? "hover:bg-soft hover:text-brand-strong" : "hover:bg-white/12",
                    active && "font-bold",
                  )}
                >
                  {group.label}
                  <ChevronDown size={14} className="opacity-60" />
                </Link>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 transition-[opacity,visibility,transform] duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="min-w-48 rounded-2xl border border-line bg-white p-2 text-ink shadow-card">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "block rounded-xl px-4 py-2.5 text-[15px] font-medium transition-colors hover:bg-soft hover:text-brand-strong",
                            pathname === item.href && "bg-soft font-bold text-brand-strong",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button href={consultationHref} variant={solid ? "primary" : "white"} size="sm" className="hidden sm:inline-flex">
            상담 신청
          </Button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen((v) => !v)}
            className={cn("flex size-11 items-center justify-center rounded-full lg:hidden", solid ? "hover:bg-soft" : "hover:bg-white/12")}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

    </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-white text-ink lg:hidden"
      >
        <div className="flex flex-col gap-2 px-5 py-6">
          {nav.map((group) => (
            <details key={group.label} className="group rounded-2xl border border-line open:bg-soft-2">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-display text-lg font-extrabold [&::-webkit-details-marker]:hidden">
                {group.label}
                <ChevronDown size={18} className="text-muted transition-transform group-open:rotate-180" />
              </summary>
              <ul className="flex flex-col px-3 pb-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium hover:bg-white hover:text-brand-strong",
                        pathname === item.href && "font-bold text-brand-strong",
                      )}
                    >
                      {item.label}
                      <ArrowRight size={14} className="text-muted" />
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
          <Button href={consultationHref} size="lg" className="mt-4 w-full" onClick={() => setOpen(false)}>
            상담 신청하기
          </Button>
        </div>
      </div>
    </>
  );
}
