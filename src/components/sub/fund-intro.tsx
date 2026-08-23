import type { FundPage } from "@/content/pages/policy-funds";
import { Callout } from "@/components/ui/callout";
import { Container } from "@/components/ui/container";
import { ImageStage } from "@/components/ui/image-stage";
import { FactStrip } from "./fact-strip";
import { NumberedSection } from "./numbered-section";

/**
 * 자금 페이지 01 섹션 — 정의 콜아웃 + 요약 + 오른쪽 3D 스테이지, 그 아래 핵심 수치 4개.
 * 정책자금 4페이지가 같은 도입부를 쓰고, 그 뒤 본문은 페이지마다 다르게 조립한다.
 */
export function FundIntro({ page, title }: { page: FundPage; title?: string }) {
  return (
    <>
      <NumberedSection
        index={1}
        title={title ?? `${page.title}이란?`}
        aside={
          <ImageStage
            tint={page.artTint}
            art={page.art}
            src={page.image?.src}
            alt={page.image?.alt ?? page.title}
            aspect="photo"
            label="3D 이미지 자리 · 코덱스"
            sizes="(min-width: 560px) 480px, 100vw"
            className="rounded-[28px] shadow-card"
          />
        }
      >
        <Callout>
          <strong>{page.definition.strong}</strong>
          {page.definition.rest}
        </Callout>
        <p className="text-base leading-relaxed text-body">{page.summary}</p>
      </NumberedSection>
      <Container className="pt-10 md:pt-12">
        <FactStrip facts={page.facts} />
      </Container>
    </>
  );
}
