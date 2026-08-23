import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * @theme에 정의한 커스텀 폰트 크기를 tailwind-merge에 알려준다.
 * 모르면 `text-h2`를 색상으로 오인해 `text-ink` 같은 색 클래스와 충돌시켜 버린다.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["hero", "h1", "h2", "h3", "lead", "stat"] }],
    },
  },
});

/**
 * className 병합 유틸. Tailwind는 스타일시트 순서로 충돌을 해결하므로
 * className을 받는 컴포넌트는 반드시 이 함수를 거쳐야 호출부의 클래스가 이긴다.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
