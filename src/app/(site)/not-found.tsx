import type { Metadata } from "next";
import { NotFoundView } from "@/components/layout/not-found-view";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false, follow: true },
  // 404가 루트의 canonical("/")을 물려받으면 "이 없는 페이지의 대표 URL은 홈"이라는 모순 신호가 된다
  alternates: { canonical: null },
};

/** (site) 세그먼트 안에서 notFound()가 던져졌을 때 — 셸은 (site) 레이아웃이 이미 입혀 준다 */
export default function NotFound() {
  return <NotFoundView />;
}
