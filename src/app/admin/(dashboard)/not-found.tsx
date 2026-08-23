import Link from "next/link";

/** 대시보드 안에서 notFound()가 던져졌을 때 — 없는 접수번호 등 */
export default function AdminNotFound() {
  return (
    <div className="rounded-xl border border-line bg-white px-6 py-16 text-center">
      <p className="font-display text-xl font-extrabold text-ink">접수 내역을 찾을 수 없습니다</p>
      <p className="mt-2 text-sm text-muted">삭제됐거나 잘못된 접수번호입니다.</p>
      <Link
        href="/admin"
        className="mt-6 inline-flex rounded-xl bg-cobalt-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cobalt-700"
      >
        목록으로 돌아가기
      </Link>
    </div>
  );
}
