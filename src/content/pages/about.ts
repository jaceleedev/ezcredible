import type { Feature } from "@/components/sub/feature-cards";
import type { Step } from "@/components/sub/process-steps";

/**
 * 회사소개 그룹 콘텐츠 — 회사소개 · 회사연혁 · 업무절차 · 오시는길.
 * 기존 사이트 본문을 바탕으로 하되 회사소개는 수치·솔루션·기관 정보를 보강했다.
 * TODO(client): 연혁은 2023.1에서 끝난다 — 2023~2026 내용, 수치(stats)는 클라이언트 데이터 대기.
 */

export const companyPage = {
  href: "/about/company",
  title: "회사소개",
  subtitle: "기업의 가능성을 현실로 만드는 파트너",
  banner: { src: "/images/temp/sub-banner.jpg", alt: "" },
  founded: "2019년 7월",
  intro:
    "(주)이지크레더블은 2019년 설립 이후 정책자금·유동성자금·성장 솔루션 세 축으로 중소기업의 자금 문제를 풀어 온 기업 금융 솔루션 회사입니다. 금융업계에서 오랜 경력을 쌓은 전문가가 상담 신청부터 자금 확보, 그 이후의 관리까지 함께합니다.",
  ctaTitle: "이지크레더블과 함께할 준비가 되셨나요?",
  metaDescription:
    "(주)이지크레더블 회사소개 — 2019년 설립, 정책자금·유동성자금·성장 솔루션으로 중소기업의 자금 확보를 돕는 기업 금융 솔루션 회사. 지원기관·업무위탁사와 회사 정보를 안내합니다.",
};

/** 기존 사이트의 세 가지 선언을 카드로 */
export const companyValues: Feature[] = [
  {
    icon: "star",
    title: "가능성을 현실로 만드는 파트너",
    body: "이지크레더블은 비즈니스의 가능성을 현실로 만들어가는 파트너입니다. 우리를 통해 당신의 이야기를 실현해 보세요.",
  },
  {
    icon: "trend",
    title: "성장을 이루어내는 전문가",
    body: "우리는 기업의 성장을 이루어 내는 전문가입니다. 우리를 통해 비즈니스를 확장하고 강화해 보세요.",
  },
  {
    icon: "check",
    tone: "navy",
    title: "시련을 함께 극복하는 조력자",
    body: "우리는 기업의 시련을 함께 극복하는 조력자입니다. 당신의 비즈니스가 어려움에 부딪혀도 포기하지 않고 가능성을 찾아내겠습니다.",
  },
];

export const historyPage = {
  href: "/about/history",
  title: "회사연혁",
  subtitle: "저희가 걸어온 길입니다.",
  banner: { src: "/images/temp/sub-banner.jpg", alt: "" },
  intro:
    "2019년 7월 법인 설립 이후 신용평가·B2B 결제·팩토링·보증보험·VAN/PG까지, 기업 자금에 필요한 파트너십을 한 해에 두세 곳씩 넓혀 왔습니다. 아래는 협약·위탁 계약을 기준으로 정리한 연혁입니다.",
  ctaTitle: "다음 연혁을 함께 쓸 기업을 찾습니다",
  metaDescription:
    "(주)이지크레더블 회사연혁 — 2019년 설립부터 NICE평가정보·한국평가데이터·이크레더블·KIS정보통신·KSNET·미래에셋캐피탈 등과의 협약·위탁 계약까지 연도별 발자취.",
};

export type HistoryEntry = { date: string; year: string; partner: string; description: string };

