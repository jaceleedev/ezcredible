export type NavItem = { label: string; href: string; external?: boolean };
export type NavGroup = { label: string; href: string; items: NavItem[] };

/** 회사 기본 정보 — 푸터·연락처·메타데이터에서 공용으로 사용 */
export const company = {
  name: "(주)이지크레더블",
  nameEn: "EZCREDIBLE",
  ceo: "이주환",
  bizNo: "777-88-01524",
  address: "서울시 금천구 서부샛길 606, 대성디폴리스 B동 2006-2호",
  hours: "평일 09:00 ~ 18:00",
  tagline: "(주)이지크레더블은 비즈니스 성공을 위한, 현대적인 기업 금융 솔루션 회사입니다.",
  description:
    "(주)이지크레더블은 전문적이고, 안전하며, 고객 중심의 기업 금융 솔루션을 제공하는 회사입니다.",
  url: "https://www.ezcredible.com",
} as const;

/** 인증 파트너 — 대표님 지인 회사. 업무 협약사 섹션과는 별개의 콘텐츠로 다룬다. */
export const certificationPartner = {
  name: "지속가능경영연구원",
  nameEn: "ISMRI",
  url: "https://www.ismri.org",
} as const;

/**
 * 사이트 내비게이션. 기존 사이트의 URL 구조를 그대로 유지한다(검색 유입 보존).
 * 렌탈 솔루션과 업무 협약사는 클라이언트 결정으로 제거됐다.
 */
export const nav: NavGroup[] = [
  {
    label: "회사소개",
    href: "/about/company",
    items: [
      { label: "회사소개", href: "/about/company" },
      { label: "회사연혁", href: "/about/history" },
      { label: "업무절차", href: "/about/procedure" },
      { label: "오시는길", href: "/about/directions" },
    ],
  },
  {
    label: "정책자금 솔루션",
    href: "/policy-funds/operating",
    items: [
      { label: "운전자금", href: "/policy-funds/operating" },
      { label: "B2B구매자금", href: "/policy-funds/b2b-purchase" },
      { label: "시설자금", href: "/policy-funds/facility" },
      { label: "소상공인자금", href: "/policy-funds/small-business" },
    ],
  },
  {
    label: "유동성자금 솔루션",
    href: "/liquidity-funds/receivables-factoring",
    items: [
      { label: "매출채권 팩토링", href: "/liquidity-funds/receivables-factoring" },
      { label: "의료사업자 대출", href: "/liquidity-funds/medical-business-loans" },
      { label: "전자어음할인", href: "/liquidity-funds/electronic-bills-discount" },
    ],
  },
  {
    label: "성장 솔루션",
    href: "/growth/corporate-credit-evaluation",
    items: [
      { label: "기업신용평가", href: "/growth/corporate-credit-evaluation" },
      { label: "PG", href: "/growth/pg" },
      { label: "VAN", href: "/growth/van" },
      { label: "기업인증", href: "/growth/certification" },
    ],
  },
  {
    label: "고객지원",
    href: "/support/consultation",
    items: [
      { label: "상담신청", href: "/support/consultation" },
      { label: "개인정보처리방침", href: "/support/privacy-policy" },
    ],
  },
];

export const consultationHref = "/support/consultation";
