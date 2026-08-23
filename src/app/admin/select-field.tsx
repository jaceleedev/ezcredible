import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { ChevronDown } from "@/components/ui/icons";
import { fieldBase } from "./field-styles";

/**
 * 관리자 화면 select. 브라우저 기본 화살표는 오른쪽 끝에 바짝 붙어 답답하므로
 * appearance-none으로 지우고 같은 chevron 아이콘을 여백 있는 자리에 직접 놓는다.
 * (data URI 배경으로 하면 Tailwind arbitrary 값 안의 공백 때문에 클래스가 통째로 무시된다 — 실제로 그랬다)
 */
export function SelectField({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select {...props} className={cn(fieldBase, "cursor-pointer appearance-none pr-11", className)}>
        {children}
      </select>
      <ChevronDown
        size={18}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-muted"
      />
    </div>
  );
}
