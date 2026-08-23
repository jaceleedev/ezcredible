import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ImageStage } from "@/components/ui/image-stage";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/content/home";

export function Services() {
  return (
    <Section tone="soft">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeader align="center" eyebrow="차별화된 서비스" eyebrowTone="white" title="이지크레더블은 이런 면에서 다릅니다" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 100} className="flex">
              <Card padding="none" className="w-full items-center text-center shadow-soft">
                <ImageStage tint={service.tint} art={service.art} src={service.image} alt={service.title} className="m-4 rounded-2xl" />
                <div className="flex flex-col gap-2.5 px-8 pb-9 pt-3">
                  <h3 className="font-display text-[22px] font-extrabold tracking-tight">{service.title}</h3>
                  <p className="text-[15px] leading-relaxed text-body">{service.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
