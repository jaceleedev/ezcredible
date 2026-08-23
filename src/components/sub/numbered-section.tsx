import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

type NumberedSectionProps = {
  index: number;
  title: ReactNode;
  lead?: ReactNode;
  /** 오른쪽에 붙는 이미지 스테이지 등. 있으면 헤더+본문이 왼쪽 열이 된다(캔버스 01 레이아웃) */
  aside?: ReactNode;
  id?: string;
  className?: string;
  children?: ReactNode;
};

/** 섹션 번호 라벨 — "01" 같은 두 자리 코발트 숫자 */
export function SectionNumber({ index, className }: { index: number; className?: string }) {
  return (
    <div className={cn("font-display text-sm font-extrabold tracking-[0.1em] text-brand tabular-nums", className)}>
      {String(index).padStart(2, "0")}
    </div>
  );
}

/**
 * 서브페이지 본문 섹션. 번호 + h2(+리드) 아래에 본문이 온다.
 * 섹션 사이 간격은 위쪽 여백으로만 만들고(pt), 마지막 CTA가 아래 여백을 맡는다.
 */
export function NumberedSection({ index, title, lead, aside, id, className, children }: NumberedSectionProps) {
  const header = (
    <div className="flex flex-col gap-3.5">
      <SectionNumber index={index} />
      <h2 className="text-h2 text-ink">{title}</h2>
      {lead && <p className="max-w-3xl text-base leading-relaxed text-body md:text-lead">{lead}</p>}
    </div>
  );

  if (aside) {
    return (
      <section id={id} className={cn("scroll-mt-24 pt-20 md:pt-24", className)}>
        <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            {header}
            {children}
          </Reveal>
          <Reveal variant="scale" delay={120}>
            {aside}
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section id={id} className={cn("scroll-mt-24 pt-20 md:pt-24", className)}>
      <Container className="flex flex-col gap-8 md:gap-10">
        <Reveal>{header}</Reveal>
        {children}
      </Container>
    </section>
  );
}
