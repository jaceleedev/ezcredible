import type { Metadata } from "next";
import { CTABand } from "@/components/layout/cta-band";
import { DataTable } from "@/components/sub/data-table";
import { FeatureCards } from "@/components/sub/feature-cards";
import { FundIntro } from "@/components/sub/fund-intro";
import { NumberedSection } from "@/components/sub/numbered-section";
import { ProcessSteps } from "@/components/sub/process-steps";
import { SubHero } from "@/components/sub/sub-hero";
import { KeyValueTable } from "@/components/ui/key-value-table";
import { Reveal } from "@/components/motion/reveal";
import { bills as page, billsProcedure, billsRates, billsTerms } from "@/content/pages/liquidity-funds";

export const metadata: Metadata = {
  title: page.title,
  description: page.metaDescription,
  alternates: { canonical: page.href },
  openGraph: { title: page.title, description: page.metaDescription, url: page.href },
};

export default function ElectronicBillsDiscountPage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} imageLabel="임시 배너 · 코덱스 2000×600으로 교체" />

      <FundIntro page={page} />

      <NumberedSection index={2} title="전자어음할인의 특징 · 솔루션">
        <FeatureCards items={page.features} columns={4} />
      </NumberedSection>

      <NumberedSection
        index={3}
        title="예상 전자어음 할인율"
        lead="할인율은 어음을 발행한 기업의 신용등급으로 정해집니다. 등급이 높을수록 월 할인율이 낮고, 취급 불가 등급의 어음은 할인할 수 없습니다."
      >
        <Reveal>
          <DataTable
            columns={billsRates.columns}
            rows={billsRates.rows}
            minWidth="720px"
            note="구성비는 플랫폼에서 취급한 어음의 등급 분포입니다. 실제 할인율은 심사 시점의 발행사 등급과 시장금리에 따라 달라집니다."
          />
        </Reveal>
      </NumberedSection>

      <NumberedSection index={4} title="서비스 안내">
        <Reveal>
          <KeyValueTable rows={billsTerms} />
        </Reveal>
      </NumberedSection>

      <NumberedSection index={5} title="이용 절차" lead="어음 정보를 등록하면 발행사 등급으로 예상 할인율부터 확인할 수 있습니다. 심사를 통과하면 당일 입금됩니다.">
        <ProcessSteps steps={billsProcedure} columns={5} />
      </NumberedSection>

      <div className="py-20 md:py-24">
        <CTABand inset title={page.ctaTitle} ctaLabel="빠른 상담신청" />
      </div>
    </>
  );
}
