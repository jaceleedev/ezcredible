"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

const initialState: LoginState = { message: "" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-semibold text-ink">
          관리자 비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="w-full rounded-xl border border-line-strong bg-white px-4 py-3 text-ink outline-none transition focus:border-cobalt-500 focus:ring-2 focus:ring-cobalt-200"
        />
      </div>

      <p aria-live="polite" className="min-h-5 text-sm text-red-600">
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
