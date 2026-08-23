import { normalizeConsultation, validateConsultation, type ConsultationInput } from "@/lib/consultation";
import { countRecentByIpHash, hashIp } from "@/lib/consultations-repo";
import { deliverConsultation } from "@/lib/deliver-consultation";

/**
 * 같은 IP에서 10분에 5건. 서버리스는 인스턴스마다 메모리가 따로라 인메모리 카운트가
 * 사실상 무력하므로 저장된 신청 건수(ip_hash 기준)로 센다.
 */
const WINDOW_SECONDS = 10 * 60;
const MAX_PER_WINDOW = 5;

function str(value: unknown, max = 2000) {
  return typeof value === "string" ? value.slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, message: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  // 허니팟 — 채워져 있으면 봇으로 보고 조용히 성공 응답
  if (str(body.website)) return Response.json({ ok: true });

  const input: ConsultationInput = {
    topic: str(body.topic, 40),
    name: str(body.name, 100),
    position: str(body.position, 100),
    phone: str(body.phone, 40),
    company: str(body.company, 200),
    bizNo: str(body.bizNo, 20),
    message: str(body.message, 2000),
    consent: body.consent === true,
  };

  // 검증을 먼저 — 형식이 틀린 요청에 DB를 왕복하지 않는다
  const errors = validateConsultation(input);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, message: "입력 내용을 확인해 주세요.", errors }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const ipHash = await hashIp(ip);

  if (ipHash) {
    try {
      if ((await countRecentByIpHash(ipHash, WINDOW_SECONDS)) >= MAX_PER_WINDOW) {
        return Response.json({ ok: false, message: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요." }, { status: 429 });
      }
    } catch (error) {
      // 카운트 실패로 정상 신청을 막지 않는다
      console.error("[consultation] 남용 확인 실패:", error);
    }
  }

  const payload = { ...normalizeConsultation(input), submittedAt: new Date().toISOString() };
  const result = await deliverConsultation(payload, {
    ipHash,
    userAgent: str(request.headers.get("user-agent") ?? "", 500),
  });

  if (!result.ok) {
    const message =
      result.reason === "not-configured"
        ? "상담 접수 시스템을 준비 중입니다. 잠시 후 다시 시도해 주세요."
        : "접수 중 문제가 생겼습니다. 잠시 후 다시 시도해 주세요.";
    return Response.json({ ok: false, message }, { status: 503 });
  }

  return Response.json({ ok: true });
}
