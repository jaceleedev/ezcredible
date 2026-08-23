import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Halftone } from "@/components/ui/halftone";
import { Pill } from "@/components/ui/pill";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { certificationGroups } from "@/content/home";
import { certificationPartner } from "@/content/site";

/** 기업 인증 — 인증 전문 파트너 ISMRI 소개와 외부 링크 */
export function Certification() {
  return (
    <Section>
      <Container className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,1fr)_460px] lg:gap-12">
        <div className="flex flex-col gap-8">
          <Reveal className="flex flex-col items-start gap-4">
            <Pill tone="gold">기업 인증 · NEW</Pill>
            <h2 className="text-h2">
              인증으로 더 유리한
              <br />
              자금 조건을 만드세요
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-body">
              벤처기업·이노비즈·메인비즈 같은 경영인증과 ISO 경영시스템인증은 정책자금 우대, 세제 혜택, 공공조달 가점의 출발점입니다. 이지크레더블은 인증 전문 파트너{" "}
              <strong className="font-bold text-ink">
                {certificationPartner.name}({certificationPartner.nameEn})
              </strong>
              과 함께 인증 취득부터 자금 연계까지 한 번에 설계합니다.
            </p>
          </Reveal>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {certificationGroups.map((group, i) => (
              <Reveal key={group.title} delay={i * 80} className="flex flex-col gap-2 rounded-2xl border border-line bg-soft-2 px-6 py-5">
                <div className="font-display text-lg font-extrabold tracking-tight">{group.title}</div>
                <div className="text-sm leading-relaxed text-muted">{group.description}</div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal variant="scale" delay={120} className="flex">
          <div className="stage-cobalt relative flex w-full flex-col justify-between gap-7 overflow-hidden rounded-4xl p-8 text-white shadow-float lg:p-10">
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
              <p className="text-sm leading-relaxed text-white/80">
                인증 · 정부지원사업 · ESG · 환경컨설팅 전문. TÜV SÜD 등 국제 검인증기관과 협력하며 11년간 230여 개 기업과 함께했습니다.
              </p>
            </div>
            <Button href={certificationPartner.url} variant="white" size="lg" className="relative justify-between">
              ismri.org 바로가기
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
