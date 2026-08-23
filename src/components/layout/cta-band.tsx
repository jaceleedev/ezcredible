import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { company, consultationHref } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Halftone } from "@/components/ui/halftone";

type CTABandProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  /**
   * halftone: 코발트 + 하프톤 (서브페이지 기본)
   * photo: 배경 이미지 + 왼쪽 어두운 그라디언트 (홈 마무리, 3D 캐릭터 자리)
   */
  variant?: "halftone" | "photo";
  image?: { src: string; alt: string };
  /** 컨테이너 안의 둥근 카드로 (서브페이지). false면 풀블리드 밴드 */
  inset?: boolean;
  className?: string;
};

export function CTABand({
  eyebrow = "상담 신청",
  title,
  lead = `정확한 상담을 받아보세요! ${company.hours}`,
  ctaLabel = "상담하기",
  ctaHref = consultationHref,
  variant = "halftone",
  image,
  inset = false,
  className,
}: CTABandProps) {
  const decor =
    variant === "halftone" ? (
      <>
        <Halftone corner="tl" />
        <Halftone corner="br" />
      </>
    ) : (
      image && (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-cover object-right"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-navy/80 via-navy/45 to-navy/0" />
        </>
      )
    );

  const content = (
    <div className={cn("relative flex flex-col gap-5", inset ? "md:flex-row md:items-center md:justify-between" : "max-w-2xl")}>
      <div className="flex flex-col gap-4">
        {!inset && eyebrow && <div className="text-sm font-bold tracking-[0.1em] text-gold-400">{eyebrow}</div>}
        <h2 className={cn("text-white", inset ? "text-h2" : "text-h1")}>{title}</h2>
        {lead && (
          <p className={cn("text-lead text-white/88", variant === "photo" && "max-w-[220px] md:max-w-none")}>{lead}</p>
        )}
      </div>
      <Button href={ctaHref} variant="white" size="lg" className={inset ? "self-start md:self-auto" : "self-start"}>
        {ctaLabel}
      </Button>
    </div>
  );

  if (inset) {
    return (
      <Container>
        <div className={cn("relative overflow-hidden rounded-4xl stage-cobalt-bright px-8 py-14 text-white shadow-float md:px-16 md:py-16", className)}>
          {decor}
          {content}
        </div>
      </Container>
    );
  }

  return (
    <div
      className={cn(
        "relative flex min-h-[520px] items-center overflow-hidden py-24 text-white",
        variant === "halftone" ? "stage-cobalt-bright" : "bg-cobalt-800",
        className,
      )}
    >
      {decor}
      <Container className="relative">{content}</Container>
    </div>
  );
}
