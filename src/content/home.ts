import type { StageArtKind } from "@/components/ui/stage-art";

/** 홈 히어로·회사소개 카드의 수치. TODO(client): 2026 기준으로 갱신 */
export const stats: { label: string; value: number; unit: string; plain?: boolean }[] = [
  { label: "창립", value: 2019, unit: "년", plain: true },
  { label: "고객 만족도", value: 100, unit: "%" },
  { label: "솔루션 성공", value: 500, unit: "+건" },
  { label: "솔루션 금액", value: 2000, unit: "+억" },
];

export type Solution = {
  title: string;
  description: string;
  href: string;
  tint: "sky" | "mint" | "lavender";
  art: StageArtKind;
  /** 코덱스 3D 이미지가 오면 여기에 경로 */
  image?: string;
  items: { label: string; href: string; badge?: string }[];
};

export const solutions: Solution[] = [
  {
    title: "정책자금 솔루션",
    description: "세밀한 분석으로 자금 확보를 도와드립니다.",
    href: "/policy-funds/operating",
    tint: "sky",
    art: "document",
    image: "/images/solutions/policy-funds.png",
    items: [
      { label: "운전자금", href: "/policy-funds/operating" },
      { label: "B2B구매자금", href: "/policy-funds/b2b-purchase" },
      { label: "시설자금", href: "/policy-funds/facility" },
    ],
  },
  {
    title: "유동성자금 솔루션",
    description: "필요한 자금을 부채 없이 마련합니다.",
    href: "/liquidity-funds/receivables-factoring",
    tint: "mint",
    art: "coins",
    image: "/images/solutions/liquidity-funds.png",
    items: [
      { label: "매출채권 팩토링", href: "/liquidity-funds/receivables-factoring" },
      { label: "전자어음할인", href: "/liquidity-funds/electronic-bills-discount" },
    ],
  },
  {
    title: "성장 솔루션",
    description: "지속적 성장을 위해 필요한 것들을 제시합니다.",
    href: "/growth/corporate-credit-evaluation",
    tint: "lavender",
    art: "bars",
    image: "/images/solutions/growth.png",
    items: [
      { label: "기업신용평가", href: "/growth/corporate-credit-evaluation" },
      { label: "기업인증", href: "/growth/certification", badge: "NEW" },
    ],
  },
];

export const services: { title: string; description: string; tint: "sky" | "mint" | "lavender"; art: StageArtKind; image?: string }[] = [
  {
    title: "전문가가 끝까지 함께",
    description: "기업 금융 전문가가 상담 신청부터 자금 확보까지 함께합니다.",
    tint: "sky",
    art: "chat",
    image: "/images/services/expert.png",
  },
  {
    title: "종합 솔루션 제공",
    description: "타사에 비해 다양한 자금과 상품을 다루고 있어 종합적인 솔루션 제공이 가능합니다.",
    tint: "mint",
    art: "shelf",
    image: "/images/services/shelf.png",
  },
  {
    title: "성공 이후에도 계속",
    description: "솔루션 성공 이후에도 지속적인 관리와 더불어 추가적인 솔루션을 제안합니다.",
    tint: "lavender",
    art: "check",
    image: "/images/services/checklist.png",
  },
];

/** 기업 인증 — 파트너 지속가능경영연구원(ISMRI)의 서비스 분류를 따른다 */
export const certificationGroups = [
  { title: "경영인증", description: "벤처기업 · 이노비즈 · 메인비즈 · 소부장 전문기업" },
  { title: "경영시스템인증", description: "ISO 9001 · 14001 · 45001 · 27001 통합 구축" },
  { title: "기술·조달인증", description: "NET · NEP · 조달우수제품 · 혁신제품" },
  { title: "기업신용등급", description: "TCB 기술신용평가 · 보증 한도 확대 · 금리 우대" },
];

export type PartnerLogo = { name: string; src: string; /** 로고 박스 안 최대 높이(px) */ maxHeight: number };

/** 정책자금 지원기관 */
export const supportInstitutions: PartnerLogo[] = [
  { name: "신용보증기금", src: "/images/partners/kodit.png", maxHeight: 40 },
  { name: "기술보증기금", src: "/images/partners/kibo.png", maxHeight: 34 },
  { name: "중소벤처기업진흥공단", src: "/images/partners/kosme.png", maxHeight: 56 },
];

/** 업무위탁사 — 2026-08-26 대표 피드백: 더존비즈온 삭제, 한창 → 엠피원(사명 표기 변경) */
export const clients: PartnerLogo[] = [
  { name: "NICE평가정보", src: "/images/partners/nice.png", maxHeight: 30 },
  { name: "한국평가데이터", src: "/images/partners/kodata.png", maxHeight: 44 },
  { name: "KIS정보통신", src: "/images/partners/kis.png", maxHeight: 24 },
  { name: "KSNET", src: "/images/partners/ksnet.png", maxHeight: 40 },
  { name: "NICEABC", src: "/images/partners/niceabc.png", maxHeight: 44 },
  // TODO(client): 엠피원 로고는 mp1.kr 푸터용 회색 버전(220×65 저해상도) — 컬러 버전(logo-2.png)은
  // 글자가 흰색이라 흰 로고 박스에서 안 보인다. 고해상도 컬러(어두운 글자) 로고를 받으면 교체할 것

  { name: "엠피원", src: "/images/partners/mp1.png", maxHeight: 34 },
];