/** 최신순. TODO(client): 2023.1 이후 연혁 추가 */
export const history: HistoryEntry[] = [
  { date: "2023.01", year: "2023", partner: "KSNET(케이에스넷)", description: "KSNET의 VAN 영업대리점이 되었습니다. 안전하고 효율적인 결제서비스를 제공하여 고객사의 비즈니스 성장을 지원하고 있습니다." },
  { date: "2022.10", year: "2022", partner: "웰페이", description: "웰페이사와의 계약으로 매출채권팩토링 서비스를 제공하고 있습니다. 대출 없이 자금 확보를 지원하여 고객사의 경영 안정성 강화를 돕고 있습니다." },
  { date: "2021.12", year: "2021", partner: "서울보증보험", description: "서울보증보험 보증보험 영업대리점으로 활동했습니다. 지급보증보험, 입찰보증보험 등 고객사가 필요로 하는 다양한 보증보험 업무를 직접 다뤘습니다." },
  { date: "2021.12", year: "2021", partner: "미래에셋캐피탈(주)", description: "미래에셋캐피탈과의 협약으로 매출채권팩토링 서비스를 제공하고 있습니다. 기업의 유동성을 강화하고 자금 조달을 향상시키는 데 기여하고 있습니다." },
  { date: "2021.12", year: "2021", partner: "KIS정보통신(주)", description: "KIS정보통신의 영업위탁사로 VAN, PG 서비스를 제공하고 있습니다. 종합적인 결제 인프라를 구축하여 고객사의 비즈니스 확장을 지원하고 있습니다." },
  { date: "2021.05", year: "2021", partner: "한국평가데이터(주)", description: "한국평가데이터와의 협약을 통해 신용평가 마케팅 영업대행을 하고 있습니다. 고객사의 신용평가등급을 위해 전문적인 상담부터 관리까지 도와드리고 있습니다." },
  { date: "2020.12", year: "2020", partner: "한창(주)", description: "한창과의 계약을 통해 B2B 전자상거래 영업대행을 수행하고 있습니다. B2B 구매자금 한도 책정부터 실제 사용까지 고객사가 필요로 하는 부분들을 도와드리고 있습니다." },
  { date: "2020.06", year: "2020", partner: "이크레더블(주)", description: "이크레더블과의 협약으로 TCB평가의 영업대행을 담당하고 있습니다. 고객사가 공공기관 입찰에 성공할 수 있도록 신뢰성 있는 평가 서비스를 제공하고 있습니다." },
  { date: "2020.04", year: "2020", partner: "이크레더블네트웍스(주)", description: "이크레더블네트웍스와의 계약을 통해 B2B 전자상거래 영업대행을 하고 있습니다. 고객사 간의 신속하고 안전한 B2B 거래를 지원하여 비즈니스 파트너십 강화에 기여하고 있습니다." },
  { date: "2019.09", year: "2019", partner: "NICE평가정보(주)", description: "NICE평가정보와의 협약으로 신용평가 마케팅 영업대행을 하고 있습니다. 고객사가 신용평가등급을 관리하고, 해당 등급이 비즈니스 의사결정에 도움이 될 수 있도록 업무를 지원하고 있습니다." },
  { date: "2019.09", year: "2019", partner: "NICE비즈니스플랫폼(주)", description: "NICE비즈니스플랫폼과의 위탁 계약을 통해 전자어음할인, 법인대출, 팩토링 서비스를 제공하고 있습니다. 다양한 기업 자금 솔루션을 활용하여 고객사가 필요한 자금을 중개하고 있습니다." },
  { date: "2019.07", year: "2019", partner: "이지크레더블 설립", description: "이지크레더블 법인을 설립했습니다." },
];

export const procedurePage = {
  href: "/about/procedure",
  title: "업무절차",
  subtitle: "안전하고 투명한 절차를 통해 신뢰를 드립니다.",
  banner: { src: "/images/temp/sub-banner.jpg", alt: "" },
  intro:
    "상담 신청부터 솔루션 성공 이후의 관리까지 여섯 단계입니다. 단계마다 담당자가 무엇을 하고 고객사가 무엇을 준비하면 되는지 미리 알려 드리기 때문에, 진행 중에 갑자기 서류가 늘거나 일정이 밀리지 않습니다.",
  ctaTitle: "첫 단계는 상담 신청입니다",
  metaDescription:
    "(주)이지크레더블 업무절차 — 전문가 상담, 기업 분석·진단, 담당자 배정과 계약, 솔루션 진행, 성공, 지속 관리까지 6단계와 상담 전 준비 서류를 안내합니다.",
};

