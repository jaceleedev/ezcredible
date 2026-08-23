import type { Metadata } from "next";
import { CTABand } from "@/components/layout/cta-band";
import { FeatureCards } from "@/components/sub/feature-cards";
import { FundIntro } from "@/components/sub/fund-intro";
import { NumberedSection } from "@/components/sub/numbered-section";
import { ProcessSteps } from "@/components/sub/process-steps";
import { SubHero } from "@/components/sub/sub-hero";
import { NumberedCard } from "@/components/ui/numbered-card";
import { Reveal } from "@/components/motion/reveal";
import { van as page, vanFunctions, vanProcedure } from "@/content/pages/growth";

export const metadata: Metadata = {
  title: "VAN 서비스",
  description: page.metaDescription,
  alternates: { canonical: page.href },
  openGraph: { title: "VAN 서비스", description: page.metaDescription, url: page.href },
};

export default function VANPage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} imageLabel="임시 배너 · 코덱스 2000×600으로 교체" />

      <FundIntro page={page} title="VAN 서비스란?" />

      <NumberedSection index={2} title="KIS · KSNET VAN의 특장점 · 솔루션">
        <FeatureCards items={page.features} columns={4} />
      </NumberedSection>

      <NumberedSection index={3} title="주요 기능" lead="카드 승인 중계가 기본이고, 현금영수증·멤버십·정산관리까지 한 단말기와 한 계정으로 처리합니다.">
        <div className="grid gap-5 md:grid-cols-2">
          {vanFunctions.map((fn, i) => (
            <Reveal key={fn.title} delay={i * 70} className="flex">
              <NumberedCard index={i + 1} title={fn.title} description={fn.description} className="w-full" />
            </Reveal>
          ))}
        </div>
      </NumberedSection>

      <NumberedSection index={4} title="이용 절차" lead="신규 매장은 서류 접수부터 결제 개시까지 이지크레더블이 VAN사·카드사 절차를 대신 진행합니다.">
        <ProcessSteps steps={vanProcedure} columns={4} />
      </NumberedSection>

      <div className="py-20 md:py-24">
        <CTABand inset title={page.ctaTitle} ctaLabel="빠른 상담신청" />
      </div>
    </>
  );
}
