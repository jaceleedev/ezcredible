import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ImageStage } from "@/components/ui/image-stage";
import { Chip } from "@/components/ui/pill";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { solutions } from "@/content/home";

export function Solutions() {
  return (
    <Section id="solutions" className="scroll-mt-20 pt-28 md:pt-36">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="맞춤형 솔루션"
            title="당신의 기업에 날개를 다세요!"
            lead="정책자금 · 유동성자금 · 성장, 세 가지 축으로 자금 확보부터 성장까지 함께합니다."
          />
        </Reveal>
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
      </Container>
    </Section>
  );
}
