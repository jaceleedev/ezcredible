"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/cn";

export function SubmitButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn("rounded-xl bg-cobalt-600 px-5 py-3 font-semibold text-white transition hover:bg-cobalt-700 disabled:opacity-60", className)}
    >
      {pending ? "저장 중…" : children}
    </button>
  );
}
