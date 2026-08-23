"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * 모션 기반. Lenis 스무스 스크롤을 GSAP 티커에 태워 ScrollTrigger와 동기화한다.
 * prefers-reduced-motion이면 Lenis를 켜지 않고, 리빌도 CSS에서 즉시 표시된다.
 * html.has-motion 은 JS가 살아 있다는 표시 — 리빌 숨김은 이 클래스 아래서만 동작한다.
 */
export function SmoothScroll() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-motion");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power3.out", duration: 0.85 });

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      anchors: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
