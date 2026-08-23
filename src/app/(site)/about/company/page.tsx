import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { CTABand } from "@/components/layout/cta-band";
import { PartnerLogos } from "@/components/home/partners";
import { FactStrip } from "@/components/sub/fact-strip";
import { FeatureCards } from "@/components/sub/feature-cards";
import { NumberedSection } from "@/components/sub/numbered-section";
import { SubHero } from "@/components/sub/sub-hero";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ImageStage } from "@/components/ui/image-stage";
import { KeyValueTable } from "@/components/ui/key-value-table";
import { Chip } from "@/components/ui/pill";
import { Reveal } from "@/components/motion/reveal";
import { solutions, stats } from "@/content/home";
import { companyPage as page, companyValues } from "@/content/pages/about";
import { company } from "@/content/site";

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.metaDescription, href: page.href });

export default function CompanyPage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} />

      <NumberedSection
        index={1}
        title="이지크레더블은"
        aside={
          <ImageStage
            tint="sky"
            art="chat"
            src="/images/services/expert.png"
            alt="말풍선 옆의 기업 금융 전문가"
            aspect="photo"
            sizes="(min-width: 560px) 480px, 100vw"
            className="rounded-[28px] shadow-card"
          />
        }
      >
        <Callout>
          <strong>{company.tagline}</strong>
        </Callout>
        <p className="text-base leading-relaxed text-body">{page.intro}</p>
      </NumberedSection>
      <Container className="pt-10 md:pt-12">
        {/* TODO(client): 2023년 수치 — 최신 데이터로 갱신 (src/content/home.ts) */}
        <FactStrip facts={stats.map((stat) => ({ label: stat.label, value: stat.value, unit: stat.unit, plain: stat.plain }))} />
      </Container>

      <NumberedSection index={2} title="세 가지 약속" lead="기업을 대하는 우리의 자세입니다. 상담 첫날부터 자금이 들어온 뒤까지 같은 태도로 일합니다.">
        <FeatureCards items={companyValues} />
      </NumberedSection>

      <NumberedSection
        index={3}
        title="하는 일"
        lead="정책자금 · 유동성자금 · 성장, 세 가지 축으로 자금 확보부터 성장까지 함께합니다. 타사에 비해 다양한 자금과 상품을 다루기 때문에 한 기업에 여러 솔루션을 조합할 수 있습니다."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {solutions.map((solution, i) => (
            <Reveal key={solution.title} delay={i * 100} className="flex">
              <Card padding="none" interactive className="w-full">
                <ImageStage tint={solution.tint} art={solution.art} src={solution.image} alt={solution.title} className="rounded-b-none rounded-t-3xl" label="3D 이미지 자리 · 코덱스" />
                <div className="flex flex-1 flex-col gap-3.5 p-7">
                  <h3 className="text-h3">{solution.title}</h3>
                  <p className="text-[15px] leading-relaxed text-body">{solution.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {solution.items.map((item) => (
                      <Link key={item.href} href={item.href} className="rounded-full">
                        <Chip tone={item.badge ? "gold" : "brand"}>
                          {item.label}
                          {item.badge && ` ${item.badge}`}
                        </Chip>
                      </Link>
                    ))}
                  </div>
                  <Button variant="link" href={solution.href} className="mt-auto pt-2 text-sm">
                    <span className="sr-only">{`${solution.title} `}</span>자세히 보기
                  </Button>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </NumberedSection>

      <NumberedSection index={4} title="함께하는 기관" lead="정책자금을 지원하는 기관과 이지크레더블이 업무를 위탁받은 회사들입니다.">
        {/* 홈의 로고 두 줄을 그대로 */}
        <PartnerLogos className="flex flex-col gap-12" />
      </NumberedSection>

      <NumberedSection index={5} title="회사 정보">
        <Reveal>
          <KeyValueTable
            rows={[
              { label: "상호", value: `${company.name} (${company.nameEn})` },
              { label: "대표자", value: company.ceo },
              { label: "설립", value: page.founded },
              { label: "사업자등록번호", value: company.bizNo },
              { label: "주소", value: company.address },
              { label: "영업시간", value: company.hours },
            ]}
          />
        </Reveal>
      </NumberedSection>

      <div className="py-20 md:py-24">
        <CTABand inset title={page.ctaTitle} ctaLabel="상담 신청하기" />
      </div>
    </>
  );
}
