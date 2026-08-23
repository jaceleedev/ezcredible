import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Halftone } from "@/components/ui/halftone";
import { ImageStage } from "@/components/ui/image-stage";
import { Pill } from "@/components/ui/pill";
import { ArrowRight } from "@/components/ui/icons";
import { consultationHref, nav } from "@/content/site";

/** 404 본문 — 헤더가 흰색으로 얹히도록 위쪽은 코발트 스테이지, 아래는 전체 메뉴 */
export function NotFoundView() {
  return (
    <>
      <section className="stage-cobalt relative overflow-hidden text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(640px_420px_at_80%_30%,rgba(245,185,64,0.18),transparent_62%),radial-gradient(700px_500px_at_10%_80%,rgba(66,113,244,0.5),transparent_65%)]"
        />
        <Halftone corner="tl" className="h-[360px]" />
        <Halftone corner="br" />
        <Container className="relative grid items-center gap-10 pb-20 pt-36 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:pb-28 lg:pt-44">
          <div className="flex flex-col items-start gap-6">
            <Pill tone="glass" dot="gold">
              404 · Page not found
            </Pill>
            <h1 className="text-hero text-white">
              페이지를
              <br />
              찾을 수 없습니다
            </h1>
            <p className="max-w-lg text-lead text-white/86">주소가 바뀌었거나 삭제된 페이지입니다. 찾으시는 내용은 아래 메뉴에서 골라 주시거나, 상담을 남겨 주시면 담당자가 안내해 드립니다.</p>
            <div className="flex flex-wrap gap-3">
              <Button href="/" variant="white" size="lg">
                홈으로 가기
              </Button>
              <Button href={consultationHref} variant="ghost" size="lg">
                상담 신청하기
              </Button>
            </div>
          </div>
          <ImageStage tint="navy" art="document" aspect="photo" label="" className="rounded-[28px] border border-white/10 shadow-float" />
        </Container>
      </section>

      <Container className="py-20 md:py-24">
        <h2 className="text-h3">전체 메뉴</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {nav.map((group) => (
            <div key={group.href} className="flex flex-col gap-3">
              <Link href={group.href} className="font-display text-base font-extrabold tracking-tight text-ink hover:text-brand-strong">
                {group.label}
              </Link>
              <ul className="flex flex-col gap-1.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="group inline-flex items-center gap-1.5 text-[15px] text-body hover:text-brand-strong">
                      {item.label}
                      <ArrowRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
