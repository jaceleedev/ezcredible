import type { Metadata } from "next";
import Image from "next/image";
import { Halftone } from "@/components/ui/halftone";
import { Logo } from "@/components/ui/logo";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "OG 이미지 카드",
  robots: { index: false, follow: false },
};

/**
 * 공유 썸네일(1200×630) 원본. 이 화면을 1200×630 뷰포트로 캡처해 src/app/opengraph-image.png로 저장한다.
 * 코덱스 3D 이미지로 교체한 뒤에는 다시 캡처할 것. 본문 영역만 정확히 1200×630이고 페이지 헤더는 가려진다.
 */
export default function OgCardPage() {
  return (
    <div className="fixed inset-0 z-[100] bg-white">
      <div id="og-card" className="stage-cobalt relative h-[630px] w-[1200px] overflow-hidden text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(560px_420px_at_78%_60%,rgba(245,185,64,0.22),transparent_62%),radial-gradient(600px_480px_at_15%_20%,rgba(66,113,244,0.55),transparent_65%)]"
        />
        <Halftone corner="tl" className="h-[320px] w-[480px]" />
        <Halftone corner="br" />
        <div aria-hidden="true" className="absolute -right-10 top-6 size-[520px] rounded-full bg-white/10" />
        <div aria-hidden="true" className="absolute -right-24 -top-12 size-[640px] rounded-full border border-white/14" />

        <div className="relative flex h-full flex-col justify-between p-16">
          <div className="flex items-center gap-3">
            <Logo variant="mark" tone="white" priority className="h-9" />
            <span className="text-[26px] font-bold tracking-tight text-white">(주)이지크레더블</span>
          </div>
          <div className="flex max-w-[640px] flex-col gap-5">
            <div className="text-[62px] font-extrabold leading-[1.15] tracking-[-0.03em] text-white [font-family:var(--font-display)]">
              기업의 가능성을
              <br />
              현실로 만드는 파트너
            </div>
            <div className="text-[24px] text-white/85">정책자금 · 유동성자금 · 성장 솔루션</div>
          </div>
          <div className="text-[20px] font-semibold text-white/70">{company.url.replace("https://", "")}</div>
        </div>

        <Image
          src="/images/temp/hero-3d.png"
          alt=""
          width={880}
          height={511}
          priority
          className="absolute -right-6 top-[120px] w-[560px] drop-shadow-[0_40px_60px_rgba(4,12,40,0.45)]"
        />
      </div>
    </div>
  );
}
