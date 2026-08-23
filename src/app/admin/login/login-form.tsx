"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";
import { fieldBase, fieldLabel } from "../field-styles";

const initialState: LoginState = { message: "" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className={fieldLabel}>
          이메일
        </label>
        {/* autoComplete="username"이어야 비밀번호 관리자가 이 폼을 로그인으로 인식하고 한 쌍으로 저장한다 */}
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          autoFocus
          spellCheck={false}
          aria-describedby="login-error"
          className={fieldBase}
        />
      </div>

      <div>
        <label htmlFor="password" className={fieldLabel}>
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-describedby="login-error"
          className={fieldBase}
        />
      </div>

      <p id="login-error" aria-live="polite" className="min-h-5 text-[13px] leading-relaxed font-medium text-rose-600">
        {state.message}
      </p>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-cobalt-600 px-4 py-3 font-semibold text-white transition hover:bg-cobalt-700 disabled:opacity-60"
      >
        {pending ? "확인 중…" : "로그인"}
      </button>
    </form>
  );
}
