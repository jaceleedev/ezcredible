"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  value: number;
  /** ms */
  duration?: number;
  /** 연도처럼 천 단위 콤마 없이 (서버 컴포넌트에서 함수를 넘길 수 없어 불리언으로 받는다) */
  plain?: boolean;
};

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * 보이는 순간 0에서 value까지 세어 올라가는 숫자.
 * 서버 렌더에는 최종값이 찍히므로 검색엔진과 무JS 환경도 숫자를 본다.
 */
export function Counter({ value, duration = 1400, plain = false }: CounterProps) {
  const format = (n: number) => (plain ? String(n) : n.toLocaleString("ko-KR"));
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setShown(Math.round(value * easeOutExpo(t)));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return <span ref={ref}>{format(shown)}</span>;
}
