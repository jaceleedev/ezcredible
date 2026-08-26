export type NavItem = { label: string; href: string; external?: boolean };
export type NavGroup = { label: string; href: string; items: NavItem[] };

/** 회사 기본 정보 — 푸터·연락처·메타데이터에서 공용으로 사용 */
export const company = {
  name: "(주)이지크레더블",
  nameEn: "EZCREDIBLE",
  ceo: "이주환",
  bizNo: "777-88-01524",
  // 2026-08-26 대표 확인 주소(마곡 이전) — 오시는길 페이지는 같은 피드백으로 삭제됐다
  address: "서울시 강서구 마곡중앙로 165, 프라이빗타워1차 816-817호",
  hours: "평일 09:00 ~ 18:00",
  // "현대적인" 수식어는 대표 지시로 뺐다(2026-08-26) — 다시 넣지 말 것
  tagline: "(주)이지크레더블은 비즈니스 성공을 위한 기업 금융 솔루션 회사입니다.",
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
 * 2026-08-26 대표 피드백: 오시는길·소상공인자금·의료사업자 대출·PG·VAN 페이지 삭제(리다이렉트 없이 404 — Jace 결정).
 */
export const nav: NavGroup[] = [
  {
    label: "회사소개",
    href: "/about/company",
    items: [
      { label: "회사소개", href: "/about/company" },
      { label: "회사연혁", href: "/about/history" },
      { label: "업무절차", href: "/about/procedure" },
    ],
  },
  {
    label: "정책자금 솔루션",
    href: "/policy-funds/operating",
    items: [
      { label: "운전자금", href: "/policy-funds/operating" },
      { label: "B2B구매자금", href: "/policy-funds/b2b-purchase" },
      { label: "시설자금", href: "/policy-funds/facility" },
    ],
  },
  {
    label: "유동성자금 솔루션",
    href: "/liquidity-funds/receivables-factoring",
    items: [
      { label: "매출채권 팩토링", href: "/liquidity-funds/receivables-factoring" },
      { label: "전자어음할인", href: "/liquidity-funds/electronic-bills-discount" },
    ],
  },
  {
    label: "성장 솔루션",
    href: "/growth/corporate-credit-evaluation",
    items: [
      { label: "기업신용평가", href: "/growth/corporate-credit-evaluation" },
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

/**
 * 검색 결과에 뜨는 홈 제목·설명. company.name/description과 따로 두는 이유는
 * 홈이 브랜드명만으로는 "정책자금", "매출채권 팩토링" 같은 검색어에 걸리지 않기 때문이다.
 * 서브페이지는 각 content/pages/*.ts의 title·metaDescription을 쓴다.
 */
export const seo = {
  title: "(주)이지크레더블 | 정책자금·유동성자금 기업금융 컨설팅",
  description:
    "중소기업·소상공인을 위한 정책자금, 매출채권 팩토링·전자어음할인 등 유동성자금, 기업신용평가·기업인증 성장 솔루션을 제공하는 기업금융 컨설팅 회사입니다.",
} as const;

/**
 * 검색엔진 소유확인 코드. 네이버 서치어드바이저 / 구글 서치콘솔에서 받아 채운다.
 * 비어 있으면 메타 태그를 아예 렌더하지 않는다.
 */
export const searchConsole = {
  // 2026-08-27 발급 (네이버 서치어드바이저 · 구글 서치콘솔 — Jace 계정)
  naver: "d52a6e3723d0ec3585600dc48e069686d153a763",
  google: "-AgEuHtsZ56_VAD9OxERyh6JODBspHelwBq9fd74f50",
} as const;

/**
 * 사이트맵 lastmod에 쓰는 콘텐츠 개정일(YYYY-MM-DD).
 * new Date()를 쓰면 배포할 때마다 "전 페이지가 방금 바뀌었다"고 알리는 셈이라
 * 크롤러가 lastmod 자체를 신뢰하지 않게 된다. 본문을 실제로 고칠 때 이 값을 올린다.
 */
export const contentRevised = "2026-08-27";

/** 개인정보 보호책임자 — 개인정보처리방침 제12조에 렌더된다. 확인된 연락처만 표시한다. */
export const privacyOfficer: { name: string; title: string; email: string; phone: string } = {
  name: "이주환",
  title: "대표이사",
  email: "",
  phone: "010-2747-4363",
};

/** 상담 신청 폼의 희망 솔루션 — value는 URL 쿼리(?topic=)와 API 검증에 같이 쓴다 */
export const consultationTopics = [
  { value: "policy-funds", label: "정책자금 솔루션" },
  { value: "liquidity-funds", label: "유동성자금 솔루션" },
  { value: "growth", label: "성장 솔루션" },
  { value: "certification", label: "기업인증" },
  { value: "other", label: "잘 모르겠어요 · 기타" },
] as const;

export type ConsultationTopic = (typeof consultationTopics)[number]["value"];

/** 페이지 그룹에 맞는 희망 솔루션이 미리 선택된 상담 신청 링크 */
export function consultationLink(topic?: ConsultationTopic) {
  return topic ? `${consultationHref}?topic=${topic}` : consultationHref;
}
