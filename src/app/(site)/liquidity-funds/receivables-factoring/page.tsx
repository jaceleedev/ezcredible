import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CTABand } from "@/components/layout/cta-band";
import { DataTable } from "@/components/sub/data-table";
import { FeatureCards } from "@/components/sub/feature-cards";
import { FundIntro } from "@/components/sub/fund-intro";
import { NumberedSection } from "@/components/sub/numbered-section";
import { ProcessSteps } from "@/components/sub/process-steps";
import { SubHero } from "@/components/sub/sub-hero";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { KeyValueTable } from "@/components/ui/key-value-table";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import { FactStrip } from "@/components/sub/fact-strip";
import {
  factoring as page,
  factoringBenefits,
  factoringComparison,
  factoringProcedure,
  factoringSimulation,
  factoringTerms,
  factoringUseCases,
  recourseNote,
} from "@/content/pages/liquidity-funds";

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.metaDescription, href: page.href });

export default function ReceivablesFactoringPage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} />

      <FundIntro page={page} />

      <NumberedSection index={2} title="팩토링의 장점 · 솔루션">
        <FeatureCards items={page.features} columns={4} />
      </NumberedSection>

      <NumberedSection
        index={3}
        title="다른 결제성 여신과의 차이"
        lead="같은 매출채권을 현금화하더라도 할인어음·외상매출채권담보대출은 상환청구권이 있습니다. 팩토링만 구매기업의 부도 위험을 판매기업에 넘기지 않습니다."
      >
        <Reveal>
          <DataTable columns={factoringComparison.columns} rows={factoringComparison.rows} minWidth="880px" />
        </Reveal>
        <Reveal delay={100}>
          <Callout tone="gold" className="text-base">
            <strong>상환청구권이란?</strong> {recourseNote}
          </Callout>
        </Reveal>
      </NumberedSection>

      <NumberedSection
        index={4}
        title="판매기업과 구매기업, 양쪽 모두의 이점"
        lead="판매기업은 5일 안에 현금을, 구매기업은 최장 90일의 결제 여유를 얻습니다. 한쪽만 좋은 구조가 아니라서 거래처를 설득하기가 수월합니다."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {factoringBenefits.map((group, g) => {
            const navy = group.tone === "navy";
            return (
              <Reveal key={group.party} delay={g * 100} className="flex">
                <Card tone={navy ? "navy" : "white"} padding="lg" className="w-full gap-6">
                  <div className="flex items-center gap-3">
                    <Pill tone={navy ? "glass" : "brand"}>{group.party}</Pill>
                    <span className={cn("text-sm font-semibold", navy ? "text-white/70" : "text-muted")}>{group.items.length}가지 이점</span>
                  </div>
                  <ol className="grid gap-4 sm:grid-cols-2">
                    {group.items.map((item, i) => (
                      <li key={item.title} className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              "flex size-8 shrink-0 items-center justify-center rounded-full font-display text-xs font-extrabold tabular-nums",
                              navy ? "bg-white/12 text-gold-400" : "bg-cobalt-50 text-brand-strong",
                            )}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className={cn("font-display text-base font-extrabold tracking-tight", navy ? "text-white" : "text-ink")}>{item.title}</span>
                        </div>
                        <p className={cn("pl-[42px] text-sm leading-relaxed", navy ? "text-white/78" : "text-body")}>{item.body}</p>
                      </li>
                    ))}
                  </ol>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </NumberedSection>

      <NumberedSection
        index={5}
        title="이럴 때 씁니다"
        lead="받을 돈은 장부에 있는데 당장 쓸 현금이 없을 때, 그리고 지금 물건을 사 둬야 하는데 대금 낼 여유가 없을 때 쓰는 방법입니다."
      >
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {factoringUseCases.map((c, i) => (
            <Reveal key={c.industry} delay={i * 90} className="flex">
              <Card padding="lg" className="w-full gap-3.5">
                <Pill tone="brand" className="self-start">
                  {c.industry}
                </Pill>
                <div className="font-display text-lg font-extrabold tracking-tight text-ink">{c.title}</div>
                <p className="text-[15px] leading-relaxed text-body">{c.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* 실제 실적이 아니라 모델 계산이므로 제목과 주석 양쪽에서 시뮬레이션임을 밝힌다 */}
        <div className="flex flex-col gap-3 pt-4">
          <h3 className="text-h3">자금 회전이 빨라지면 — 시뮬레이션</h3>
          <FactStrip facts={factoringSimulation.map((f) => ({ label: f.label, value: f.value, sub: f.sub }))} />
          <p className="px-1 text-[13px] leading-relaxed text-muted">
            거래대금을 빨리 회수해 같은 자본으로 거래 횟수를 늘렸을 때를 가정한 모델 계산입니다. 실제 결과는 업종·거래 조건에 따라 다릅니다.
          </p>
        </div>
      </NumberedSection>

      <NumberedSection index={6} title="이용 조건" lead="담보나 보증 없이, 세금계산서로 확인되는 실제 거래와 기업 신용으로 심사합니다.">
        <Reveal>
          <KeyValueTable rows={factoringTerms} />
        </Reveal>
      </NumberedSection>

      <NumberedSection
        index={7}
        title="이용 절차"
        lead="한 번 심사를 통과하면 이후에는 매출채권이 생길 때마다 신청만 하면 됩니다. 신청부터 입금까지 5일 이내입니다."
      >
        <ProcessSteps steps={factoringProcedure} columns={4} />
      </NumberedSection>

      <div className="py-20 md:py-24">
        <CTABand inset title={page.ctaTitle} ctaLabel="빠른 상담신청" />
      </div>
    </>
  );
}
