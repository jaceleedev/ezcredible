import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { Logo } from "@/components/ui/logo";
import { ArrowUpRight, ListCheck } from "@/components/ui/icons";
import { logoutAction } from "../actions";

/** 사이드바·모바일 바 공용 — 사이트로 나가는 링크 + 로그아웃 */
function ShellActions({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "flex items-center gap-1.5" : "flex flex-col gap-1.5"}>
      <Link
        href="/"
        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
      >
        <ArrowUpRight size={15} className="shrink-0" />
        {compact ? <span className="sr-only">사이트로 이동</span> : "사이트로 이동"}
      </Link>
      <form action={logoutAction} className={compact ? "" : "w-full"}>
        <button
          type="submit"
          className={
            compact
              ? "rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
              : "w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
          }
        >
          로그아웃
        </button>
      </form>
    </div>
  );
}

/**
 * 관리자 대시보드 셸 — 사이트 헤더·푸터 없이 전용 사이드바(모바일은 상단 바)를 쓴다.
 * 인증 확인은 각 페이지에도 있지만(소프트 내비게이션에서 레이아웃은 다시 렌더되지 않는다),
 * 여기서도 먼저 걸러 로그인 전에는 셸 자체가 그려지지 않게 한다.
 */
export default async function AdminDashboardLayout({ children }: LayoutProps<"/admin">) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      {/* 데스크탑 사이드바 */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col justify-between bg-navy-deep p-6 text-white lg:flex">
        <div className="flex flex-col gap-8">
          <Link href="/admin" className="flex items-center gap-2.5 px-1" aria-label="상담 관리 홈">
            <Logo variant="mark" tone="white" alt="" className="h-5" />
            <span className="font-sans text-[15px] font-bold tracking-tight">(주)이지크레더블</span>
          </Link>
          <nav aria-label="관리자 메뉴" className="flex flex-col gap-1.5">
            <div className="px-3 pb-1 text-[11px] font-bold tracking-[0.14em] text-white/40">상담 관리</div>
            <Link href="/admin" className="flex items-center gap-2.5 rounded-xl bg-white/12 px-3 py-2.5 text-sm font-semibold text-white">
              <ListCheck size={16} className="shrink-0 text-cobalt-300" />
              상담 신청
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <ShellActions />
          <p className="border-t border-white/10 px-1 pt-4 text-[11px] leading-relaxed text-white/35">(주)이지크레더블 내부 페이지</p>
        </div>
      </aside>

      {/* 모바일 상단 바 */}
      <header className="flex h-16 items-center justify-between bg-navy-deep px-4 text-white sm:px-6 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2.5" aria-label="상담 관리 홈">
          <Logo variant="mark" tone="white" alt="" className="h-5" />
          <span className="font-sans text-[15px] font-bold tracking-tight">상담 관리</span>
        </Link>
        <ShellActions compact />
      </header>

      <div className="min-w-0 flex-1 bg-soft-2">
        <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">{children}</div>
      </div>
    </div>
  );
}
