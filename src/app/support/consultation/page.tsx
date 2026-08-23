import type { Metadata } from "next";
import { Suspense } from "react";
import { ConsultationForm } from "@/components/support/consultation-form";
import { SubHero } from "@/components/sub/sub-hero";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/motion/reveal";
import { company, consultationHref } from "@/content/site";

export const metadata: Metadata = {
  title: "상담신청",
  description: "이지크레더블 상담 신청 — 정책자금·유동성자금·성장 솔루션·기업인증에 대해 궁금한 점을 남겨 주시면 담당자가 검토 후 휴대전화로 연락드립니다. 평일 09:00 ~ 18:00.",
  alternates: { canonical: consultationHref },
  openGraph: { title: "상담신청", url: consultationHref },
};

const steps = [
  { title: "신청 접수", description: "아래 폼을 남겨 주시면 바로 접수됩니다." },
  { title: "담당자 검토", description: "솔루션 종류에 맞는 담당자가 상담 내용을 검토합니다." },
  { title: "휴대전화 연락", description: "남겨 주신 번호로 연락드려 상담 일정을 잡습니다." },
];

export default function ConsultationPage() {
  return (
    <>
      <SubHero href={consultationHref} title="상담신청" subtitle="이지크레더블의 솔루션에 대해 궁금한 사항을 남겨 주세요." />

      <Container className="grid gap-12 pb-24 pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:pb-28 lg:pt-24">
        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Pill tone="brand" dot="green" className="self-start">
              {company.hours}
            </Pill>
            <h2 className="text-h2">
              남겨 주시면
              <br />
              담당자가 연락드립니다
            </h2>
            <p className="text-base leading-relaxed text-body">
              각 담당자가 상담 내용을 검토한 뒤 고객님께 신속하게 답변 드립니다. 연락은 남겨 주신 휴대전화로 드립니다.
            </p>
          </div>
          <ol className="flex flex-col gap-3">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4 rounded-2xl border border-line bg-soft-2 p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand font-display text-xs font-extrabold text-white tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1">
                  <div className="font-display text-base font-extrabold tracking-tight text-ink">{step.title}</div>
                  <div className="text-sm leading-relaxed text-muted">{step.description}</div>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-sm leading-relaxed text-muted">
            방문 상담을 원하시면 <a href="/about/directions" className="font-semibold text-cobalt-700 underline underline-offset-2">오시는길</a>을 확인하신 뒤 폼에 남겨 주세요. 영업시간 외 접수 건은 다음 영업일에 순서대로 연락드립니다.
          </p>
        </Reveal>

        <Reveal delay={120}>
          {/* useSearchParams(?topic=) 때문에 Suspense 경계가 필요하다 */}
          <Suspense fallback={<div className="min-h-[640px] rounded-3xl border border-line bg-white shadow-card" aria-hidden="true" />}>
            <ConsultationForm />
          </Suspense>
        </Reveal>
      </Container>
    </>
  );
}
