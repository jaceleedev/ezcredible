import type { ConsultationPayload } from "./consultation";
import { getSql } from "./db";
import { hmacHex } from "./crypto";

export const consultationStatuses = ["new", "in_progress", "won", "lost", "spam"] as const;
export type ConsultationStatus = (typeof consultationStatuses)[number];

export const statusLabels: Record<ConsultationStatus, string> = {
  new: "신규",
  in_progress: "진행중",
  won: "성공",
  lost: "실패",
  spam: "스팸",
};

export function isConsultationStatus(value: string): value is ConsultationStatus {
  return (consultationStatuses as readonly string[]).includes(value);
}

export type ConsultationRow = {
  id: number;
  topic: string;
  topicLabel: string;
  name: string;
  position: string;
  phone: string;
  company: string;
  bizNo: string;
  message: string;
  status: ConsultationStatus;
  notifiedAt: string | null;
  notifyError: string | null;
  submittedAt: string;
  createdAt: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function toRow(r: any): ConsultationRow {
  return {
    id: Number(r.id),
    topic: r.topic,
    topicLabel: r.topic_label,
    name: r.name,
    position: r.position,
    phone: r.phone,
    company: r.company,
    bizNo: r.biz_no,
    message: r.message,
    status: r.status,
    notifiedAt: r.notified_at ? new Date(r.notified_at).toISOString() : null,
    notifyError: r.notify_error,
    submittedAt: new Date(r.submitted_at).toISOString(),
    createdAt: new Date(r.created_at).toISOString(),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * IP 원본은 저장하지 않는다. 재신청 남용을 세는 데 필요한 만큼만 해시로 남긴다.
 * 시크릿이 없으면 해시하지 않고 null — 남용 차단은 포기하되 개인정보는 남기지 않는다.
 */
export async function hashIp(ip: string) {
  const secret = process.env.IP_HASH_SECRET;
  if (!secret || !ip || ip === "unknown") return null;
  return hmacHex(secret, ip);
}

export async function insertConsultation(
  payload: ConsultationPayload,
  meta: { ipHash: string | null; userAgent: string },
) {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL 환경변수가 없습니다.");

  const rows = await sql`
    insert into consultations
      (topic, topic_label, name, "position", phone, company, biz_no, message, ip_hash, user_agent, submitted_at)
    values
      (${payload.topic}, ${payload.topicLabel}, ${payload.name}, ${payload.position}, ${payload.phone},
       ${payload.company}, ${payload.bizNo}, ${payload.message}, ${meta.ipHash}, ${meta.userAgent}, ${payload.submittedAt})
    returning id
  `;
  return Number(rows[0]!.id);
}

/** 알림 메일 결과 기록. 실패해도 신청 자체는 이미 저장됐으므로 조용히 넘어간다 */
export async function recordNotifyResult(id: number, error: string | null) {
  const sql = getSql();
  if (!sql) return;
  try {
    await sql`
      update consultations
         set notified_at = ${error ? null : new Date().toISOString()}, notify_error = ${error}
       where id = ${id}
    `;
  } catch {
    // 기록 실패는 신청 접수에 영향을 주지 않는다
  }
}

/** 같은 IP에서 최근 windowSeconds 안에 들어온 건수 */
export async function countRecentByIpHash(ipHash: string, windowSeconds: number) {
  const sql = getSql();
  if (!sql) return 0;
  const rows = await sql`
    select count(*)::int as n
      from consultations
     where ip_hash = ${ipHash}
       and created_at > now() - make_interval(secs => ${windowSeconds})
  `;
  return Number(rows[0]?.n ?? 0);
}

/** 관리자 목록. 상태 필터는 null이면 전체. count(*) over()로 총건수를 같이 받아 왕복을 한 번으로 줄인다 */
export async function listConsultations(options: { status: ConsultationStatus | null; page: number; perPage: number }) {
  const sql = getSql();
  if (!sql) return { rows: [], total: 0 };

  const offset = (options.page - 1) * options.perPage;
  const rows = await sql`
    select *, count(*) over() as total_count
      from consultations
     where (${options.status}::text is null or status = ${options.status})
     order by created_at desc
     limit ${options.perPage} offset ${offset}
  `;
  return {
    rows: rows.map(toRow),
    total: rows.length > 0 ? Number(rows[0]!.total_count) : 0,
  };
}

/** 상태별 건수 — 목록 상단 탭에 붙인다 */
export async function countByStatus() {
  const sql = getSql();
  if (!sql) return {} as Record<string, number>;
  const rows = await sql`select status, count(*)::int as n from consultations group by status`;
  const out: Record<string, number> = {};
  for (const r of rows) out[r.status as string] = Number(r.n);
  return out;
}

export async function getConsultation(id: number) {
  const sql = getSql();
  if (!sql) return null;
  const rows = await sql`select * from consultations where id = ${id}`;
  return rows[0] ? toRow(rows[0]) : null;
}

export async function updateConsultationStatus(id: number, status: ConsultationStatus) {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL 환경변수가 없습니다.");
  await sql`update consultations set status = ${status} where id = ${id}`;
}

export type ConsultationNote = { id: number; body: string; createdAt: string };

/** 상담 경과 메모 — 최신순 */
export async function listNotes(consultationId: number): Promise<ConsultationNote[]> {
  const sql = getSql();
  if (!sql) return [];
  const rows = await sql`
    select id, body, created_at
      from consultation_notes
     where consultation_id = ${consultationId}
     order by created_at desc, id desc
  `;
  return rows.map((r) => ({ id: Number(r.id), body: r.body as string, createdAt: new Date(r.created_at as string).toISOString() }));
}

export async function addNote(consultationId: number, body: string) {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL 환경변수가 없습니다.");
  await sql`insert into consultation_notes (consultation_id, body) values (${consultationId}, ${body})`;
}
