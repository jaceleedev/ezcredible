import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { consultationStatuses, countByStatus, isConsultationStatus, listConsultations, statusLabels } from "@/lib/consultations-repo";
import { formatKst } from "@/lib/format-date";
import { isDbConfigured } from "@/lib/db";
import { cn } from "@/lib/cn";
import { ChevronRight } from "@/components/ui/icons";
import { StatusBadge } from "../status-badge";

const PER_PAGE = 20;

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const sp = await searchParams;
  const statusParam = typeof sp.status === "string" && isConsultationStatus(sp.status) ? sp.status : null;
  const page = Math.max(1, Number(typeof sp.page === "string" ? sp.page : "1") || 1);
  const deleted = sp.deleted === "1";

  if (!isDbConfigured()) {
    return (
      <p className="rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-sm text-gold-700">
        DATABASE_URL 환경변수가 설정되지 않았습니다.
      </p>
    );
  }

  const [{ rows, total }, counts] = await Promise.all([
    listConsultations({ status: statusParam, page, perPage: PER_PAGE }),
    countByStatus(),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const allCount = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const newCount = counts.new ?? 0;

  const tabs = [
    { value: null, label: "전체", count: allCount },
    ...consultationStatuses.map((s) => ({ value: s, label: statusLabels[s], count: counts[s] ?? 0 })),
  ];

  function href(next: { status?: string | null; page?: number }) {
    const params = new URLSearchParams();
    const status = next.status === undefined ? statusParam : next.status;
    if (status) params.set("status", status);
    if (next.page && next.page > 1) params.set("page", String(next.page));
    const query = params.toString();
    return query ? `/admin?${query}` : "/admin";
  }

  return (
    <>
      <header className="mb-7">
        <h1 className="font-display text-h3 text-ink">상담 신청</h1>
        <p className="mt-1.5 text-sm text-muted">
          전체 {allCount}건
          {newCount > 0 && (
            <>
              {" · "}
              <span className="font-semibold text-cobalt-600">신규 {newCount}건</span>
            </>
          )}
        </p>
      </header>

      {deleted && (
        <p className="mb-5 rounded-xl border border-line-strong bg-white px-4 py-3 text-sm font-medium text-body">접수를 삭제했습니다.</p>
      )}

      <nav aria-label="상태 필터" className="mb-5 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const active = tab.value === statusParam;
          return (
            <Link
              key={tab.label}
              href={href({ status: tab.value, page: 1 })}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition",
                active
                  ? "bg-cobalt-600 text-white shadow-[0_6px_16px_-8px_rgba(46,90,214,0.9)]"
                  : "border border-line-strong bg-white text-body hover:border-cobalt-200 hover:bg-soft hover:text-brand-strong",
              )}
            >
              {tab.label}
              <span className={cn("tabular-nums", active ? "text-cobalt-100" : "text-muted")}>{tab.count}</span>
            </Link>
          );
        })}
      </nav>

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-line bg-white px-4 py-14 text-center text-sm text-muted">
          {statusParam ? `'${statusLabels[statusParam]}' 상태인 상담이 없습니다.` : "아직 접수된 상담이 없습니다."}
        </p>
      ) : (
        <ul className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
          {rows.map((row) => (
            <li key={row.id} className="border-b border-line last:border-b-0">
              <Link
                href={`/admin/${row.id}`}
                className="group grid gap-1.5 px-5 py-4 transition hover:bg-soft-2 sm:grid-cols-[10rem_minmax(0,1fr)_9rem_5rem_1rem] sm:items-center sm:gap-4"
              >
                <span className="text-xs text-muted tabular-nums sm:text-[13px]">{formatKst(row.createdAt)}</span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-ink">
                    {row.company} · {row.name} {row.position}
                    {row.notifyError && (
                      <span title="알림 메일 실패" className="ml-1.5 text-gold-500">
                        ⚠
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted">{row.topicLabel}</span>
                </span>
                <span className="text-sm font-medium text-body tabular-nums">{row.phone}</span>
                <StatusBadge status={row.status} className="justify-self-start sm:justify-self-end" />
                <ChevronRight size={16} className="hidden text-slate-300 transition group-hover:text-cobalt-500 sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <nav aria-label="페이지" className="mt-6 flex items-center justify-center gap-2 text-sm">
          {page > 1 && (
            <Link
              href={href({ page: page - 1 })}
              className="rounded-xl border border-line-strong bg-white px-3.5 py-2 font-medium text-body transition hover:bg-soft"
            >
              이전
            </Link>
          )}
          <span className="px-2 text-muted tabular-nums">
            {page} / {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={href({ page: page + 1 })}
              className="rounded-xl border border-line-strong bg-white px-3.5 py-2 font-medium text-body transition hover:bg-soft"
            >
              다음
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
