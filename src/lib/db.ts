import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Neon HTTP 드라이버. 커넥션 풀을 유지하지 않아 서버리스(Vercel)에서 안전하고,
 * 태그드 템플릿만 허용해서 값이 항상 파라미터로 바인딩된다.
 *
 * DATABASE_URL이 없으면 null을 돌려준다 — 빌드나 DB 없는 개발 환경에서 죽지 않게.
 */
let client: NeonQueryFunction<false, false> | null = null;

export function getSql() {
  if (client) return client;
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  client = neon(url);
  return client;
}

export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL);
}
