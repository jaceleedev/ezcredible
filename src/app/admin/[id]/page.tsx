import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { consultationStatuses, getConsultation, listNotes, statusLabels } from "@/lib/consultations-repo";
import { formatKst } from "@/lib/format-date";
import { updateConsultationAction } from "../actions";
import { StatusBadge } from "../status-badge";
import { SubmitButton } from "../submit-button";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-line px-4 py-3.5 last:border-b-0 sm:grid-cols-[8rem_1fr] sm:items-baseline sm:gap-4">
      <dt className="text-sm font-semibold text-muted">{label}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}

export default async function ConsultationDetailPage({ params, searchParams }: PageProps<"/admin/[id]">) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) notFound();

  const [row, notes] = await Promise.all([getConsultation(numericId), listNotes(numericId)]);
  if (!row) notFound();

  const saved = (await searchParams).saved === "1";

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link href="/admin" className="text-sm text-cobalt-600 hover:underline">
          ← 목록으로
        </Link>
        <StatusBadge status={row.status} />
      </div>

      <h1 className="font-display text-h3 text-ink">
        {row.company} · {row.name} {row.position}
      </h1>
      <p className="mt-1 mb-6 text-sm text-muted">
        접수번호 {row.id} · {formatKst(row.createdAt)}
      </p>

      {saved && (
        <p className="mb-5 rounded-xl border border-cobalt-200 bg-cobalt-50 px-4 py-3 text-sm text-cobalt-700">저장했습니다.</p>
      )}

      {row.notifyError && (
        <p className="mb-5 rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-sm text-gold-700">
          알림 메일이 발송되지 않았습니다 — {row.notifyError}
        </p>
      )}

      <dl className="overflow-hidden rounded-xl border border-line bg-white">
        <Field label="희망 솔루션">{row.topicLabel}</Field>
        <Field label="이름">
          {row.name} {row.position}
        </Field>
        <Field label="연락처">
          <a href={`tel:${row.phone.replace(/-/g, "")}`} className="font-semibold text-cobalt-600 hover:underline">
            {row.phone}
          </a>
        </Field>
        <Field label="회사명">{row.company}</Field>
        <Field label="사업자등록번호">{row.bizNo}</Field>
        <Field label="문의 내용">
          {row.message ? <span className="whitespace-pre-wrap">{row.message}</span> : <span className="text-muted">—</span>}
        </Field>
        <Field label="알림 메일">
          {row.notifiedAt ? formatKst(row.notifiedAt) : <span className="text-muted">발송되지 않음</span>}
        </Field>
      </dl>

      {/* 상태 변경과 메모 추가를 한 번에 — 통화 직후 한 동작으로 끝나도록 */}
      <form action={updateConsultationAction} className="mt-8 space-y-4">
        <input type="hidden" name="id" value={row.id} />

        <div>
          <label htmlFor="status" className="mb-2 block text-sm font-semibold text-ink">
            진행 상태
          </label>
          <select
            id="status"
            name="status"
            defaultValue={row.status}
            className="w-full rounded-xl border border-line-strong bg-white px-4 py-3 text-ink outline-none focus:border-cobalt-500 focus:ring-2 focus:ring-cobalt-200 sm:w-48"
          >
            {consultationStatuses.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="note" className="mb-2 block text-sm font-semibold text-ink">
            메모 추가
          </label>
          <textarea
            id="note"
            name="note"
            rows={4}
            maxLength={2000}
            placeholder="통화 내용, 요청 자금 규모, 다음 할 일 등 자유롭게 적어 주세요. 저장하면 아래에 날짜와 함께 쌓입니다."
            className="w-full rounded-xl border border-line-strong bg-white px-4 py-3 text-ink outline-none focus:border-cobalt-500 focus:ring-2 focus:ring-cobalt-200"
          />
          <p className="mt-1.5 text-xs text-muted">비워 두고 저장하면 진행 상태만 바뀝니다.</p>
        </div>

        <SubmitButton>저장</SubmitButton>
      </form>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-h3 text-ink">
          상담 경과 <span className="align-middle text-base font-normal text-muted">{notes.length}건</span>
        </h2>

        {notes.length === 0 ? (
          <p className="rounded-xl border border-line bg-soft-2 px-4 py-8 text-center text-sm text-muted">
            아직 기록된 메모가 없습니다.
          </p>
        ) : (
          <ol className="space-y-3">
            {notes.map((note) => (
              <li key={note.id} className="rounded-xl border border-line bg-white px-4 py-3.5">
                <time dateTime={note.createdAt} className="block text-xs font-semibold text-cobalt-600 tabular-nums">
                  {formatKst(note.createdAt)}
                </time>
                <p className="mt-1.5 leading-relaxed whitespace-pre-wrap text-ink">{note.body}</p>
              </li>
            ))}
          </ol>
        )}
      </section>
    </>
  );
}
