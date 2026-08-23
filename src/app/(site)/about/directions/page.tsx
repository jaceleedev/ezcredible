import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CTABand } from "@/components/layout/cta-band";
import { NumberedSection } from "@/components/sub/numbered-section";
import { SubHero } from "@/components/sub/sub-hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip, Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/motion/reveal";
import { directionsPage as page, transit } from "@/content/pages/about";
import { company } from "@/content/site";

export const metadata: Metadata = pageMetadata({ title: page.title, description: page.metaDescription, href: page.href });

const query = encodeURIComponent(page.mapQuery);
const naverMapUrl = `https://map.naver.com/p/search/${query}`;
const kakaoMapUrl = `https://map.kakao.com/link/search/${query}`;
/** 키 없이 쓸 수 있는 구글 지도 임베드 — 네이버·카카오는 버튼으로 연다 */
const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed&hl=ko&z=16`;

export default function DirectionsPage() {
  return (
    <>
      <SubHero href={page.href} title={page.title} subtitle={page.subtitle} image={page.banner} />

      <NumberedSection
        index={1}
        title="찾아오시는 곳"
        aside={
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-line bg-soft shadow-card">
            <iframe
              src={embedUrl}
              title="(주)이지크레더블 위치 지도"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          </div>
        }
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Pill tone="brand" className="self-start">
              주소
            </Pill>
            <p className="font-display text-xl font-extrabold leading-snug tracking-tight text-ink md:text-2xl">{company.address}</p>
            <p className="text-[15px] text-body">{page.building}</p>
          </div>
          <dl className="grid grid-cols-[88px_minmax(0,1fr)] gap-y-2 text-[15px]">
            <dt className="font-bold text-cobalt-700">영업시간</dt>
            <dd className="text-body">{company.hours}</dd>
            <dt className="font-bold text-cobalt-700">가까운 역</dt>
            <dd className="text-body">
              {transit.subway.line} {transit.subway.station} {transit.subway.exit} · {transit.subway.walk}
            </dd>
          </dl>
          <div className="flex flex-wrap gap-3">
            <Button href={naverMapUrl} variant="primary">
              네이버 지도로 열기
            </Button>
            <Button href={kakaoMapUrl} variant="outline">
              카카오맵으로 열기
            </Button>
          </div>
        </div>
      </NumberedSection>

      <NumberedSection index={2} title="대중교통 이용" lead="가산디지털단지역에서 걸어오는 길이 가장 빠릅니다. 버스는 디지털3단지 정류장에서 내리시면 됩니다.">
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          <Reveal className="flex">
            <Card tone="navy" padding="lg" className="w-full gap-4">
              <Pill tone="glass" className="self-start">
                지하철
              </Pill>
              <div className="flex flex-col gap-1">
                <div className="font-display text-2xl font-extrabold tracking-tight text-white">
                  {transit.subway.line} {transit.subway.station}
                </div>
                <div className="text-base text-white/80">
                  {transit.subway.exit} · <span className="font-bold text-gold-400">{transit.subway.walk}</span>
                </div>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={90} className="flex">
            <Card padding="lg" className="w-full gap-4">
              <Pill tone="brand" className="self-start">
                주변 버스
              </Pill>
              <dl className="flex flex-col gap-2.5">
                {transit.buses.map((bus) => (
                  <div key={bus.type} className="flex items-center gap-3">
                    <dt className="w-10 shrink-0 text-sm font-bold text-cobalt-700">{bus.type}</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {bus.numbers.map((n) => (
                        <Chip key={n}>{n}</Chip>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>
          <Reveal delay={180} className="flex">
            <Card padding="lg" className="w-full gap-4">
              <Pill tone="brand" className="self-start">
                주변 정류장
              </Pill>
              <ul className="flex flex-col gap-2 text-[15px] text-body">
                {transit.stops.map((stop) => (
                  <li key={stop} className="flex gap-2.5">
                    <span aria-hidden="true" className="font-extrabold text-brand">
                      ·
                    </span>
                    <span>{stop}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </NumberedSection>

      <NumberedSection index={3} title="도보 · 자가용 이용">
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          <Reveal className="flex">
            <Card tone="soft" padding="lg" className="w-full gap-3">
              <div className="font-display text-lg font-extrabold tracking-tight">도보</div>
              {/* 자가용 카드에는 칩이 3개인데 여기는 한 문장뿐이라 카드 안이 비어 보였다.
                  02의 지하철 정보를 칩으로 한 번 더 짚어 두 카드의 무게를 맞춘다 */}
              <div className="flex flex-wrap gap-2">
                <Chip>{transit.subway.station}</Chip>
                <Chip>{transit.subway.exit}</Chip>
                <Chip tone="gold">{transit.subway.walk}</Chip>
              </div>
              <p className="text-[15px] leading-relaxed text-body">{transit.walk}</p>
            </Card>
          </Reveal>
          <Reveal delay={90} className="flex">
            <Card tone="soft" padding="lg" className="w-full gap-3">
              <div className="font-display text-lg font-extrabold tracking-tight">자가용</div>
              <div className="flex flex-wrap gap-2">
                <Chip>{transit.parking.available}</Chip>
                <Chip tone="gold">{transit.parking.free}</Chip>
                <Chip>{transit.parking.after}</Chip>
              </div>
              <p className="text-[15px] leading-relaxed text-body">건물 주차장을 이용하실 수 있습니다. 방문 전에 상담 신청을 남겨 주시면 일정과 주차를 안내해 드립니다.</p>
            </Card>
          </Reveal>
        </div>
      </NumberedSection>

      <div className="py-20 md:py-24">
        <CTABand inset title={page.ctaTitle} ctaLabel="상담 신청하기" />
      </div>
    </>
  );
}
