import type { Metadata } from "next";

/** 관리자 페이지는 검색엔진에 노출하지 않는다 (robots.ts에서도 차단) */
export const metadata: Metadata = {
  title: "상담 관리",
  robots: { index: false, follow: false, nocache: true },
  // 루트의 자기참조 canonical("/")을 물려받지 않게 끊는다 — noindex와 같이 쓰면 모순된 신호다
  alternates: { canonical: null },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  // 헤더가 fixed(72px, lg에서 88px)라 상단 여백으로 직접 비켜준다.
  // 서브페이지는 배너가 그 자리를 채우지만 관리자 화면은 배너가 없어 제목이 헤더에 가린다.
  return <div className="mx-auto w-full max-w-5xl px-5 pt-28 pb-14 sm:px-8 lg:pt-36 lg:pb-20">{children}</div>;
}
