import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoProps = {
  /** mark: 심볼만(헤더) / lockup: 클라이언트가 준 SVG 원본 그대로(푸터) */
  variant?: "mark" | "lockup";
  tone?: "blue" | "white";
  className?: string;
  priority?: boolean;
  /** 옆에 같은 글자가 이미 있으면 ""로 넘겨 장식 이미지로 만든다 */
  alt?: string;
};

/**
 * 로고는 public/brand/ezcredible-logo.svg(클라이언트 제공 원본) 파일을 그대로 쓴다.
 * -white는 색만 바꾼 사본, -mark는 원본에서 한글 워드마크 패스를 잘라낸 사본이다.
 * 헤더의 "(주)이지크레더블" 글자는 로고 파일이 아니라 Pretendard 텍스트로 넣는다.
 */
const files = {
  mark: { blue: "/brand/ezcredible-mark.svg", white: "/brand/ezcredible-mark-white.svg", width: 728, height: 309 },
  lockup: { blue: "/brand/ezcredible-logo.svg", white: "/brand/ezcredible-logo-white.svg", width: 728, height: 499 },
} as const;

export function Logo({ variant = "mark", tone = "blue", className, priority, alt = "(주)이지크레더블" }: LogoProps) {
  const file = files[variant];
  return (
    <Image
      src={file[tone]}
      alt={alt}
      width={file.width}
      height={file.height}
      priority={priority}
      unoptimized
      className={cn("h-8 w-auto", className)}
    />
  );
}
