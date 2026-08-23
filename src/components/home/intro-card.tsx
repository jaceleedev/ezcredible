import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Stat, StatGrid } from "@/components/ui/stat";
import { Reveal } from "@/components/motion/reveal";
import { stats } from "@/content/home";

/** 히어로 아래로 겹쳐 올라오는 네이비 회사소개 + 수치 카드 */
export function IntroCard() {
  return (
    <Container className="relative z-10 -mt-16 lg:-mt-24">
      <Reveal variant="scale">
        <div className="grid overflow-hidden rounded-4xl bg-navy text-white shadow-float lg:grid-cols-[1.05fr_1fr]">
          <div className="relative flex flex-col items-start justify-center gap-4 overflow-hidden p-8 sm:p-12 lg:p-14">
            <Image
              src="/images/arrow-3d.png"
              alt=""
              aria-hidden="true"
              width={1400}
              height={780}
              className="pointer-events-none absolute -bottom-8 -right-10 w-[420px] opacity-90"
            />
            <div className="relative text-[13px] font-bold tracking-[0.12em] text-cobalt-300">회사소개</div>
            <h2 className="relative max-w-md text-h2 text-white">
              기업의 가능성을
              <br />
              현실로 만드는 파트너
            </h2>
            <p className="relative max-w-sm text-[15px] leading-relaxed text-white/78">
              금융업계에서 오랜 경력을 가진 전문가가 상담 신청부터 자금 확보, 그 이후의 관리까지 함께합니다.
            </p>
            <Button href="/about/company" variant="link" className="relative text-white hover:text-cobalt-200">
              <span className="sr-only">회사소개 </span>자세히 보기
            </Button>
          </div>
          <div className="border-t border-white/10 bg-white/4 lg:border-l lg:border-t-0">
            <StatGrid>
              {stats.map((stat) => (
                <Stat key={stat.label} label={stat.label} value={stat.value} unit={stat.unit} plain={stat.plain} />
              ))}
            </StatGrid>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
