import type { Metadata } from "next";
import { CTABand } from "@/components/layout/cta-band";
import { FeatureCards } from "@/components/sub/feature-cards";
import { FundIntro } from "@/components/sub/fund-intro";
import { NumberedSection } from "@/components/sub/numbered-section";
import { ProcessSteps } from "@/components/sub/process-steps";
import { RestrictionsCallout } from "@/components/sub/restrictions-callout";
import { SubHero } from "@/components/sub/sub-hero";
import { KeyValueTable } from "@/components/ui/key-value-table";
import { NumberedCard } from "@/components/ui/numbered-card";
import { Reveal } from "@/components/motion/reveal";
import { kosmes, kosmesFunds, operating as page, operatingDetails } from "@/content/pages/policy-funds";

export const metadata: Metadata = {
  title: page.title,
  description: page.metaDescription,
  alternates: { canonical: page.href },
  openGraph: { title: page.title, description: page.metaDescription, url: page.href },
};

export default function OperatingFundsPage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} imageLabel="임시 배너 · 코덱스 2000×600으로 교체" />

      <FundIntro page={page} />

      <NumberedSection index={2} title="운전자금의 장점 · 특징 · 솔루션">
        <FeatureCards items={page.features} />
      </NumberedSection>

      <NumberedSection
        index={3}
        title="2026년 운전자금으로 쓸 수 있는 정책자금"
        lead="중진공 정책자금은 기업의 성장단계에 따라 6개 세부자금으로 나뉩니다. 업력·수출실적·자금 용도에 따라 신청할 수 있는 자금이 다르고, 한도와 금리도 자금마다 다릅니다."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {kosmesFunds.map((fund, i) => (
            <Reveal key={fund.name} delay={i * 70} className="flex">
              <NumberedCard
                index={i + 1}
                title={fund.name}
                className="w-full"
                description={
                  <>
                    <span className="block font-semibold text-body">{fund.target}</span>
                    <span className="mt-1.5 block">{fund.working}</span>
                  </>
                }
              />
            </Reveal>
          ))}
        </div>
      </NumberedSection>

      <NumberedSection index={4} title="자금 세부내용">
        <Reveal>
          <KeyValueTable rows={operatingDetails} />
        </Reveal>
      </NumberedSection>

      <NumberedSection
        index={5}
        title="신청 절차와 유의사항"
        lead="중진공 정책자금은 온라인으로 기업정보를 입력하는 것부터 시작합니다. 평가 단계마다 준비할 서류가 다르므로 신청 전에 융자제한 사유부터 확인합니다."
      >
        <ProcessSteps steps={kosmes.procedure} />
        <RestrictionsCallout title="융자가 제한되는 대표적인 경우" items={kosmes.restrictions} />
      </NumberedSection>

      <div className="py-20 md:py-24">
        <CTABand inset title={page.ctaTitle} ctaLabel="빠른 상담신청" />
      </div>
    </>
  );
}
