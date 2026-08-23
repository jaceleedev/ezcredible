import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { StageArt, type StageArtKind } from "./stage-art";

type ImageStageProps = {
  /** 바탕 틴트. navy는 어두운 스테이지 */
  tint?: "sky" | "mint" | "lavender" | "sand" | "navy";
  /** 실제 이미지(투명 PNG 3D 렌더). 없으면 art 자리표시 */
  src?: string;
  alt?: string;
  art?: StageArtKind;
  /** 자리표시 라벨. 빈 문자열이면 숨김 */
  label?: string;
  aspect?: "wide" | "video" | "square";
  /** 이미지가 화면 폭에서 차지하는 비율 힌트 (next/image sizes) */
  sizes?: string;
  priority?: boolean;
  className?: string;
  children?: ReactNode;
};

const tints = {
  sky: "bg-[radial-gradient(420px_220px_at_50%_120%,#cfe0ff,#e9f3ff_70%)]",
  mint: "bg-[radial-gradient(420px_220px_at_50%_120%,#c9f0e2,#e8f8f1_70%)]",
  lavender: "bg-[radial-gradient(420px_220px_at_50%_120%,#dcd6ff,#efebff_70%)]",
  sand: "bg-[radial-gradient(420px_220px_at_50%_120%,#ffe9a8,#fff4d6_70%)]",
  navy: "stage-cobalt",
};

const aspects = { wide: "aspect-[16/9]", video: "aspect-video", square: "aspect-square" };

/**
 * 이미지 무대. 솔루션 카드·서브페이지의 3D 오브젝트가 놓이는 틴트 배경.
 * src가 들어오면 그대로 이미지를 띄우고, 없으면 StageArt 자리표시를 보여준다.
 */
export function ImageStage({
  tint = "sky",
  src,
  alt = "",
  art = "document",
  label = "3D 이미지 · 준비 중",
  aspect = "wide",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
  className,
  children,
}: ImageStageProps) {
  const dark = tint === "navy";
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden rounded-2xl", tints[tint], aspects[aspect], className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-contain p-6" />
      ) : (
        <>
          <StageArt kind={art} />
          {label && (
            <span
              className={cn(
                "absolute bottom-3 left-3.5 rounded-md px-2 py-1 text-[11px] font-semibold",
                dark ? "bg-white/15 text-white/80" : "bg-navy/8 text-brand-strong",
              )}
            >
              {label}
            </span>
          )}
        </>
      )}
      {children}
    </div>
  );
}
