"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { SuccessCase } from "@/content/cases";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { Pill } from "@/components/ui/pill";

const AUTOPLAY_MS = 4500;
const TOUCH_RESUME_MS = 6000;

/**
 * 성공사례 캐러셀. CSS scroll-snap 트랙 + 버튼/점은 scrollTo로만 움직인다.
 * 4.5초마다 다음 페이지로 자동 넘김. 마우스를 올린 동안과 터치 직후에만 멈추고,
 * 버튼을 눌러 넘기면 타이머를 처음부터 다시 센다(포커스로는 멈추지 않는다).
 * 탭이 숨겨지면 건너뛰고, reduced-motion이면 자동 넘김 자체를 하지 않는다.
 */
export function CaseCarousel({ cases }: { cases: SuccessCase[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ index: 0, perView: 3 });
  const [hovering, setHovering] = useState(false);
  const [touchedAt, setTouchedAt] = useState(0);

  const stepOf = useCallback((track: HTMLUListElement) => {
    const first = track.firstElementChild as HTMLElement | null;
    if (!first) return 1;
    return first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const s = stepOf(track);
      setPosition({ perView: Math.max(1, Math.round(track.clientWidth / s)), index: Math.round(track.scrollLeft / s) });
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [stepOf]);

  const { index, perView } = position;
  const pages = Math.max(1, Math.ceil(cases.length / perView));
  const page = Math.min(pages - 1, Math.round(index / perView));

  const goTo = useCallback(
    (cardIndex: number) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({ left: Math.max(0, cardIndex) * stepOf(track), behavior: "smooth" });
    },
    [stepOf],
  );

  // 자동 넘김 — page가 바뀔 때마다(수동이든 자동이든) 타이머를 새로 시작한다
  useEffect(() => {
    if (hovering) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sinceTouch = Date.now() - touchedAt;
    const delay = sinceTouch < TOUCH_RESUME_MS ? TOUCH_RESUME_MS - sinceTouch : AUTOPLAY_MS;
    const id = window.setTimeout(() => {
      if (document.hidden) return;
      goTo(((page + 1) % pages) * perView);
    }, delay);
    return () => window.clearTimeout(id);
  }, [hovering, touchedAt, page, pages, perView, goTo]);

  return (
    <div
      className="flex flex-col gap-8"
      role="region"
      aria-roledescription="carousel"
      aria-label="성공사례"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onTouchStart={() => setTouchedAt(Date.now())}
    >
      <div className="flex justify-end gap-2.5">
        <button
          type="button"
          aria-label="이전 사례"
          disabled={page === 0}
          onClick={() => goTo((page - 1) * perView)}
          className="flex size-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/12 disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          aria-label="다음 사례"
          disabled={page >= pages - 1}
          onClick={() => goTo((page + 1) * perView)}
          className="flex size-12 items-center justify-center rounded-full bg-white text-cobalt-700 transition-colors hover:bg-cobalt-50 disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <ul
        ref={trackRef}
        className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {cases.map((item, i) => (
          <li
            key={`${item.company}-${i}`}
            className="flex w-[84%] shrink-0 snap-start flex-col gap-4 rounded-3xl bg-white p-7 text-ink shadow-navy sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)]"
            aria-label={`${i + 1} / ${cases.length}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-semibold text-muted">
                {item.industry} · 연매출 {item.revenue}
              </span>
              <Pill tone="gold" size="sm">
                {item.duration} 소요
              </Pill>
            </div>
            <div className="font-display text-h3 font-extrabold">
              {item.product}
              <br />
              <span className="text-brand-strong">{item.amount}!</span>
            </div>
            <dl className="flex flex-col border-t border-line text-sm text-body">
              <div className="flex justify-between gap-4 border-b border-line/70 py-2.5">
                <dt className="text-slate-400">이슈</dt>
                <dd className="font-semibold text-ink">{item.issue}</dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-slate-400">성공일</dt>
                <dd className="font-semibold text-ink">{item.date}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <div className="flex justify-center gap-2" aria-hidden="true">
        {Array.from({ length: pages }, (_, p) => (
          <button
            key={p}
            type="button"
            tabIndex={-1}
            onClick={() => goTo(p * perView)}
            className={cn("h-1.5 rounded-full transition-[width,background-color] duration-300", p === page ? "w-7 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70")}
          />
        ))}
      </div>
    </div>
  );
}
