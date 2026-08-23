import { normalizeConsultation, validateConsultation, type ConsultationInput } from "@/lib/consultation";
import { deliverConsultation } from "@/lib/deliver-consultation";

/** IP당 10분에 5건 — 서버 인스턴스 메모리 기준의 가벼운 제한 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

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

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (tooMany(ip)) {
    return Response.json({ ok: false, message: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요." }, { status: 429 });
  }

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

  const errors = validateConsultation(input);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, message: "입력 내용을 확인해 주세요.", errors }, { status: 422 });
  }

  const payload = { ...normalizeConsultation(input), submittedAt: new Date().toISOString() };
  const result = await deliverConsultation(payload);

  if (!result.ok) {
    const message =
      result.reason === "not-configured"
        ? "상담 접수 시스템을 준비 중입니다. 잠시 후 다시 시도해 주세요."
        : "접수 중 문제가 생겼습니다. 잠시 후 다시 시도해 주세요.";
    return Response.json({ ok: false, message }, { status: 503 });
  }

  return Response.json({ ok: true });
}
