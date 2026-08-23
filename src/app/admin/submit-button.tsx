"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/cn";

export function SubmitButton({
  children,
  className,
  pendingLabel = "저장 중…",
}: {
  children: React.ReactNode;
  className?: string;
  /** 제출 중에 보여줄 문구. 저장이 아닌 동작(삭제 등)은 직접 준다 */
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "rounded-xl bg-cobalt-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cobalt-700 disabled:opacity-60",
        className,
      )}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