export const procedurePrinciples: Feature[] = [
  { icon: "check", title: "안전", body: "보증기관·금융기관의 공식 절차 안에서만 진행합니다. 기업 정보는 상담과 신청 목적으로만 쓰고, 개인정보처리방침에 따라 관리합니다." },
  { icon: "doc", title: "투명", body: "단계마다 진행 상황과 남은 일정을 공유합니다. 진행 범위와 조건은 계약서에 먼저 적고 나서 시작합니다." },
  { icon: "cycle", tone: "navy", title: "지속", body: "자금이 들어온 뒤에도 끝이 아닙니다. 상환 일정과 다음 자금 기회를 계속 관리하고 추가 솔루션을 제안합니다." },
];

/** 기존 사이트 6단계 — 제목은 그대로, 설명을 보강 */
export const procedureSteps: Step[] = [
  { tag: "상담", title: "전문가가 함께합니다", description: "금융업계에서 오랜 경력을 가진 전문가가 상담 신청 단계부터 직접 이야기를 듣습니다." },
  { tag: "분석", title: "기업을 분석 후 진단합니다", description: "재무·신용·업력·업종을 보고 신청할 수 있는 자금과 예상 조건을 진단합니다." },
  { tag: "계약", title: "담당자 배정 후 계약서를 작성합니다", description: "전담 담당자를 배정하고 진행 범위와 일정을 계약서에 명시합니다." },
  { tag: "진행", title: "솔루션을 진행합니다", description: "서류 준비, 기관 신청, 평가 대응을 담당자가 함께 진행합니다." },
  { tag: "성공", title: "솔루션을 성공합니다", description: "자금 실행, 보증서 발급, 등급 확정 등 약속한 결과를 확인합니다." },
  { tag: "관리", title: "지속적인 관리와 추가 솔루션", description: "상환 일정과 갱신 시점을 관리하고, 다음 단계의 자금·인증·성장 솔루션을 제안합니다." },
];

export const procedureDocuments: { title: string; description: string }[] = [
  { title: "사업자등록증 사본", description: "법인은 법인등기부등본과 주주명부를 함께 준비하면 진단이 빨라집니다." },
  { title: "최근 3개년 재무제표", description: "표준재무제표증명원 또는 결산서. 창업 초기 기업은 있는 기간만큼만." },
  { title: "부가가치세 과세표준증명원", description: "최근 매출 흐름을 확인하는 기본 서류입니다." },
  { title: "4대보험 가입자 명부", description: "상시근로자 수로 소상공인·중소기업 구분과 지원 대상이 갈립니다." },
];

export const directionsPage = {
  href: "/about/directions",
  title: "오시는길",
  subtitle: "언제든지 방문을 환영합니다.",
  banner: { src: "/images/temp/sub-banner.jpg", alt: "" },
  building: "대성디폴리스 지식산업센터 B동 2006-2호",
  /** 지도 앱 검색어 */
  mapQuery: "서울 금천구 서부샛길 606 대성디폴리스",
  ctaTitle: "방문 전에 상담을 먼저 신청해 주세요",
  metaDescription:
    "(주)이지크레더블 오시는길 — 서울시 금천구 서부샛길 606 대성디폴리스 B동 2006-2호. 7호선 가산디지털단지역 8번 출구 도보 6분, 버스 정류장·주차 안내.",
};

export const transit = {
  subway: { line: "7호선", station: "가산디지털단지역", exit: "8번 출구", walk: "도보 6분" },
  buses: [
    { type: "간선", numbers: ["571", "652", "653"] },
    { type: "일반", numbers: ["21"] },
    { type: "마을", numbers: ["금천05"] },
    { type: "지선", numbers: ["5012", "5528"] },
  ],
  stops: ["디지털3단지.월드벤처센터", "디지털3단지.한일합섬", "디지털3단지.(주)로옴코리아", "디지털3단지운동장"],
  walk: "지도 앱에서 ‘디폴리스지식산업센터’를 검색한 뒤 B동으로 오시면 됩니다.",
  parking: { available: "주차 가능", free: "30분 무료", after: "이후 30분당 1,000원" },
};
