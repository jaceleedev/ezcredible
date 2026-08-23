import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { consultationStatuses, getConsultation, listNotes, statusLabels } from "@/lib/consultations-repo";
import { formatKst } from "@/lib/format-date";
import { deleteConsultationAction, updateConsultationAction } from "../../actions";
import { fieldHint, fieldLabel } from "../../field-styles";
import { SelectField } from "../../select-field";
import { StatusBadge } from "../../status-badge";
import { SubmitButton } from "../../submit-button";
import { ChevronLeft, Phone } from "@/components/ui/icons";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-[8.5rem_1fr] sm:items-baseline sm:gap-4">
      <dt className="text-[13px] font-bold text-muted">{label}</dt>
      <dd className="text-[15px] leading-relaxed text-ink">{children}</dd>
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

  const sp = await searchParams;
  const saved = sp.saved === "1";
  const confirmingDelete = sp.confirm === "delete";

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm font-medium text-cobalt-600 hover:underline">
          <ChevronLeft size={15} />
          목록으로
        </Link>
        <StatusBadge status={row.status} />
      </div>

      <header className="mb-7">
        <h1 className="font-display text-h3 text-ink">
          {row.company} · {row.name} {row.position}
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          접수번호 {row.id} · {formatKst(row.createdAt)}
        </p>
      </header>

      {saved && (
        <p className="mb-5 rounded-xl border border-cobalt-200 bg-cobalt-50 px-4 py-3 text-sm font-medium text-cobalt-700">저장했습니다.</p>
      )}

      {row.notifyError && (
        <p className="mb-5 rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-sm text-gold-700">
          알림 메일이 발송되지 않았습니다 — {row.notifyError}
        </p>
      )}

      <dl className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
        <Field label="희망 솔루션">{row.topicLabel}</Field>
        <Field label="이름">
          {row.name} {row.position}
        </Field>
        <Field label="연락처">
          <a
            href={`tel:${row.phone.replace(/-/g, "")}`}
            className="inline-flex items-center gap-1.5 font-semibold text-cobalt-600 tabular-nums hover:underline"
          >
            <Phone size={15} />
            {row.phone}
          </a>
        </Field>
        <Field label="회사명">{row.company}</Field>
        <Field label="사업자등록번호">
          <span className="tabular-nums">{row.bizNo}</span>
        </Field>
        <Field label="문의 내용">
          {row.message ? <span className="whitespace-pre-wrap">{row.message}</span> : <span className="text-muted">—</span>}
        </Field>
        <Field label="알림 메일">
          {row.notifiedAt ? formatKst(row.notifiedAt) : <span className="text-muted">발송되지 않음</span>}
        </Field>
      </dl>

      {/* 상태 변경과 메모 추가를 한 번에 — 통화 직후 한 동작으로 끝나도록 */}
      <form action={updateConsultationAction} className="mt-8 rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6">
        <h2 className="mb-5 font-display text-base font-extrabold text-ink">상태 변경 · 메모</h2>
        <input type="hidden" name="id" value={row.id} />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="sm:w-52 sm:shrink-0">
            <label htmlFor="status" className={fieldLabel}>
              진행 상태
            </label>
            <SelectField id="status" name="status" defaultValue={row.status}>
              {consultationStatuses.map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status]}
                </option>
              ))}
            </SelectField>
          </div>

          <div className="min-w-0 flex-1">
            <label htmlFor="note" className={fieldLabel}>
              메모 추가
            </label>
            <textarea
              id="note"
              name="note"
              rows={4}
              maxLength={2000}
              placeholder="통화 내용, 요청 자금 규모, 다음 할 일 등 자유롭게 적어 주세요. 저장하면 아래에 날짜와 함께 쌓입니다."
              className="w-full resize-y rounded-xl border border-line-strong bg-white px-4 py-3 text-[15px] leading-relaxed text-ink transition outline-none placeholder:text-slate-400 focus:border-cobalt-500 focus:ring-4 focus:ring-cobalt-100"
            />
            <p className={fieldHint}>비워 두고 저장하면 진행 상태만 바뀝니다.</p>
          </div>
        </div>

        <div className="mt-5 border-t border-line pt-5">
          <SubmitButton>저장</SubmitButton>
        </div>
      </form>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-lg font-extrabold text-ink">
          상담 경과 <span className="align-middle text-sm font-semibold text-muted">{notes.length}건</span>
        </h2>

        {notes.length === 0 ? (
          <p className="rounded-2xl border border-line bg-white px-4 py-10 text-center text-sm text-muted">
            아직 기록된 메모가 없습니다.
          </p>
        ) : (
          <ol className="flex flex-col gap-3">
            {notes.map((note) => (
              <li key={note.id} className="rounded-2xl border border-line bg-white px-5 py-4 shadow-soft">
                <time dateTime={note.createdAt} className="block text-xs font-bold text-cobalt-600 tabular-nums">
                  {formatKst(note.createdAt)}
                </time>
                <p className="mt-2 text-[15px] leading-relaxed whitespace-pre-wrap text-ink">{note.body}</p>
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* 삭제 — 되돌릴 수 없어서 확인 단계를 한 번 거친다(쿼리 파라미터라 JS 없이 동작한다) */}
      <section className="mt-12 rounded-2xl border border-line bg-white p-5 sm:p-6">
        <h2 className="font-display text-base font-extrabold text-ink">접수 삭제</h2>
        {confirmingDelete ? (
          <>
            <p className="mt-2 text-sm leading-relaxed text-body">
              <strong className="font-bold text-rose-600">접수번호 {row.id}</strong>와 메모 {notes.length}건을 완전히 지웁니다. 되돌릴 수 없습니다.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <form action={deleteConsultationAction}>
                <input type="hidden" name="id" value={row.id} />
                <SubmitButton className="bg-rose-600 hover:bg-rose-700" pendingLabel="삭제 중…">
                  삭제합니다
                </SubmitButton>
              </form>
              <Link
                href={`/admin/${row.id}`}
                className="rounded-xl border border-line-strong px-5 py-3 text-sm font-semibold text-body transition hover:bg-soft"
              >
                취소
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm leading-relaxed text-body">
              보통은 삭제 대신 진행 상태를 <strong className="font-semibold">스팸</strong>이나 <strong className="font-semibold">실패</strong>로 바꿔 두시면 됩니다. 개인정보 파기 요청처럼 기록 자체를 없애야 할 때만 삭제하세요.
            </p>
            <Link
              href={`/admin/${row.id}?confirm=delete`}
              className="mt-4 inline-flex rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-100"
            >
              이 접수 삭제하기
            </Link>
          </>
        )}
      </section>
    </>
  );
}
