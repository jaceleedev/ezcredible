import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CTABand } from "@/components/layout/cta-band";
import { DataTable, type Cell } from "@/components/sub/data-table";
import { FeatureCards } from "@/components/sub/feature-cards";
import { FundIntro } from "@/components/sub/fund-intro";
import { NumberedSection } from "@/components/sub/numbered-section";
import { ProcessSteps } from "@/components/sub/process-steps";
import { SubHero } from "@/components/sub/sub-hero";
import { Reveal } from "@/components/motion/reveal";
import { pg as page, pgFlow, pgSettlement } from "@/content/pages/growth";

export const metadata: Metadata = pageMetadata({ title: "PG 서비스", description: page.metaDescription, href: page.href });

/** 같은 정산주기(2회/월·4회/월)는 첫 행에서 세로 병합 */
const settlementRows: Cell[][] = pgSettlement.rows.map((row, i, all) => {
  const first = i === 0 || all[i - 1]![0] !== row[0];
  const span = all.filter((r) => r[0] === row[0]).length;
  return [first ? { content: row[0], rowSpan: span } : null, row[1], row[2], row[3]];
});

export default function PGPage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} imageLabel="임시 배너 · 코덱스 2000×600으로 교체" />

      <FundIntro page={page} title="PG 서비스란?" />

      <NumberedSection index={2} title="PG의 특징 · 솔루션">
        <FeatureCards items={page.features} columns={4} />
      </NumberedSection>

      <NumberedSection
        index={3}
        title="서비스 흐름"
        lead="결제 승인은 실시간으로, 매입은 다음 날, 정산은 선택한 주기에 맞춰 이루어집니다. 수수료는 정산 때 공제되고 한 달치가 세금계산서로 정리됩니다."
      >
        <ProcessSteps steps={pgFlow} columns={5} />
      </NumberedSection>

      <NumberedSection
        index={4}
        title="정산주기 안내"
        lead="신용카드·계좌이체·가상계좌는 통합정산입니다. 매일 받는 일정산부터 월 1·2·4회 정산까지 현금흐름에 맞춰 고를 수 있습니다."
      >
        <Reveal>
          <DataTable columns={pgSettlement.columns} rows={settlementRows} columnWidths={["18%", "18%", "28%", "36%"]} minWidth="640px" note={pgSettlement.note} />
        </Reveal>
      </NumberedSection>

      <div className="py-20 md:py-24">
        <CTABand inset title={page.ctaTitle} ctaLabel="빠른 상담신청" />
      </div>
    </>
  );
}
