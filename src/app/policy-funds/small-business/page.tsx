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
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/motion/reveal";
import {
  smallBusiness as page,
  smallBusinessFunds,
  smallBusinessProcedure,
  smallBusinessScale,
} from "@/content/pages/policy-funds";

export const metadata: Metadata = {
  title: page.title,
  description: page.metaDescription,
  alternates: { canonical: page.href },
  openGraph: { title: page.title, description: page.metaDescription, url: page.href },
};

/** 우대금리 유형 (공고 제2025-656호 2쪽) — 동일 유형 내 중복 불가, 최대 0.8%p */
const preferentialRates = [
  { type: "정책 우대", rate: "−0.1%p", who: "소진공·은행권 컨설팅 이수, 제로페이 가맹점, 디지털 온누리상품권 가맹점" },
  { type: "정책 배려", rate: "−0.1%p", who: "여성기업, 장애인기업, 일회용품 사용규제 적응 우수기업" },
  { type: "사회안전망", rate: "−0.1%p", who: "자영업자 고용보험, 전통시장 화재공제, 풍수해보험, 노란우산공제 가입" },
  { type: "성실상환", rate: "−0.3%p", who: "소진공 직접대출을 최근 3년간 연체 없이 원금분할상환 중이거나 완제" },
  { type: "지역 격차해소", rate: "−0.2%p", who: "비수도권 소재 소상공인(수도권 내 인구감소지역 포함)" },
];

// QUARTERLY: 분기 기준금리 갱신 (semas.or.kr 소상공인정책자금 페이지)
const quarterlyNote =
  "정책자금 기준금리는 2026년 3분기 연 3.85%입니다(분기별 변동, 소진공 공지). 우대금리는 유형별로 중복 적용되지 않으며 고정금리 상품에는 적용되지 않습니다.";

export default function SmallBusinessFundsPage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} imageLabel="임시 배너 · 코덱스 2000×600으로 교체" />

      <FundIntro page={page} />

      <NumberedSection index={2} title="소상공인자금의 장점 · 특징 · 솔루션">
        <FeatureCards items={page.features} />
      </NumberedSection>

      <NumberedSection
        index={3}
        title="2026년 지원 규모"
        lead="2026년 소상공인 정책자금은 총 3조 3,620억 원입니다. 업력 무관 일반경영안정자금 1조 2,200억 원, 위기·취약 소상공인을 위한 특별경영안정자금 1조 3,500억 원, 성장 유망 소상공인을 위한 성장기반자금 7,920억 원으로 나뉩니다."
      >
        <Reveal>
          <DataTable
            columns={["구분", "자금", "개요", "공급 규모(억 원)"]}
            rows={[
              ...smallBusinessScale.map((row, i, all) => {
                // 같은 구분(일반·특별·성장기반)은 첫 행에서 세로로 병합
                const first = i === 0 || all[i - 1]!.group !== row.group;
                const span = all.filter((r) => r.group === row.group).length;
                return [
                  first ? { content: row.group, rowSpan: span } : null,
                  row.name,
                  row.summary,
                  <span key={row.name} className="font-bold text-ink tabular-nums">{row.amount}</span>,
                ];
              }),
              ["합계", "", "", <span key="total" className="font-extrabold text-brand-strong tabular-nums">33,620</span>],
            ]}
            minWidth="760px"
            note="출처: 2026년 중소벤처기업부 소상공인 정책자금 융자사업 공고(제2025-656호). 자금은 예산 소진 시까지 접수합니다."
          />
        </Reveal>
      </NumberedSection>

      <NumberedSection
        index={4}
        title="지원대상과 우대금리"
        lead="소상공인기본법상 소상공인이면 업력과 관계없이 신청할 수 있고, 우대 유형에 해당하면 기준금리에서 최대 0.8%p까지 금리를 낮출 수 있습니다."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <Reveal className="flex flex-col gap-5">
            <Callout>
              <strong>상시근로자 5인 미만의 사업자</strong>
              (제조업·건설업·운수업·광업은 10인 미만)가 소상공인 정책자금의 지원대상입니다. 기업당 운전자금 5억 원 이내(시설자금 포함 10억 원)에서 운용되며, 긴급경영안정자금은 한도와 별도로 지원합니다.
            </Callout>
            <Card tone="soft" className="gap-3">
              <div className="font-display text-lg font-extrabold tracking-tight">융자 제외 업종</div>
              <p className="text-[15px] leading-relaxed text-body">
                유흥·향락 업종, 전문업종(법무·세무·회계 등), 금융업, 보험업, 부동산업 등은 지원대상에서 제외됩니다. 비주거용 건물 임대업은 ‘착한 임대인’에 한해 일반경영안정자금을 신청할 수 있습니다.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={100}>
            <Card padding="none" className="overflow-hidden">
              <div className="flex items-center justify-between gap-4 border-b border-line px-7 py-5">
                <div className="font-display text-lg font-extrabold tracking-tight">우대금리 유형</div>
                <Pill tone="gold" size="sm">
                  최대 −0.8%p
                </Pill>
              </div>
              <ul className="divide-y divide-line">
                {preferentialRates.map((item) => (
                  <li
                    key={item.type}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-6 py-4 text-[14px] leading-relaxed sm:grid sm:grid-cols-[110px_64px_minmax(0,1fr)] sm:items-start sm:px-7"
                  >
                    <span className="font-bold text-ink">{item.type}</span>
                    <span className="font-display font-extrabold text-brand-strong tabular-nums">{item.rate}</span>
                    <span className="basis-full text-body sm:basis-auto">{item.who}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </NumberedSection>

      <NumberedSection
        index={5}
        title="자금별 세부 지원 요건"
        lead="대출한도는 연간 기준이고, 금리의 ‘기준금리’는 정책자금 기준금리(분기별 변동)입니다. 대리대출은 보증서를 받아 은행에서, 직접대출은 소진공이 심사해 실행합니다."
      >
        <Reveal>
          <DataTable
            columns={["자금", "지원대상", "대출한도", "대출금리", "대출기간(거치)", "융자방식"]}
            rows={smallBusinessFunds.map((fund) => [fund.name, fund.target, fund.limit, fund.rate, fund.term, fund.method])}
            minWidth="1040px"
            note={quarterlyNote}
          />
        </Reveal>
      </NumberedSection>

      <NumberedSection
        index={6}
        title="신청 절차"
        lead="소상공인정책자금 누리집(ols.semas.or.kr)에서 온라인으로 신청하거나 전국 소진공 지역센터를 방문해 접수합니다. 자금에 따라 대리대출과 직접대출의 절차가 다릅니다."
      >
        <div className="flex flex-col gap-10">
          {smallBusinessProcedure.map((flow) => (
            <div key={flow.method} className="flex flex-col gap-4">
              <Reveal>
                <Pill tone="brand">{flow.method}</Pill>
              </Reveal>
              <ProcessSteps steps={flow.steps} />
            </div>
          ))}
        </div>
      </NumberedSection>

      <div className="py-20 md:py-24">
        <CTABand inset title={page.ctaTitle} ctaLabel="빠른 상담신청" />
      </div>
    </>
  );
}
