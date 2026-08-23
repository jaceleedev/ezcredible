import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { CTABand } from "@/components/layout/cta-band";
import { FeatureCards } from "@/components/sub/feature-cards";
import { FundIntro } from "@/components/sub/fund-intro";
import { NumberedSection } from "@/components/sub/numbered-section";
import { ProcessSteps } from "@/components/sub/process-steps";
import { SubHero } from "@/components/sub/sub-hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Halftone } from "@/components/ui/halftone";
import { NumberedCard } from "@/components/ui/numbered-card";
import { Chip, Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/motion/reveal";
import { certificationPartner } from "@/content/site";
import {
  certification as page,
  certificationFlow,
  certificationGroups,
  certificationOthers,
  certificationTargets,
} from "@/content/pages/growth";

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.metaDescription, href: page.href });

export default function CertificationPage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} />

      <FundIntro page={page} title="기업인증이란?" />

      <NumberedSection
        index={2}
        title="인증이 자금으로 이어지는 흐름"
        lead="인증을 위한 인증이 아니라, 자금 계획에서 거꾸로 필요한 인증을 고릅니다. 취득은 ISMRI가, 그 뒤의 정책자금·보증 연결은 이지크레더블이 맡습니다."
      >
        <ProcessSteps steps={certificationFlow} columns={4} />
      </NumberedSection>

      <NumberedSection index={3} title="인증의 효과 · 솔루션">
        <FeatureCards items={page.features} columns={4} />
      </NumberedSection>

      <NumberedSection
        index={4}
        title="어떤 인증이 있나요"
        lead="자금과 직접 연결되는 네 갈래입니다. 경영인증은 정책자금·세제, 경영시스템인증은 조달·협력사, 기술·조달인증은 공공 구매, 신용등급은 보증과 금리로 이어집니다."
      >
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {certificationGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80} className="flex">
              <Card padding="lg" className="w-full gap-4">
                <h3 className="text-h3">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
                <p className="mt-auto border-t border-line pt-4 text-[15px] leading-relaxed text-body">
                  <span className="font-bold text-gold-700">효과 </span>
                  {group.benefit}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <Card tone="soft" padding="lg" className="gap-5">
            <div className="flex flex-col gap-1.5">
              <div className="font-display text-lg font-extrabold tracking-tight">ISMRI가 함께 다루는 영역</div>
              <p className="text-sm leading-relaxed text-muted">인증 외에도 ESG·환경규제·안전보건처럼 대기업 협력사와 수출기업에 요구되는 영역을 같은 파트너가 맡습니다.</p>
            </div>
            <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {certificationOthers.map((item) => (
                <div key={item.title} className="flex flex-col gap-1">
                  <dt className="text-[15px] font-bold text-ink">{item.title}</dt>
                  <dd className="text-sm leading-relaxed text-body">{item.items}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>
      </NumberedSection>

      <NumberedSection
        index={5}
        title="인증 파트너 ISMRI"
        aside={
          <div className="stage-cobalt relative flex w-full flex-col justify-between gap-7 overflow-hidden rounded-[28px] p-8 text-white shadow-float lg:p-10">
            <Halftone corner="tr" className="h-[240px] w-[320px]" />
            <div className="relative flex flex-col items-start gap-5">
              <div className="text-[13px] font-bold tracking-[0.1em] text-gold-400">인증 파트너</div>
              <div className="rounded-2xl bg-white px-5 py-4">
                <Image src="/images/partners/ismri.svg" alt={certificationPartner.name} width={1672} height={266} className="h-9 w-auto" />
              </div>
              <div className="font-display text-2xl font-extrabold leading-tight tracking-tight">
                {certificationPartner.name}
                <br />
                {certificationPartner.nameEn}
              </div>
              <dl className="grid w-full grid-cols-3 gap-3 border-t border-white/12 pt-5">
                {[
                  ["11년+", "사업 경험"],
                  ["230+", "함께한 기업"],
                  ["590+", "수행 프로젝트"],
                ].map(([value, label]) => (
                  <div key={label} className="flex flex-col gap-1">
                    <dt className="order-2 text-xs text-white/70">{label}</dt>
                    <dd className="order-1 font-display text-xl font-extrabold text-gold-400 tabular-nums">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Button href={certificationPartner.url} variant="white" size="lg" className="relative justify-between">
              ismri.org 바로가기
            </Button>
          </div>
        }
      >
        <Pill tone="gold" className="self-start">
          지속가능경영연구원
        </Pill>
        <p className="text-base leading-relaxed text-body">
          인증 · 정부지원사업 · ESG · 환경컨설팅 전문 기관으로, TÜV SÜD 등 국제 검인증기관과 협력하며 11년간 230여 개 기업과 590여 건의 프로젝트를 수행했습니다. 이지크레더블은 고객사의 자금 계획에 맞는 인증을
          ISMRI와 함께 설계하고, 취득 이후 정책자금·보증 신청으로 이어지는 과정을 맡습니다.
        </p>
        <p className="text-base leading-relaxed text-body">
          인증 취득 자체에 대한 문의는 ISMRI에서, 인증을 활용한 자금 조달은 이지크레더블에서 상담받을 수 있습니다. 두 창구가 같은 기업을 함께 봅니다.
        </p>
      </NumberedSection>

      <NumberedSection index={6} title="이런 기업에 추천합니다">
        <div className="grid gap-5 md:grid-cols-2">
          {certificationTargets.map((target, i) => (
            <Reveal key={target.title} delay={i * 70} className="flex">
              <NumberedCard index={i + 1} title={target.title} description={target.description} className="w-full" />
            </Reveal>
          ))}
        </div>
      </NumberedSection>

      <div className="py-20 md:py-24">
        <CTABand inset title={page.ctaTitle} ctaLabel="빠른 상담신청" />
      </div>
    </>
  );
}
