import type { Metadata } from "next";
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
import {
  factoring as page,
  factoringBenefits,
  factoringComparison,
  factoringProcedure,
  factoringTerms,
  recourseNote,
} from "@/content/pages/liquidity-funds";

export const metadata: Metadata = {
  title: page.title,
  description: page.metaDescription,
  alternates: { canonical: page.href },
  openGraph: { title: page.title, description: page.metaDescription, url: page.href },
};

export default function ReceivablesFactoringPage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} imageLabel="임시 배너 · 코덱스 2000×600으로 교체" />

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
        lead="판매기업은 자금과 재무 안정성을, 구매기업은 결제 편의와 상생협력 평가를 얻습니다. 구매기업에 금융비용이 붙지 않는 점이 거래처를 설득하는 포인트입니다."
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

      <NumberedSection index={5} title="이용 요건 · 한도 · 할인율" lead="기술보증기금 중소기업팩토링 기준입니다. 할인율은 구매기업의 팩토링 등급에 따라 정해지고 시장금리에 따라 바뀝니다.">
        <Reveal>
          <KeyValueTable rows={factoringTerms} />
        </Reveal>
      </NumberedSection>

      <NumberedSection
        index={6}
        title="이용 절차"
        lead="거래처 연동과 등급 평가가 끝나 있으면 매출채권이 발행될 때마다 바로 팩토링을 신청할 수 있습니다. 연간 운영한도가 소진되면 접수가 마감되므로 연초에 준비합니다."
      >
        <ProcessSteps steps={factoringProcedure} columns={5} />
      </NumberedSection>

      <div className="py-20 md:py-24">
        <CTABand inset title={page.ctaTitle} ctaLabel="빠른 상담신청" />
      </div>
    </>
  );
}
