import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CTABand } from "@/components/layout/cta-band";
import { DataTable } from "@/components/sub/data-table";
import { FeatureCards } from "@/components/sub/feature-cards";
import { FundIntro } from "@/components/sub/fund-intro";
import { NumberedSection } from "@/components/sub/numbered-section";
import { ProcessSteps } from "@/components/sub/process-steps";
import { SubHero } from "@/components/sub/sub-hero";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import {
  credit as page,
  creditFactors,
  creditGrades,
  creditImprovement,
  procurementGrades,
  tcbGrades,
  type CreditGrade,
} from "@/content/pages/growth";

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.metaDescription, href: page.href });

/** 등급 띠별 배지 색 — 투자적격은 코발트, 투기등급은 골드, 위험은 회색 */
const bandTone: Record<CreditGrade["band"], "brand" | "white" | "gold" | "soft"> = {
  prime: "brand",
  good: "white",
  spec: "gold",
  risk: "soft",
};

export default function CorporateCreditEvaluationPage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} imageLabel="임시 배너 · 코덱스 2000×600으로 교체" />

      <FundIntro page={page} title="기업신용평가란?" />

      <NumberedSection index={2} title="신용등급이 쓰이는 곳 · 솔루션">
        <FeatureCards items={page.features} columns={4} />
      </NumberedSection>

      <NumberedSection
        index={3}
        title="신용등급 정의"
        lead="AAA부터 D까지 10단계입니다. BBB 이상이 투자적격, BB 이하는 투기등급으로 분류되며, 정책자금·입찰에서는 대체로 BBB- 이상을 기준선으로 봅니다."
      >
        <Reveal>
          <DataTable
            columns={["등급", "신용상태", "채무불이행 위험"]}
            rows={creditGrades.map((g) => [
              <Pill key={g.grade} tone={bandTone[g.band]} className="min-w-[3.5rem] justify-center font-display tabular-nums">
                {g.grade}
              </Pill>,
              g.status,
              g.risk,
            ])}
            minWidth="560px"
          />
        </Reveal>
      </NumberedSection>

      <NumberedSection
        index={4}
        title="주요 평가 요소"
        lead="재무 지표는 결산 전에, 비재무 요소는 평가 자료를 준비하는 단계에서 손볼 수 있습니다. 어느 항목이 우리 회사의 등급을 깎고 있는지부터 찾는 것이 시작입니다."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {creditFactors.map((group, g) => {
            const navy = group.tone === "navy";
            return (
              <Reveal key={group.group} delay={g * 100} className="flex">
                <Card tone={navy ? "navy" : "white"} padding="lg" className="w-full gap-5">
                  <div className="flex flex-col gap-2">
                    <Pill tone={navy ? "glass" : "brand"} className="self-start">
                      {group.group}
                    </Pill>
                    <p className={cn("text-sm leading-relaxed", navy ? "text-white/70" : "text-muted")}>{group.intro}</p>
                  </div>
                  <dl className={cn("flex flex-col divide-y", navy ? "divide-white/10" : "divide-line")}>
                    {group.items.map((item) => (
                      <div key={item.term} className="grid gap-1 py-3.5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-4">
                        <dt className={cn("font-display text-[15px] font-extrabold tracking-tight", navy ? "text-gold-400" : "text-brand-strong")}>{item.term}</dt>
                        <dd className={cn("text-[15px] leading-relaxed", navy ? "text-white/82" : "text-body")}>{item.desc}</dd>
                      </div>
                    ))}
                  </dl>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </NumberedSection>

      <NumberedSection
        index={5}
        title="입찰용 등급 기준"
        lead="조달청 입찰은 회사채·기업어음·기업신용평가등급을 같은 줄에 놓고 비교하고, 공공기관 입찰은 기술신용평가(TCB)의 기술등급을 봅니다."
      >
        <div className="flex flex-col gap-10">
          <Reveal className="flex flex-col gap-4">
            <h3 className="text-h3">조달청 입찰용 등급</h3>
            <DataTable columns={procurementGrades.columns} rows={procurementGrades.rows} minWidth="640px" rowHeader={false} />
          </Reveal>
          <Reveal className="flex flex-col gap-4">
            <h3 className="text-h3">공공기관 입찰용 기술등급(TCB)</h3>
            <DataTable
              columns={tcbGrades.columns}
              rows={tcbGrades.rows.map(([grade, level, def]) => [
                <span key={grade} className="font-display text-base font-extrabold text-brand-strong tabular-nums">
                  {grade}
                </span>,
                level,
                def,
              ])}
              minWidth="680px"
              note="기술등급 정의는 이크레더블 e-TCB 등급체계 기준입니다. 은행 기술금융, 기보 보증, 정부 R&D 지원사업에서도 같은 등급을 활용합니다."
            />
          </Reveal>
        </div>
      </NumberedSection>

      <NumberedSection
        index={6}
        title="기업신용등급을 개선하려면"
        lead="기업 분석 뒤에 신용평가 요소 가운데 부족한 부분을 실질적으로 바꾸고, 등급에 악영향을 주는 요소를 걷어낸 다음, 단기와 중장기로 나눠 실행합니다."
      >
        <ProcessSteps steps={creditImprovement} columns={4} />
      </NumberedSection>

      <div className="py-20 md:py-24">
        <CTABand inset title={page.ctaTitle} ctaLabel="빠른 상담신청" />
      </div>
    </>
  );
}
