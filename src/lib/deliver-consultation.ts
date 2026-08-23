import type { ConsultationPayload } from "./consultation";
import { consultationHtml, consultationSubject, consultationText } from "./consultation-email";
import { insertConsultation, recordNotifyResult } from "./consultations-repo";
import { isDbConfigured } from "./db";

/**
 * 상담 신청 처리 — Neon에 저장하고 Resend로 알림 메일을 보낸다.
 *
 * 순서가 중요하다: 저장이 성공하면 사용자에게는 성공을 돌려준다.
 * 메일 발송 실패로 신청을 되돌리면 리드를 잃기 때문이다.
 * 실패한 메일은 consultations.notify_error에 남고 관리자 페이지에서 걸러 볼 수 있다.
 */
export type DeliverResult =
  | { ok: true; id: number; notified: boolean }
  | { ok: false; reason: "not-configured" | "storage" };

export type DeliverMeta = { ipHash: string | null; userAgent: string };

export async function deliverConsultation(payload: ConsultationPayload, meta: DeliverMeta): Promise<DeliverResult> {
  if (!isDbConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[consultation] DATABASE_URL 없음 — 개발 모드에서 콘솔에만 남깁니다:", payload);
      return { ok: true, id: 0, notified: false };
    }
    return { ok: false, reason: "not-configured" };
  }

  let id: number;
  try {
    id = await insertConsultation(payload, meta);
  } catch (error) {
    console.error("[consultation] 저장 실패:", error);
    return { ok: false, reason: "storage" };
  }

  const notifyError = await sendNotification(payload, id);
  await recordNotifyResult(id, notifyError);

  return { ok: true, id, notified: notifyError === null };
}

/**
 * 환경변수를 읽되 빈 문자열은 "설정 안 됨"으로 본다.
 * ??는 빈 값을 통과시키는데, Vercel 대시보드나 .env.example 복사로 키만 있고 값이 빈 경우가 흔하다.
 */
function env(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

const DEFAULT_FROM = "이지크레더블 상담신청 <onboarding@resend.dev>";

/** 성공하면 null, 실패하면 사유 문자열 */
async function sendNotification(payload: ConsultationPayload, id: number): Promise<string | null> {
  const apiKey = env("RESEND_API_KEY");
  const to = (env("CONSULTATION_NOTIFY_TO") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!apiKey || to.length === 0) return "알림 설정 없음 (RESEND_API_KEY / CONSULTATION_NOTIFY_TO)";

  try {
    const { Resend } = await import("resend");
    const { error } = await new Resend(apiKey).emails.send({
      from: env("CONSULTATION_NOTIFY_FROM") ?? DEFAULT_FROM,
      to,
      replyTo: env("CONSULTATION_REPLY_TO"),
      subject: consultationSubject(payload),
      html: consultationHtml(payload, id),
      text: consultationText(payload, id),
    });
    if (error) {
      console.error("[consultation] 알림 메일 실패:", error);
      return `${error.name}: ${error.message}`;
    }
    return null;
  } catch (error) {
    console.error("[consultation] 알림 메일 예외:", error);
    return error instanceof Error ? error.message : "알 수 없는 오류";
  }
}
