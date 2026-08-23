import { company, seo } from "@/content/site";
import { ogImage } from "@/lib/metadata";

/**
 * 구조화 데이터(JSON-LD). 검색엔진이 "이 사이트는 어떤 회사이고 이 페이지는 어디에 있는가"를
 * 본문 파싱에 의존하지 않고 읽게 한다.
 *
 * 원칙: 화면에 실제로 보이는 사실만 넣는다. 확인되지 않은 값(대표 전화번호, SNS 계정 등)은
 * 비워 두고 클라이언트 확인 후 채운다 — 없는 값을 지어 넣으면 구조화 데이터 위반이다.
 */

// 루트는 company.url 그대로 쓴다. new URL("/", ...)는 끝에 슬래시를 붙이는데
// canonical·사이트맵은 슬래시 없는 형태라 표기가 갈린다.
const abs = (path: string) => (path === "/" ? company.url : new URL(path, company.url).toString());

/** 사이트 전체에서 하나뿐인 회사 노드. 다른 노드가 @id로 이걸 가리킨다 */
export const organizationId = `${company.url}/#organization`;
const websiteId = `${company.url}/#website`;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: company.name,
    legalName: company.name,
    alternateName: company.nameEn,
    url: company.url,
    logo: abs("/brand/ezcredible-logo.svg"),
    image: abs(ogImage.url),
    description: seo.description,
    // 사업자등록번호 — 푸터에 이미 공개돼 있는 값
    taxID: company.bizNo,
    founder: { "@type": "Person", name: company.ceo },
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressRegion: "서울특별시",
      addressLocality: "금천구",
      streetAddress: "서부샛길 606, 대성디폴리스 B동 2006-2호",
    },
    areaServed: { "@type": "Country", name: "대한민국" },
    // TODO(client): 대표 전화·이메일을 받으면 contactPoint를, SNS 계정이 있으면 sameAs를 추가한다
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: company.url,
    name: company.name,
    description: seo.description,
    inLanguage: "ko-KR",
    publisher: { "@id": organizationId },
  };
}

export type BreadcrumbItem = { label: string; href?: string };

/**
 * 브레드크럼. 화면에 보이는 Breadcrumb 컴포넌트와 순서·문구가 같아야 한다
 * (보이지 않는 경로를 표시하면 구조화 데이터 위반).
 * 마지막 항목은 현재 페이지라 링크를 걸지 않으므로 item도 넣지 않는다.
 */
export function breadcrumbLd(items: BreadcrumbItem[]) {
  const all: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(i < all.length - 1 && item.href ? { item: abs(item.href) } : {}),
    })),
  };
}
