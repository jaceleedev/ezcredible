import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated, missingAdminEnv } from "@/lib/admin-auth";
import { Logo } from "@/components/ui/logo";
import { LoginForm } from "./login-form";

/**
 * 관리자 로그인 — 대시보드 셸 밖의 단독 화면.
 * isAdminAuthenticated()를 반드시 먼저 호출한다(cookies() 접근이 이 라우트를 동적으로 만든다).
 */
export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin");

  const missing = missingAdminEnv();

  return (
    <div className="flex flex-1 items-center justify-center bg-soft-2 px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <Logo variant="mark" alt="" className="h-7" />
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink">상담 관리</h1>
            <p className="mt-1.5 text-sm text-muted">(주)이지크레더블 내부 페이지입니다.</p>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-white p-7 shadow-card sm:p-8">
          {missing.length === 0 ? (
            <LoginForm />
          ) : (
            /* 어떤 값이 빠졌는지 그대로 보여 준다 — 배포 환경에서 원인을 바로 알 수 있게 */
            <div className="rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-sm text-gold-700">
              <p className="font-semibold">환경변수가 설정되지 않았습니다.</p>
              <ul className="mt-2 flex flex-col gap-1">
                {missing.map((name) => (
                  <li key={name} className="font-mono text-[13px]">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p className="mt-7 text-center">
          <Link href="/" className="text-sm font-medium text-muted transition-colors hover:text-brand-strong">
            ← 이지크레더블 사이트로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  );
}
