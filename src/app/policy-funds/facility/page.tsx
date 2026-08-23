import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CTABand } from "@/components/layout/cta-band";
import { DataTable } from "@/components/sub/data-table";
import { FeatureCards } from "@/components/sub/feature-cards";
import { FundIntro } from "@/components/sub/fund-intro";
import { NumberedSection } from "@/components/sub/numbered-section";
import { ProcessSteps } from "@/components/sub/process-steps";
import { RestrictionsCallout } from "@/components/sub/restrictions-callout";
import { SubHero } from "@/components/sub/sub-hero";
import { KeyValueTable } from "@/components/ui/key-value-table";
import { Reveal } from "@/components/motion/reveal";
import { facility as page, facilityDetails, kosmes, kosmesFunds } from "@/content/pages/policy-funds";

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.metaDescription, href: page.href });

/** 시설자금을 지원하는 자금만 표로 — 운전자금 전용(긴급경영안정·밸류체인)은 제외 */
const facilityFunds = kosmesFunds.filter((fund) => fund.facility !== null);

export default function FacilityFundsPage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} imageLabel="임시 배너 · 코덱스 2000×600으로 교체" />

      <FundIntro page={page} />

      <NumberedSection index={2} title="시설자금의 장점 · 특징 · 솔루션">
        <FeatureCards items={page.features} />
      </NumberedSection>

      <NumberedSection
        index={3}
        title="자금별 시설자금 조건"
        lead="2026년 중진공 6개 세부자금 가운데 시설자금을 지원하는 4개 자금의 한도·기간·금리입니다. 긴급경영안정자금과 밸류체인안정화자금은 운전자금만 지원합니다."
      >
        <Reveal>
          <DataTable
            columns={["자금", "지원대상", "시설자금 한도", "대출기간", "대출금리"]}
            rows={facilityFunds.map((fund) => [fund.name, fund.target, fund.facility!.limit, fund.facility!.term, fund.facility!.rate])}
            minWidth="900px"
            note="한도는 연간 기준이며 직접대출·대리대출 잔액을 합산해 기업당 60억 원(지방소재 70억, 우대기업 100억) 안에서 운용됩니다. 금리는 정책자금 기준금리(분기별 변동)에 가감합니다."
          />
        </Reveal>
      </NumberedSection>

      <NumberedSection index={4} title="자금 세부내용">
        <Reveal>
          <KeyValueTable rows={facilityDetails} />
        </Reveal>
      </NumberedSection>

      <NumberedSection
        index={5}
        title="신청 절차와 유의사항"
        lead="시설자금은 투자 계획과 견적이 기업평가의 핵심 자료입니다. 공사·설비 일정에 맞춰 기성 확인 후 단계별로 실행되므로 신청 시점을 투자 일정보다 앞당겨 잡습니다."
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
