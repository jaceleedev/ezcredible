import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CTABand } from "@/components/layout/cta-band";
import { FeatureCards } from "@/components/sub/feature-cards";
import { FundIntro } from "@/components/sub/fund-intro";
import { NumberedSection } from "@/components/sub/numbered-section";
import { ProcessSteps } from "@/components/sub/process-steps";
import { SubHero } from "@/components/sub/sub-hero";
import { KeyValueTable } from "@/components/ui/key-value-table";
import { NumberedCard } from "@/components/ui/numbered-card";
import { Reveal } from "@/components/motion/reveal";
import { medical as page, medicalProcedure, medicalTargets, medicalTerms } from "@/content/pages/liquidity-funds";

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.metaDescription, href: page.href });

export default function MedicalBusinessLoansPage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} />

      <FundIntro page={page} />

      <NumberedSection index={2} title="의료사업자 대출의 특징 · 솔루션">
        <FeatureCards items={page.features} columns={4} />
      </NumberedSection>

      <NumberedSection index={3} title="상품 안내" lead="요양급여 매출채권을 양도하는 구조라 담보 평가 대신 청구 실적이 한도를 결정합니다.">
        <Reveal>
          <KeyValueTable rows={medicalTerms} />
        </Reveal>
      </NumberedSection>

      <NumberedSection index={4} title="이런 의료사업자에게 맞습니다" lead="요양급여가 안정적으로 들어오지만 입금 시차와 투자 시점 때문에 운영자금이 부족해지는 곳이 대상입니다.">
        <div className="grid gap-5 md:grid-cols-2">
          {medicalTargets.map((target, i) => (
            <Reveal key={target.title} delay={i * 70} className="flex">
              <NumberedCard index={i + 1} title={target.title} description={target.description} className="w-full" />
            </Reveal>
          ))}
        </div>
      </NumberedSection>

      <NumberedSection index={5} title="이용 절차" lead="한도 산정부터 실행까지 요양급여 청구 자료만 있으면 진행됩니다. 6개월마다 연장 심사로 기간과 한도를 다시 잡습니다.">
        <ProcessSteps steps={medicalProcedure} columns={5} />
      </NumberedSection>

      <div className="py-20 md:py-24">
        <CTABand inset title={page.ctaTitle} ctaLabel="빠른 상담신청" />
      </div>
    </>
  );
}
