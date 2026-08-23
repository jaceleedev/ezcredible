import type { Metadata } from "next";

/** 관리자 페이지는 검색엔진에 노출하지 않는다 (robots.ts에서도 차단) */
export const metadata: Metadata = {
  title: "상담 관리",
  robots: { index: false, follow: false, nocache: true },
  // 루트의 자기참조 canonical("/")을 물려받지 않게 끊는다 — noindex와 같이 쓰면 모순된 신호다
  alternates: { canonical: null },
};

/**
 * /admin 공통 레이아웃은 메타데이터만 맡는다.
 * 화면 셸은 로그인 전후가 달라서 아래에서 나뉜다:
 * - (dashboard)/layout.tsx — 사이드바 대시보드 (인증된 화면)
 * - login/page.tsx — 가운데 정렬 로그인 카드
 */
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return children;
}
