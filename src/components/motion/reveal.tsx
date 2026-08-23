"use client";

import { useEffect, useRef, type ComponentProps, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealTag = "div" | "section" | "article" | "li" | "ul" | "span" | "figure" | "header";

type RevealProps = {
  as?: RevealTag;
  variant?: "up" | "fade" | "scale";
  /** ms. 같은 그룹의 형제에게 순차 지연을 준다 */
  delay?: number;
  once?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentProps<"div">, "children" | "className">;

/**
 * 뷰포트 진입 시 나타나는 래퍼. 실제 전환은 globals.css의 [data-reveal] 규칙이 맡는다.
 * IntersectionObserver만 쓰므로 GSAP 없이도 가볍게 동작한다.
 */
export function Reveal({ as = "div", variant = "up", delay = 0, once = true, className, children, style, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.inview = "true";
            if (once) io.unobserve(el);
          } else if (!once) {
            el.dataset.inview = "false";
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const Tag = as as "div";
  const mergedStyle = delay ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties) : style;

  return (
    <Tag ref={ref} data-reveal={variant} className={cn(className)} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}
