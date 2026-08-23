import { redirect } from "next/navigation";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin");

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="font-display text-h3 text-ink">상담 관리</h1>
      <p className="mt-2 mb-8 text-sm text-muted">(주)이지크레더블 내부 페이지입니다.</p>

      {isAdminConfigured() ? (
        <LoginForm />
      ) : (
        <p className="rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-sm text-gold-700">
          ADMIN_PASSWORD와 ADMIN_SESSION_SECRET 환경변수가 설정되지 않았습니다.
        </p>
      )}
    </div>
  );
}
