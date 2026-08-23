import { CTABand } from "@/components/layout/cta-band";
import { Cases } from "@/components/home/cases";
import { Certification } from "@/components/home/certification";
import { Hero } from "@/components/home/hero";
import { IntroCard } from "@/components/home/intro-card";
import { Partners } from "@/components/home/partners";
import { Services } from "@/components/home/services";
import { Solutions } from "@/components/home/solutions";
import { company } from "@/content/site";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationLd, websiteLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationLd(), websiteLd()]} />
      <Hero />
      <IntroCard />
      <Solutions />
      <Cases />
      <Services />
      <Certification />
      <Partners />
      <CTABand
        variant="photo"
        image={{ src: "/images/cta-character.jpg", alt: "" }}
        title={
          <>
            도약할 준비가
            <br />
            되셨나요?
          </>
        }
        lead={`정확한 상담을 받아보세요! ${company.hours}`}
        ctaLabel="상담하기"
      />
    </>
  );
}
