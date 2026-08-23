import { cookies } from "next/headers";
import { hmacHex, timingSafeEqual } from "./crypto";

/**
 * 관리자 인증 — 단일 비밀번호 + HMAC 서명 쿠키. 사용자가 1~2명인 내부 페이지라
 * 계정 테이블 없이 환경변수 두 개(ADMIN_PASSWORD, ADMIN_SESSION_SECRET)로 처리한다.
 * Vercel의 Password Protection은 Pro 전용이라 쓸 수 없다.
 */
const COOKIE_NAME = "ezc_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7일

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export async function createAdminSession() {
  const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
  const token = `${expiresAt}.${await hmacHex(sessionSecret(), String(expiresAt))}`;
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function destroyAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  // cookies()를 무조건 먼저 읽는다. 이 호출이 라우트를 "요청 시 렌더"로 만들기 때문이다.
  // 환경변수 유무로 먼저 분기하면 빌드 시점에 cookies()에 닿지 않아 페이지가 정적으로 굳고,
  // 로그인 화면이 "환경변수 없음" 상태로 프리렌더된 채 배포된다(실제로 그랬다).
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!isAdminConfigured() || !token) return false;

  const separator = token.indexOf(".");
  if (separator < 1) return false;

  const expiresRaw = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  return timingSafeEqual(signature, await hmacHex(sessionSecret(), expiresRaw));
}

/**
 * 비밀번호 확인. 원문을 직접 비교하지 않고 HMAC 결과를 상수 시간 비교한다.
 *
 * 실패 시 지연(setTimeout)은 넣지 않는다 — 서버리스에서는 요청마다 인스턴스가 따로 뜨므로
 * 병렬 시도에는 아무 제약이 안 되고(순차 공격자만 느려진다), 실패할 때마다 함수를
 * 400ms씩 붙잡아 두는 쪽이 오히려 공격자에게 유리하다. 상담 폼처럼 실제로 막아야 하면
 * consultations-repo의 DB 기준 카운트를 쓸 것.
 */
export async function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !password) return false;

  const [given, target] = await Promise.all([hmacHex(sessionSecret(), password), hmacHex(sessionSecret(), expected)]);
  return timingSafeEqual(given, target);
}
