import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { cases } from "@/content/cases";
import { CaseCarousel } from "./case-carousel";

export function Cases() {
  return (
    <Section tone="cobalt" halftone>
      <Container className="relative flex flex-col gap-6">
        <Reveal>
          <SectionHeader
            tone="dark"
            eyebrow="성공사례"
            title="숫자로 확인하는 성공사례"
            lead="업체명은 비식별 처리되어 있습니다. 최신 사례는 상담 시 안내해 드립니다."
          />
        </Reveal>
        <Reveal delay={120}>
          <CaseCarousel cases={cases} />
        </Reveal>
      </Container>
    </Section>
  );
}
