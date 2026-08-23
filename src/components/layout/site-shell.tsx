import type { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { MotionRoot } from "@/components/motion/motion-root";

/**
 * 공개 사이트 공통 셸 — 헤더 + 본문 + 푸터.
 * (site) 레이아웃과 전역 404가 같이 쓴다. 전역 404는 루트 레이아웃(셸 없음) 안에서
 * 렌더되기 때문에 스스로 이 셸을 입어야 한다.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <MotionRoot />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
