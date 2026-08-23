import { SiteShell } from "@/components/layout/site-shell";

/** 공개 사이트 라우트 그룹 — 관리자(/admin)는 이 셸을 쓰지 않는다 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteShell>{children}</SiteShell>;
}
