import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CTABand } from "@/components/layout/cta-band";
import { DevLabel } from "@/components/home/dev-label";
import { FactStrip } from "@/components/sub/fact-strip";
import { NumberedSection } from "@/components/sub/numbered-section";
import { SubHero } from "@/components/sub/sub-hero";
import { Timeline } from "@/components/sub/timeline";
import { Container } from "@/components/ui/container";
import { ImageStage } from "@/components/ui/image-stage";
import { history, historyPage as page } from "@/content/pages/about";

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.metaDescription, href: page.href });

/** 설립 건을 뺀 협약·위탁 파트너 수 */
const partnerCount = history.filter((entry) => !entry.partner.includes("설립")).length;

export default function HistoryPage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} imageLabel="임시 배너 · 코덱스 2000×600으로 교체" />

      <NumberedSection
        index={1}
        title="파트너십으로 쌓아 온 시간"
        aside={
          <ImageStage tint="lavender" art="bars" aspect="photo" label="3D 이미지 자리 · 코덱스" sizes="(min-width: 1024px) 480px, 100vw" className="rounded-[28px] shadow-card" />
        }
      >
        <p className="text-base leading-relaxed text-body">{page.intro}</p>
      </NumberedSection>
      <Container className="pt-10 md:pt-12">
        <FactStrip
          facts={[
            { label: "법인 설립", value: 2019, unit: "년 7월", plain: true },
            { label: "협약 · 위탁 파트너", value: partnerCount, unit: "곳" },
            { label: "서비스 영역", value: 3, unit: "축 · 정책 · 유동성 · 성장" },
            { label: "신용평가 파트너", value: 3, unit: "곳 · NICE · KoDATA · 이크레더블" },
          ]}
        />
      </Container>

      <NumberedSection index={2} title="연혁" lead="협약·위탁 계약을 기준으로 최신순입니다.">
        <div className="relative">
          {/* TODO(client): 2023.1 이후 연혁 — 클라이언트 데이터 대기 */}
          <DevLabel className="-top-10 right-0" tone="light">
            2023.1 이후 연혁 · 클라이언트 데이터 대기
          </DevLabel>
          <Timeline entries={history.map((entry) => ({ date: entry.date, year: entry.year, title: entry.partner, description: entry.description }))} />
        </div>
      </NumberedSection>

      <div className="py-20 md:py-24">
        <CTABand inset title={page.ctaTitle} ctaLabel="상담 신청하기" />
      </div>
    </>
  );
}
