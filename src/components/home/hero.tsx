import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Halftone } from "@/components/ui/halftone";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/motion/reveal";
import { cases } from "@/content/cases";
import { consultationHref } from "@/content/site";
import { DevLabel } from "./dev-label";

export function Hero() {
  const featured = cases[0];

  return (
    <section className="stage-cobalt relative overflow-hidden text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(640px_520px_at_74%_58%,rgba(245,185,64,0.22),transparent_62%),radial-gradient(700px_600px_at_20%_20%,rgba(66,113,244,0.55),transparent_65%)]"
      />
      <Halftone corner="tl" className="h-[420px]" />
      <Halftone corner="br" />

      <Container className="relative grid items-center gap-12 pb-28 pt-36 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:pb-44 lg:pt-48">
        <div className="flex flex-col items-start gap-7">
          <Reveal>
            <Pill tone="glass" dot="gold">
              전문적이며, 안전하고, 고객 중심의 기업 금융 솔루션
            </Pill>
          </Reveal>
          <h1 className="text-hero text-white">
            <span className="reveal-line" style={{ "--i": 0 } as React.CSSProperties}>
              <span>이지크레더블은</span>
            </span>
            <span className="reveal-line" style={{ "--i": 1 } as React.CSSProperties}>
              <span>
                <span className="underline-sweep" style={{ "--sweep-delay": "1100ms" } as React.CSSProperties}>
                  미래를 디자인하는
                </span>
              </span>
            </span>
            <span className="reveal-line" style={{ "--i": 2 } as React.CSSProperties}>
              <span>파트너입니다.</span>
            </span>
          </h1>
          <Reveal delay={160}>
            <p className="max-w-lg text-lead text-white/86">
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
              <Button href="#solutions" variant="ghost" size="lg" icon="none">
                솔루션 둘러보기
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:h-[560px] lg:max-w-none">
          {/* 흰 원·링은 섹션이 아니라 이 컬럼 기준 — 화면 폭이 넓어져도 돈주머니와 같이 움직인다 */}
          <div aria-hidden="true" className="absolute -top-1 right-10 hidden size-[620px] rounded-full bg-white/10 lg:block" />
          <div aria-hidden="true" className="absolute -right-[30px] -top-[75px] hidden size-[760px] rounded-full border border-white/14 lg:block" />
          <Reveal variant="scale" delay={200} className="lg:absolute lg:-right-5 lg:top-2 lg:w-[680px]">
            <div className="animate-float">
              <Image
                src="/images/temp/hero-3d.png"
                alt="자금 확보를 상징하는 3D 오브젝트"
                width={880}
                height={511}
                priority
                sizes="(min-width: 1024px) 680px, 90vw"
                className="h-auto w-full drop-shadow-[0_40px_60px_rgba(4,12,40,0.45)]"
              />
            </div>
          </Reveal>

          <Reveal delay={520} className="relative mt-2 lg:absolute lg:bottom-[70px] lg:left-0 lg:mt-0 lg:min-w-[230px]">
            <div className="flex flex-col gap-1.5 rounded-2xl bg-white/92 p-4 text-ink shadow-[0_24px_48px_-16px_rgba(4,12,40,0.5)]">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted">
              <span aria-hidden="true" className="size-[7px] rounded-full bg-emerald-500" />
              성공사례 · {featured.industry}
            </div>
            <div className="font-display text-xl font-extrabold tracking-tight">
              {featured.product} {featured.amount}
            </div>
            <div className="text-[13px] text-body">
              소요기간 {featured.duration} · {featured.issue} 해결
            </div>
            </div>
          </Reveal>

          <Reveal delay={660} className="hidden lg:absolute lg:right-10 lg:top-10 lg:block">
            <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-navy/70 px-4 py-3 text-[13px] font-semibold shadow-[0_16px_32px_-12px_rgba(4,12,40,0.6)]">
            <span className="font-display text-lg font-extrabold text-gold-400">2,000억+</span>
            <span className="text-white/80">누적 솔루션 금액</span>
            </div>
          </Reveal>

          <DevLabel className="bottom-6 right-0 hidden lg:block">임시 이미지 · 코덱스 3D로 교체</DevLabel>
        </div>
      </Container>
    </section>
  );
}
