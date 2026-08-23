"use server";

import { redirect } from "next/navigation";
import { createAdminSession, destroyAdminSession, isAdminAuthenticated, verifyAdminPassword } from "@/lib/admin-auth";
import { addNote, isConsultationStatus, updateConsultationStatus } from "@/lib/consultations-repo";

export type LoginState = { message: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!(await verifyAdminPassword(password))) {
    return { message: "비밀번호가 올바르지 않습니다." };
  }
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
