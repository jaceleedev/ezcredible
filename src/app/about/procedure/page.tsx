import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CTABand } from "@/components/layout/cta-band";
import { FeatureCards } from "@/components/sub/feature-cards";
import { NumberedSection } from "@/components/sub/numbered-section";
import { ProcessSteps } from "@/components/sub/process-steps";
import { SubHero } from "@/components/sub/sub-hero";
import { Callout } from "@/components/ui/callout";
import { ImageStage } from "@/components/ui/image-stage";
import { NumberedCard } from "@/components/ui/numbered-card";
import { Reveal } from "@/components/motion/reveal";
import { procedureDocuments, procedurePage as page, procedurePrinciples, procedureSteps } from "@/content/pages/about";

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.metaDescription, href: page.href });

export default function ProcedurePage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} />

      <NumberedSection
        index={1}
        title="상담부터 관리까지, 여섯 단계"
        aside={
          <ImageStage
            tint="mint"
            art="check"
            src="/images/services/checklist.png"
            alt="체크리스트로 절차를 관리하는 전문가"
            aspect="photo"
            sizes="(min-width: 1024px) 480px, 100vw"
            className="rounded-[28px] shadow-card"
          />
        }
      >
        <Callout>
          <strong>금융업계에서 오랜 경력을 가진 전문가가 함께합니다.</strong> 상담 신청이 들어오면 기업을 분석·진단하고, 담당자 배정과 계약서 작성을 거쳐 솔루션을 진행합니다. 성공 이후에도 관리는 계속됩니다.
        </Callout>
        <p className="text-base leading-relaxed text-body">{page.intro}</p>
      </NumberedSection>

      <NumberedSection index={2} title="업무 절차" lead="각 단계의 꼬리표는 그 단계에서 하는 일입니다. 진행 상황은 전담 담당자가 단계마다 공유합니다.">
        <ProcessSteps steps={procedureSteps} columns={3} />
      </NumberedSection>

      <NumberedSection index={3} title="일하는 원칙">
        <FeatureCards items={procedurePrinciples} />
      </NumberedSection>

      <NumberedSection index={4} title="상담 전에 준비하면 좋은 것" lead="없어도 상담은 시작할 수 있습니다. 다만 아래 서류가 있으면 2단계 진단이 하루 이틀 빨라집니다.">
        <div className="grid gap-5 md:grid-cols-2">
          {procedureDocuments.map((doc, i) => (
            <Reveal key={doc.title} delay={i * 70} className="flex">
              <NumberedCard index={i + 1} title={doc.title} description={doc.description} className="w-full" />
            </Reveal>
          ))}
        </div>
      </NumberedSection>

      <div className="py-20 md:py-24">
        <CTABand inset title={page.ctaTitle} ctaLabel="상담 신청하기" />
      </div>
    </>
  );
}
