import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Halftone } from "@/components/ui/halftone";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/motion/reveal";
import { consultationHref } from "@/content/site";

/** 임시 홈 — 디자인 시스템 검증용. 실제 홈은 다음 단계에서 조립한다. */
export default function Home() {
  return (
    <section className="stage-cobalt relative overflow-hidden pb-32 pt-44 text-white">
      <Halftone corner="tl" />
      <Halftone corner="br" />
      <Container className="relative flex flex-col items-start gap-7">
        <Reveal>
          <Pill tone="glass" dot="gold">
            전문적이며, 안전하고, 고객 중심의 기업 금융 솔루션
          </Pill>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="text-hero text-white">
            이지크레더블은
            <br />
            미래를 디자인하는
            <br />
            파트너입니다.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="max-w-lg text-lead text-white/85">
            당신의 비즈니스가 어려움에 부딪혀도,
            <br />
            포기하지 않고 가능성을 찾아내겠습니다.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="flex flex-wrap gap-3">
            <Button href={consultationHref} variant="white" size="lg">
              상담 신청하기
            </Button>
            <Button href="/design-system" variant="ghost" size="lg" icon="none">
              디자인 시스템 보기
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
