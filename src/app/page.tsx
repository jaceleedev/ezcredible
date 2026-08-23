import { CTABand } from "@/components/layout/cta-band";
import { Cases } from "@/components/home/cases";
import { Certification } from "@/components/home/certification";
import { Hero } from "@/components/home/hero";
import { IntroCard } from "@/components/home/intro-card";
import { Partners } from "@/components/home/partners";
import { Services } from "@/components/home/services";
import { Solutions } from "@/components/home/solutions";
import { company } from "@/content/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  alternateName: company.nameEn,
  url: company.url,
  logo: `${company.url}/brand/ezcredible-logo.svg`,
  description: company.description,
  address: {
    "@type": "PostalAddress",
    addressCountry: "KR",
    addressRegion: "서울특별시",
    addressLocality: "금천구",
    streetAddress: "서부샛길 606, 대성디폴리스 B동 2006-2호",
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
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
