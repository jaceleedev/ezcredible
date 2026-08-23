"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { formatBizNo, formatPhone, isTopic, validateConsultation, type ConsultationErrors, type ConsultationField, type ConsultationInput } from "@/lib/consultation";
import { consultationTopics } from "@/content/site";
import { consentSummary } from "@/content/pages/privacy";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "@/components/ui/icons";

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success" } | { kind: "error"; message: string };

const empty: ConsultationInput = { topic: "", name: "", position: "", phone: "", company: "", bizNo: "", message: "", consent: false, website: "" };

const inputClass =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] focus:border-brand focus:outline-none focus:ring-4 focus:ring-cobalt-100 aria-invalid:border-red-400 aria-invalid:focus:ring-red-100";

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[14px] font-bold text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-brand">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[13px] font-medium text-red-600">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="text-[13px] text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

/** 상담 신청 폼 — 검증은 src/lib/consultation.ts, 전송은 /api/consultations */
export function ConsultationForm() {
  const params = useSearchParams();
  const preset = params.get("topic") ?? "";
  const uid = useId();
  const [values, setValues] = useState<ConsultationInput>({ ...empty, topic: isTopic(preset) ? preset : "" });
  const [errors, setErrors] = useState<ConsultationErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ConsultationField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const fieldId = (name: string) => `${uid}-${name}`;

  const set = (name: ConsultationField, value: string | boolean) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validateConsultation(next));
  };

  /** 포커스가 빠질 때 형식을 정리하고 그 필드부터 오류를 보여 준다 */
  const blur = (name: ConsultationField) => {
    const next = name === "phone" ? { ...values, phone: formatPhone(values.phone) } : name === "bizNo" ? { ...values, bizNo: formatBizNo(values.bizNo) } : values;
    setValues(next);
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validateConsultation(next));
  };

  const onText = (name: ConsultationField) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => set(name, e.target.value);

  const shown = (name: ConsultationField) => (touched[name] ? errors[name] : undefined);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const normalized = { ...values, phone: formatPhone(values.phone), bizNo: formatBizNo(values.bizNo) };
    const nextErrors = validateConsultation(normalized);
    setValues(normalized);
    setErrors(nextErrors);
    setTouched({ topic: true, name: true, position: true, phone: true, company: true, bizNo: true, message: true, consent: true });
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0]!;
      document.getElementById(fieldId(first))?.focus();
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(normalized),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: ConsultationErrors };
      if (res.ok && data.ok) {
        setStatus({ kind: "success" });
        return;
      }
      if (data.errors) setErrors(data.errors);
      setStatus({ kind: "error", message: data.message ?? "접수 중 문제가 생겼습니다. 잠시 후 다시 시도해 주세요." });
    } catch {
      setStatus({ kind: "error", message: "네트워크 연결을 확인한 뒤 다시 시도해 주세요." });
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" aria-live="polite" className="flex flex-col items-start gap-5 rounded-3xl border border-line bg-white p-8 shadow-card md:p-10">
        <span className="flex size-14 items-center justify-center rounded-full bg-cobalt-50 text-brand-strong">
          <Check size={28} />
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="text-h3">상담 신청이 접수되었습니다</h3>
          <p className="text-base leading-relaxed text-body">
            담당자가 상담 내용을 검토한 뒤 <strong className="font-bold text-ink">{values.phone}</strong>으로 연락드리겠습니다. 평일 09:00 ~ 18:00에 순서대로 처리합니다.
          </p>
        </div>
        <Button href="/" variant="outline">
          홈으로 돌아가기
        </Button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-6 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8 md:p-10">
      <Field id={fieldId("topic")} label="희망 솔루션" required error={shown("topic")}>
        <div className="relative">
          <select
            id={fieldId("topic")}
            name="topic"
            value={values.topic}
            onChange={onText("topic")}
            onBlur={() => blur("topic")}
            aria-invalid={!!shown("topic") || undefined}
            aria-describedby={shown("topic") ? `${fieldId("topic")}-error` : undefined}
            className={cn(inputClass, "appearance-none pr-11", !values.topic && "text-muted/70")}
          >
            <option value="">선택해 주세요</option>
            {consultationTopics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>
          <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
        </div>
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fieldId("name")} label="이름" required error={shown("name")}>
          <input id={fieldId("name")} name="name" type="text" autoComplete="name" maxLength={30} value={values.name} onChange={onText("name")} onBlur={() => blur("name")} aria-invalid={!!shown("name") || undefined} aria-describedby={shown("name") ? `${fieldId("name")}-error` : undefined} placeholder="홍길동" className={inputClass} />
        </Field>
        <Field id={fieldId("position")} label="직책" required error={shown("position")}>
          <input id={fieldId("position")} name="position" type="text" autoComplete="organization-title" maxLength={30} value={values.position} onChange={onText("position")} onBlur={() => blur("position")} aria-invalid={!!shown("position") || undefined} aria-describedby={shown("position") ? `${fieldId("position")}-error` : undefined} placeholder="대표 · 재무팀장 등" className={inputClass} />
        </Field>
      </div>

      <Field id={fieldId("phone")} label="연락처" required error={shown("phone")} hint="담당자가 휴대전화로 연락드립니다.">
        <input id={fieldId("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={13} value={values.phone} onChange={onText("phone")} onBlur={() => blur("phone")} aria-invalid={!!shown("phone") || undefined} aria-describedby={shown("phone") ? `${fieldId("phone")}-error` : `${fieldId("phone")}-hint`} placeholder="010-1234-5678" className={inputClass} />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fieldId("company")} label="회사명" required error={shown("company")}>
          <input id={fieldId("company")} name="company" type="text" autoComplete="organization" maxLength={60} value={values.company} onChange={onText("company")} onBlur={() => blur("company")} aria-invalid={!!shown("company") || undefined} aria-describedby={shown("company") ? `${fieldId("company")}-error` : undefined} placeholder="(주)회사명" className={inputClass} />
        </Field>
        <Field id={fieldId("bizNo")} label="사업자등록번호" required error={shown("bizNo")}>
          <input id={fieldId("bizNo")} name="bizNo" type="text" inputMode="numeric" maxLength={12} value={values.bizNo} onChange={onText("bizNo")} onBlur={() => blur("bizNo")} aria-invalid={!!shown("bizNo") || undefined} aria-describedby={shown("bizNo") ? `${fieldId("bizNo")}-error` : undefined} placeholder="123-45-67890" className={inputClass} />
        </Field>
      </div>

      <Field id={fieldId("message")} label="문의 내용" error={shown("message")} hint="선택 사항입니다. 필요한 자금 규모나 시기, 현재 상황을 적어 주시면 상담이 빨라집니다.">
        <textarea id={fieldId("message")} name="message" rows={4} maxLength={1000} value={values.message} onChange={onText("message")} onBlur={() => blur("message")} aria-invalid={!!shown("message") || undefined} aria-describedby={shown("message") ? `${fieldId("message")}-error` : `${fieldId("message")}-hint`} placeholder="예) 운전자금 3억 원 정도를 올해 안에 확보하고 싶습니다." className={cn(inputClass, "h-auto resize-y py-3 leading-relaxed")} />
      </Field>

      {/* 허니팟 — 사람에게는 보이지 않는다 */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={fieldId("website")}>Website</label>
        <input id={fieldId("website")} name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => setValues((prev) => ({ ...prev, website: e.target.value }))} />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-soft-2 p-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => {
              setTouched((prev) => ({ ...prev, consent: true }));
              set("consent", e.target.checked);
              setErrors(validateConsultation({ ...values, consent: e.target.checked }));
            }}
            aria-invalid={!!shown("consent") || undefined}
            aria-describedby={`${fieldId("consent")}-summary${shown("consent") ? ` ${fieldId("consent")}-error` : ""}`}
            className="mt-0.5 size-5 shrink-0 rounded border-line accent-[#2e5ad6]"
          />
          <span className="text-[15px] font-bold text-ink">
            상담을 위한 개인정보 수집 및 이용에 동의합니다.
            <span aria-hidden="true" className="ml-1 text-brand">
              *
            </span>
          </span>
        </label>
        <dl id={`${fieldId("consent")}-summary`} className="grid grid-cols-[72px_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-[13px] leading-relaxed text-body">
          <dt className="font-bold text-cobalt-700">수집 항목</dt>
          <dd>{consentSummary.items}</dd>
          <dt className="font-bold text-cobalt-700">이용 목적</dt>
          <dd>{consentSummary.purpose}</dd>
          <dt className="font-bold text-cobalt-700">보유 기간</dt>
          <dd>{consentSummary.retention}</dd>
        </dl>
        <p className="text-[13px] leading-relaxed text-muted">
          {consentSummary.refusal} 자세한 내용은{" "}
          <Link href="/support/privacy-policy" target="_blank" rel="noreferrer" className="font-semibold text-cobalt-700 underline underline-offset-2">
            개인정보처리방침
          </Link>
          을 확인해 주세요.
        </p>
        {shown("consent") && (
          <p id={`${fieldId("consent")}-error`} role="alert" className="text-[13px] font-medium text-red-600">
            {errors.consent}
          </p>
        )}
      </div>

      {status.kind === "error" && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] font-medium text-red-700">
          {status.message}
        </p>
      )}

      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto sm:self-end" icon={submitting ? "none" : "arrow"}>
        {submitting ? "접수 중…" : "상담 신청하기"}
      </Button>
    </form>
  );
}
