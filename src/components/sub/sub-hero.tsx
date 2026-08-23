import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { consultationHref, consultationLink, nav, type ConsultationTopic } from "@/content/site";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Halftone } from "@/components/ui/halftone";
import { SubNav } from "@/components/ui/sub-nav";
import { DevLabel } from "@/components/home/dev-label";

type SubHeroProps = {
  /** 현재 페이지 경로. 브레드크럼·서브내비 활성 항목을 site.ts의 nav에서 찾는다 */
  href: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** 배너 사진(코덱스 2000×600). 없으면 코발트 스테이지 그라디언트 */
  image?: { src: string; alt?: string };
  /** 임시 이미지 표시 — 프로덕션에서는 렌더되지 않는다 */
  imageLabel?: string;
  /** 서브내비를 숨긴다(개인정보처리방침처럼 형제 메뉴가 의미 없는 페이지) */
  hideSubNav?: boolean;
  className?: string;
};

/** 그룹 경로(/policy-funds/...)를 상담 폼의 희망 솔루션 값으로 */
function topicOf(groupHref: string): ConsultationTopic | undefined {
  const seg = groupHref.split("/")[1];
  return seg === "policy-funds" || seg === "liquidity-funds" || seg === "growth" ? seg : undefined;
}

/**
 * 서브페이지 배너. 사진 + 네이비 오버레이 + 하프톤 위에 브레드크럼·h1·부제가 놓이고,
 * 배너 아래로 알약형 서브내비가 겹쳐 뜬다(캔버스 Sub 보드).
 * 헤더가 이 배너 위에 흰색으로 얹히므로 상단 여백이 헤더 높이를 포함한다.
 */
export function SubHero({ href, title, subtitle, image, imageLabel, hideSubNav = false, className }: SubHeroProps) {
  const group = nav.find((g) => g.items.some((item) => item.href === href));
  const current = group?.items.find((item) => item.href === href);
  const crumbs = [
    ...(group ? [{ label: group.label, href: group.href }] : []),
    { label: current?.label ?? (typeof title === "string" ? title : "") },
  ];

  return (
    <div className={cn("relative", className)}>
      <section className={cn("relative overflow-hidden text-white", image ? "bg-navy" : "stage-cobalt")}>
        {image ? (
          <>
            <Image src={image.src} alt={image.alt ?? ""} fill priority sizes="100vw" className="object-cover" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,30,77,0.55)_0%,rgba(11,30,77,0.35)_50%,rgba(11,30,77,0.78)_100%)]"
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(640px_420px_at_80%_20%,rgba(245,185,64,0.16),transparent_62%),radial-gradient(700px_500px_at_10%_80%,rgba(66,113,244,0.5),transparent_65%)]"
          />
        )}
        <Halftone corner="br" className="h-[300px] w-[560px]" />

        <Container className="relative flex flex-col gap-4 pb-24 pt-32 md:gap-5 md:pb-36 md:pt-40">
          <Breadcrumb items={crumbs} />
          <h1 className="text-h1 text-white">{title}</h1>
          {subtitle && <p className="max-w-2xl text-lead text-white/86">{subtitle}</p>}
        </Container>

        {image && imageLabel && <DevLabel className="bottom-14 right-6">{imageLabel}</DevLabel>}
      </section>

      {!hideSubNav && group && (
        <Container className="relative z-10 -mt-9">
          <SubNav
            items={group.items}
            current={href}
            // 상담신청 페이지 자체에서는 같은 페이지로 가는 버튼을 보이지 않는다
            action={
              href === consultationHref ? undefined : (
                <Button variant="navy" size="sm" href={consultationLink(topicOf(group.href))}>
                  빠른 상담신청
                </Button>
              )
            }
          />
        </Container>
      )}
    </div>
  );
}
