import { getSql } from "./db";

/**
 * 관리자 로그인 접속기록 (`admin_access_log`).
 *
 * 한 테이블이 두 가지를 겸한다:
 *   1) 로그인 남용 차단 — 최근 실패 횟수로 시도를 제한한다. 서버리스는 요청마다 인스턴스가
 *      따로 떠서 인메모리 카운트가 무력하므로 상담 폼과 같이 DB를 기준으로 센다.
 *   2) 개인정보처리방침 제9조가 고지한 "개인정보 처리시스템 접속기록"의 실체.
 *
 * 실패해도 로그인 자체를 막지 않는다 — DB 장애로 관리자가 잠기면 안 된다.
 */

/** 실패를 셀 창(초) */
export const LOGIN_WINDOW_SECONDS = 10 * 60;
/** 이 횟수 이상 실패하면 창이 지날 때까지 막는다 */
export const LOGIN_MAX_FAILURES = 5;

/**
 * 로그인 시도 기록. 성공·실패 모두 남긴다(접속기록이므로).
 * email은 시도한 계정 — 「안전성 확보조치 기준」이 접속기록에 요구하는 '계정' 항목이고,
 * 실패 건에서는 누가 무엇으로 시도했는지 파악하는 단서가 된다.
 */
export async function recordAdminAccess(entry: {
  success: boolean;
  email: string;
  ipHash: string | null;
  userAgent: string;
}) {
  const sql = getSql();
  if (!sql) return;
  try {
    await sql`
      insert into admin_access_log (success, email, ip_hash, user_agent)
      values (${entry.success}, ${entry.email.slice(0, 200)}, ${entry.ipHash}, ${entry.userAgent})
    `;
  } catch (error) {
    console.error("[admin] 접속기록 저장 실패:", error);
  }
}

/**
 * 최근 창 안의 연속 실패 횟수. 마지막 성공 이후만 센다 —
 * 한 번 제대로 들어왔으면 그 전의 오타는 잊는다(짧은 비밀번호를 쓰는 실사용자를 막지 않기 위해).
 */
export async function countRecentLoginFailures(ipHash: string, windowSeconds: number) {
  const sql = getSql();
  if (!sql) return 0;
  try {
    const rows = await sql`
      select count(*)::int as n
        from admin_access_log
       where ip_hash = ${ipHash}
         and success = false
         and created_at > now() - make_interval(secs => ${windowSeconds})
         and created_at > coalesce(
               (select max(created_at)
                  from admin_access_log
                 where ip_hash = ${ipHash} and success = true),
               'epoch'::timestamptz)
    `;
    return Number(rows[0]?.n ?? 0);
  } catch (error) {
    // 카운트 실패로 정상 로그인을 막지 않는다
    console.error("[admin] 로그인 시도 확인 실패:", error);
    return 0;
  }
}

/** 차단이 풀리는 시각 — 창 안 가장 오래된 실패 + 창 길이 */
export async function loginBlockedUntil(ipHash: string, windowSeconds: number): Promise<Date | null> {
  const sql = getSql();
  if (!sql) return null;
  try {
    const rows = await sql`
      select min(created_at) as oldest
        from admin_access_log
       where ip_hash = ${ipHash}
         and success = false
         and created_at > now() - make_interval(secs => ${windowSeconds})
    `;
    const oldest = rows[0]?.oldest as string | null | undefined;
    return oldest ? new Date(new Date(oldest).getTime() + windowSeconds * 1000) : null;
  } catch {
    return null;
  }
}
