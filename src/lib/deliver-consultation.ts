import type { ConsultationPayload } from "./consultation";

/**
 * 상담 신청 전달. 전송 방식은 맨 마지막에 정하기로 했으므로(Jace),
 * 지금은 환경변수 CONSULTATION_WEBHOOK_URL이 있으면 그 주소로 JSON POST,
 * 없으면 개발 환경에서는 콘솔에 남기고 성공 처리, 프로덕션에서는 "준비 중"으로 실패시킨다.
 *
 * TODO(last): 이메일(Resend 등)·시트·슬랙 중 확정되면 여기만 바꾼다. 폼·API는 그대로.
 */
export async function deliverConsultation(payload: ConsultationPayload): Promise<{ ok: true } | { ok: false; reason: "not-configured" | "upstream" }> {
  const url = process.env.CONSULTATION_WEBHOOK_URL;

  if (url) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ source: "ezcredible.com", ...payload }),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) return { ok: false, reason: "upstream" };
      return { ok: true };
    } catch {
      return { ok: false, reason: "upstream" };
    }
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[consultation] 전송 설정 없음 — 개발 모드에서 콘솔에만 남깁니다:", payload);
    return { ok: true };
  }

  return { ok: false, reason: "not-configured" };
}
