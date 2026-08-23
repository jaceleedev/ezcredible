import { cookies } from "next/headers";
import { hmacHex, timingSafeEqual } from "./crypto";

/**
 * 관리자 인증 — 이메일 + 비밀번호, HMAC 서명 쿠키. 쓰는 사람이 두어 명인 내부 페이지라
 * 계정 테이블 없이 환경변수(ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_SESSION_SECRET)로 처리한다.
 * ADMIN_EMAIL은 쉼표로 여러 계정을 받는다.
 * Vercel의 Password Protection은 Pro 전용이라 쓸 수 없다.
 *
 * 이메일을 같이 받는 이유: 비밀번호 하나만 있으면 그 한 값이 전부라 짧게 쓰기 부담스럽고,
 * /admin/login을 훑는 자동화 봇이 비밀번호만 대입하면 된다. 이메일 칸이 있으면
 * 비밀번호 관리자의 자동입력도 제대로 동작한다(username 필드가 있어야 저장·채움이 맞는다).
 */
const COOKIE_NAME = "ezc_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7일

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

/**
 * 설정이 빠진 환경변수 이름들. 비어 있으면 준비 완료 — 로그인 화면이 이 목록을 그대로 보여 준다.
 * ADMIN_EMAIL은 값이 있어도 쉼표만 들어 있으면(허용 계정 0개) 미설정으로 본다.
 */
export function missingAdminEnv() {
  return (["ADMIN_EMAIL", "ADMIN_PASSWORD", "ADMIN_SESSION_SECRET"] as const).filter((name) =>
    name === "ADMIN_EMAIL" ? adminEmails().length === 0 : !process.env[name]?.trim(),
  );
}

export function isAdminConfigured() {
  return missingAdminEnv().length === 0;
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

/** 이메일 표기 차이를 흡수한다 — 대소문자와 앞뒤 공백은 같은 주소로 본다 */
export function normalizeAdminEmail(email: string) {
  return email.trim().toLowerCase();
}

/**
 * 허용 계정 목록. ADMIN_EMAIL에 쉼표로 여러 개를 넣을 수 있다.
 *   ADMIN_EMAIL=jace@example.com,ceo@example.com
 * 비밀번호(ADMIN_PASSWORD)는 공유한다 — 사람마다 다른 비밀번호가 필요해지면
 * 계정별 쌍을 받는 구조로 바꿔야 한다(지금은 사내 두 명이라 여기까지).
 * 누가 로그인했는지는 접속기록(admin_access_log.email)에 남는다.
 */
export function adminEmails() {
  return [
    ...new Set(
      (process.env.ADMIN_EMAIL ?? "")
        .split(",")
        .map(normalizeAdminEmail)
        .filter(Boolean),
    ),
  ];
}

/**
 * 자격증명 확인. 두 값 모두 원문을 직접 비교하지 않고 HMAC 결과를 상수 시간 비교한다.
 * 이메일이 틀렸는지 비밀번호가 틀렸는지 구분해서 알려주지 않는다(어느 쪽이 맞았는지 흘리지 않도록),
 * 그래서 둘 다 검사한 뒤 AND로 합친다 — 이메일이 틀려도 비밀번호 검사를 건너뛰지 않는다.
 * 허용 목록도 일치하는 순간 빠져나오지 않고 끝까지 돌린다(몇 번째 계정인지 시간으로 흘리지 않도록).
 *
 * 실패 시 지연(setTimeout)은 넣지 않는다 — 서버리스에서는 요청마다 인스턴스가 따로 뜨므로
 * 병렬 시도에는 아무 제약이 안 되고(순차 공격자만 느려진다), 실패할 때마다 함수를
 * 400ms씩 붙잡아 두는 쪽이 오히려 공격자에게 유리하다. 실제 차단은 admin-access-repo의
 * DB 기준 실패 카운트가 맡는다.
 */
export async function verifyAdminCredentials(email: string, password: string) {
  const allowed = adminEmails();
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (allowed.length === 0 || !expectedPassword) return false;

  const secret = sessionSecret();
  const [givenEmail, givenPassword, targetPassword, ...targetEmails] = await Promise.all([
    hmacHex(secret, normalizeAdminEmail(email)),
    hmacHex(secret, password),
    hmacHex(secret, expectedPassword),
    ...allowed.map((allowedEmail) => hmacHex(secret, allowedEmail)),
  ]);

  let emailOk = false;
  for (const target of targetEmails) {
    // 일치해도 break하지 않는다 — 목록의 몇 번째에서 맞았는지 알 수 없게
    if (timingSafeEqual(givenEmail, target)) emailOk = true;
  }
  const passwordOk = timingSafeEqual(givenPassword, targetPassword);
  return emailOk && passwordOk;
}
