"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  createAdminSession,
  destroyAdminSession,
  isAdminAuthenticated,
  normalizeAdminEmail,
  verifyAdminCredentials,
} from "@/lib/admin-auth";
import {
  countRecentLoginFailures,
  loginBlockedUntil,
  recordAdminAccess,
  LOGIN_MAX_FAILURES,
  LOGIN_WINDOW_SECONDS,
} from "@/lib/admin-access-repo";
import {
  addNote,
  deleteConsultation,
  hashIp,
  isConsultationStatus,
  updateConsultationStatus,
} from "@/lib/consultations-repo";

export type LoginState = { message: string };

/** 요청자 IP → 해시. 상담 폼과 같은 규칙(원본은 저장하지 않는다) */
async function requestFingerprint() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return { ipHash: await hashIp(ip), userAgent: (h.get("user-agent") ?? "").slice(0, 500) };
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = normalizeAdminEmail(String(formData.get("email") ?? "").slice(0, 200));
  const password = String(formData.get("password") ?? "");
  const { ipHash, userAgent } = await requestFingerprint();

  // 남용 차단 — 마지막 성공 이후의 연속 실패만 센다. IP 해시가 없으면(시크릿 미설정) 건너뛴다
  if (ipHash && (await countRecentLoginFailures(ipHash, LOGIN_WINDOW_SECONDS)) >= LOGIN_MAX_FAILURES) {
    const until = await loginBlockedUntil(ipHash, LOGIN_WINDOW_SECONDS);
    const minutes = until ? Math.max(1, Math.ceil((until.getTime() - Date.now()) / 60000)) : Math.ceil(LOGIN_WINDOW_SECONDS / 60);
    return { message: `로그인 시도가 너무 많습니다. ${minutes}분 후에 다시 시도해 주세요.` };
  }

  const ok = await verifyAdminCredentials(email, password);
  await recordAdminAccess({ success: ok, email, ipHash, userAgent });

  // 어느 쪽이 틀렸는지 알려주지 않는다 — 맞는 이메일을 찾아내는 단서가 된다
  if (!ok) return { message: "이메일 또는 비밀번호가 올바르지 않습니다." };

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

/** 상태 변경과 메모 추가를 한 번에 처리한다 — 통화 뒤 "진행중으로 바꾸고 내용 남기기"가 한 동작이 되도록 */
export async function updateConsultationAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const id = Number(formData.get("id"));
  const status = String(formData.get("status") ?? "");
  const note = String(formData.get("note") ?? "").trim().slice(0, 2000);
  if (!Number.isInteger(id) || !isConsultationStatus(status)) return;

  await updateConsultationStatus(id, status);
  if (note) await addNote(id, note);

  redirect(`/admin/${id}?saved=1`);
}

/**
 * 접수 삭제 — 메모(consultation_notes)도 함께 지워진다(on delete cascade).
 * 되돌릴 수 없어서 상세 화면의 확인 단계를 거친 뒤에만 호출된다.
 * 보통은 삭제 대신 상태를 '스팸'으로 두는 쪽을 권한다(개인정보 파기 요청 등에만 사용).
 */
export async function deleteConsultationAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;

  await deleteConsultation(id);
  redirect("/admin?deleted=1");
}
