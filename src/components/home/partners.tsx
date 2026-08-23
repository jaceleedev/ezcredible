import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { clients, supportInstitutions, type PartnerLogo } from "@/content/home";

function LogoRow({ title, description, logos, columns }: { title: string; description: string; logos: PartnerLogo[]; columns: 3 | 4 }) {
  return (
    <Reveal className="grid items-center gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-[26px] font-extrabold tracking-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-muted">{description}</p>
      </div>
      <ul className={columns === 3 ? "grid grid-cols-2 gap-4 sm:grid-cols-3" : "grid grid-cols-2 gap-4 sm:grid-cols-4"}>
        {logos.map((logo) => (
          <li key={logo.name} className="flex h-20 items-center justify-center rounded-2xl border border-line bg-white px-6 lg:h-24">
            <div className="relative w-full" style={{ height: logo.maxHeight }}>
              <Image src={logo.src} alt={logo.name} fill sizes="200px" className="object-contain" />
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/** 지원기관·업무위탁 — 실제 기관 로고 그대로 */
export function Partners() {
  return (
    <Section compact>
      <Container className="flex flex-col gap-14">
        <LogoRow title="지원기관" description="정책자금을 지원하는 기관들입니다." logos={supportInstitutions} columns={3} />
        <LogoRow title="업무위탁" description="이지크레더블이 업무를 위탁받은 회사들입니다." logos={clients} columns={4} />
      </Container>
    </Section>
  );
}
