import Link from "next/link";
import { company, consultationHref, nav } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ArrowUp } from "@/components/ui/icons";

/** 기존 사이트의 회사 정보 블록을 그대로 유지한 푸터 */
export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <Container className="flex flex-col gap-10 py-14 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <Logo variant="lockup" tone="white" className="h-20" />
          <div className="flex flex-col gap-6 md:items-end">
            <div className="flex items-center gap-4 text-sm font-semibold">
              <Link href={consultationHref} className="hover:text-cobalt-300">
                상담신청
              </Link>
              <span aria-hidden="true" className="h-3 w-px bg-white/30" />
              <Link href="/support/privacy-policy" className="hover:text-cobalt-300">
                개인정보처리방침
              </Link>
              <a
                href="#top"
                aria-label="맨 위로"
                className="ml-2 flex size-12 items-center justify-center rounded-full bg-brand text-white shadow-[0_12px_28px_-8px_rgba(66,113,244,0.7)] transition-colors hover:bg-cobalt-600"
              >
                <ArrowUp size={20} />
              </a>
            </div>
            <nav aria-label="푸터 메뉴" className="hidden flex-wrap gap-x-5 gap-y-2 text-sm text-white/60 md:flex">
              {nav.map((group) => (
                <Link key={group.href} href={group.href} className="hover:text-white">
                  {group.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/12 pt-7">
          <p className="text-base font-semibold text-white/90">{company.tagline}</p>
          <p className="text-[13px] leading-[1.9] text-white/60">
            상호 : {company.name} &nbsp;|&nbsp; 대표자 : {company.ceo} &nbsp;|&nbsp; 사업자등록번호 : {company.bizNo}
            <br />
            주소 : {company.address}
            <br />
            Copyright(c) <span className="font-bold text-cobalt-300">{company.nameEn}</span>. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
