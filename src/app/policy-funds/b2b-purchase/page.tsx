import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CTABand } from "@/components/layout/cta-band";
import { FeatureCards } from "@/components/sub/feature-cards";
import { FundIntro } from "@/components/sub/fund-intro";
import { NumberedSection } from "@/components/sub/numbered-section";
import { RestrictionsCallout } from "@/components/sub/restrictions-callout";
import { SubHero } from "@/components/sub/sub-hero";
import { ImageStage } from "@/components/ui/image-stage";
import { KeyValueTable } from "@/components/ui/key-value-table";
import { NumberedCard } from "@/components/ui/numbered-card";
import { Reveal } from "@/components/motion/reveal";
import { b2bCautionExample, b2bCautions, b2bGuarantee, b2bPurchase as page, b2bSpecs } from "@/content/pages/policy-funds";

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.metaDescription, href: page.href });

export default function B2BPurchasePage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} />

      <FundIntro page={page} title="B2B구매자금 대출이란?" />

      <NumberedSection
        index={2}
        title="상품 안내"
        lead="구매기업은 보증서 한도 안에서 은행 대출로 결제하고, 판매기업은 거래 즉시 현금을 받습니다. 세금계산서가 거래의 기준 서류입니다."
      >
        <Reveal>
          <KeyValueTable rows={b2bSpecs} />
        </Reveal>
      </NumberedSection>

      <NumberedSection index={3} title="이용 효과 · 솔루션">
        <FeatureCards items={page.features} />
      </NumberedSection>

      <NumberedSection
        index={4}
        title={b2bGuarantee.title}
        aside={
          <ImageStage
            tint="sky"
            art="check"
            src="/images/solutions/policy-funds.png"
            alt="B2B 구매자금 보증을 상징하는 정책자금 서류"
            aspect="photo"
            sizes="(min-width: 1024px) 480px, 100vw"
            className="rounded-[28px] shadow-card"
          />
        }
      >
        <p className="text-base leading-relaxed text-body">{b2bGuarantee.overview}</p>
        <p className="text-base leading-relaxed text-body">{b2bGuarantee.mp}</p>
        <div className="grid gap-3 sm:grid-cols-1">
          {b2bGuarantee.effects.map((effect, i) => (
            <NumberedCard key={effect} index={i + 1} title={effect} className="items-center py-4" />
          ))}
        </div>
      </NumberedSection>

      <NumberedSection
        index={5}
        title="거래 주의사항"
        lead="보증서 발급일과 세금계산서 작성일자의 순서가 맞지 않으면 결제가 거절됩니다. 은행별 약정등록일도 함께 확인해야 합니다."
      >
        <RestrictionsCallout title="결제 전에 꼭 확인하세요" items={b2bCautions} footer={b2bCautionExample} />
      </NumberedSection>

      <div className="py-20 md:py-24">
        <CTABand inset title={page.ctaTitle} ctaLabel="빠른 상담신청" />
      </div>
    </>
  );
}
