import type { Step } from "@/components/sub/process-steps";
import type { FundPage } from "./policy-funds";

/**
 * 성장 솔루션 4페이지 콘텐츠 — 기업신용평가 · PG · VAN · 기업인증.
 *
 * 출처(2026-08-23 확인):
 * - 기업신용평가: 기존 사이트 본문(신용등급 정의·평가요소·조달청 입찰용 등급표) +
 *   TCB 기술등급 정의는 이크레더블 e-TCB 등급체계 https://www.etcb.co.kr/html/etcb/DE-UID-ET-003.html
 *   (기존 표에서 비어 있던 T10은 e-TCB 정의로 채웠다)
 * - PG · VAN: 기존 사이트 본문(KIS정보통신·KSNET 위탁 기준). 정산주기 표 TODO(client) — 위탁사 약관 최신 확인
 * - 기업인증: ISMRI(지속가능경영연구원) https://www.ismri.org 서비스 분류와 실적 수치
 */

/* ------------------------------------------------------------------ 기업신용평가 */

export const credit: FundPage = {
  href: "/growth/corporate-credit-evaluation",
  title: "기업신용평가",
  subtitle: "기업의 신용을 관리하는 것이 곧 경쟁력입니다.",
  banner: { src: "/images/banners/growth.jpg", alt: "상승 그래프와 신용등급 배지 3D 오브젝트" },
  image: { src: "/images/solutions/growth.png", alt: "상승 막대그래프와 화살표" },
  art: "bars",
  artTint: "sky",
  definition: {
    strong: "기업신용등급은 기업의 부도 가능성을 평가해 상대적인 수준을 서열화한 뒤, 위험 수준이 비슷한 기업을 같은 등급으로 계량화한 지표",
    rest: "입니다. 정책자금·보증 심사, 공공기관 입찰, 대기업 협력사 등록까지 기업 운영의 중요한 고비마다 쓰이기 때문에 꾸준한 관리가 필요합니다.",
  },
  summary:
    "이지크레더블은 NICE평가정보·한국평가데이터의 기업신용평가와 이크레더블의 기술신용평가(TCB)를 영업대행하며, 평가를 받기 전에 기업의 재무·비재무 요소를 먼저 점검합니다. 등급이 나온 뒤에 고치는 것보다 평가 전에 부족한 부분을 바로잡는 쪽이 훨씬 빠르고 비용도 적게 듭니다.",
  facts: [
    { label: "신용등급 체계", value: "AAA~D", unit: "10단계" },
    { label: "기술등급 체계(TCB)", value: "T1~T10", unit: "10단계" },
    { label: "평가기관", value: 3, unit: "곳 · NICE · KoDATA · 이크레더블" },
    { label: "활용처", value: "입찰·자금·거래", unit: "" },
  ],
  features: [
    {
      icon: "award",
      title: "공공 입찰 · 조달",
      body: "조달청과 공공기관 입찰은 신용평가등급·기술신용등급을 자격 요건이나 배점으로 씁니다. 등급이 한 단계 오르면 참여할 수 있는 입찰의 범위가 달라집니다.",
    },
    {
      icon: "trend",
      title: "정책자금 · 보증",
      body: "중진공·신보·기보의 금리와 한도는 신용위험등급에 따라 가감됩니다. 같은 자금이라도 등급에 따라 부담하는 금리가 다릅니다.",
    },
    {
      icon: "list",
      title: "거래처 심사",
      body: "대기업·중견기업은 협력사 등록과 거래 한도를 정할 때 신용등급을 봅니다. 등급은 매출을 여는 열쇠이기도 합니다.",
    },
    {
      icon: "star",
      tone: "navy",
      title: "신용평가 솔루션",
      body: "평가 전 재무·비재무 요소를 진단하고, 단기간에 올릴 수 있는 항목과 중장기 체질 개선 항목을 나눠 계획을 세웁니다. 평가 신청부터 등급 관리까지 함께합니다.",
    },
  ],
  ctaTitle: "기업신용평가 솔루션이 필요하신가요?",
  metaDescription:
    "기업신용평가·기술신용평가(TCB) 안내 — AAA~D 신용등급과 T1~T10 기술등급의 정의, 재무·비재무 평가 요소, 조달청·공공기관 입찰용 등급 기준, 등급 개선 방법. 이지크레더블이 평가 전 진단부터 관리까지 함께합니다.",
};

export type CreditGrade = { grade: string; status: string; risk: string; band: "prime" | "good" | "spec" | "risk" };

/** 신용등급 정의 — "신용상태 / 채무불이행 위험"으로 나눠 표에 담는다 */
export const creditGrades: CreditGrade[] = [
  { grade: "AAA", status: "최고 수준의 신용상태", risk: "채무불이행 위험 거의 없음", band: "prime" },
  { grade: "AA", status: "매우 우수한 신용상태", risk: "채무불이행 위험 매우 낮음", band: "prime" },
  { grade: "A", status: "우수한 신용상태", risk: "채무불이행 위험 낮음", band: "prime" },
  { grade: "BBB", status: "보통 수준의 신용상태", risk: "채무불이행 위험 낮지만 변동성 내재", band: "good" },
  { grade: "BB", status: "투기적인 신용상태", risk: "채무불이행 위험 증가 가능성 상존", band: "spec" },
  { grade: "B", status: "매우 투기적인 신용상태", risk: "채무불이행 위험 상존", band: "spec" },
  { grade: "CCC", status: "불량한 신용상태", risk: "채무불이행 위험 높음", band: "risk" },
  { grade: "CC", status: "매우 불량한 신용상태", risk: "채무불이행 위험 매우 높음", band: "risk" },
  { grade: "C", status: "최악의 신용상태", risk: "채무불이행 불가피", band: "risk" },
  { grade: "D", status: "채무불이행 상태", risk: "—", band: "risk" },
];

export const creditFactors: { group: string; tone: "white" | "navy"; intro: string; items: { term: string; desc: string }[] }[] = [
  {
    group: "재무 평가항목",
    tone: "white",
    intro: "재무제표에서 계산되는 정량 지표. 결산 전에 손볼 수 있는 항목이 많습니다.",
    items: [
      { term: "성장성 지표", desc: "매출액 증가율, 자기자본 증가율" },
      { term: "수익성 지표", desc: "수지비율, 적립금 비율, 기업순이익률, 총자본 순이익률" },
      { term: "안정성 지표", desc: "금융비용 대 총부채비율, 고정비율, 유동부채 대 총자산, 금융비용 대 매출액 비율, 유동부채비율, 자기자본 비율, 재고자산 대 유동자산비율" },
      { term: "활동성 지표", desc: "영업자산 회전율, 운전자금 회전율, 총자산 회전율, 자본금 회전율" },
    ],
  },
  {
    group: "비재무 평가항목",
    tone: "navy",
    intro: "대표자와 경영 구조, 거래 관계를 보는 정성 지표. 자료의 충실성과 협조 정도도 점수에 들어갑니다.",
    items: [
      { term: "대표자 자금력", desc: "보유자산 건전성, 자금 동원력" },
      { term: "처분가능 보유자산", desc: "회사 보유 유형자산 및 현금성 자산, 차입 규모" },
      { term: "자료", desc: "자료의 진실성·충실성, 평가에 대한 협조 정도" },
      { term: "현금흐름 추이", desc: "영업활동과 관련한 현금흐름 추이" },
      { term: "계열 위험", desc: "계열관계로부터 발생하는 부정적 측면" },
      { term: "경영 위험", desc: "경영구조(경영능력, 노사관계·근로조건, 관계사 위험), 재무 융통성, 경영 신뢰도" },
      { term: "영업 위험", desc: "경쟁 지위, 구매·판매 안정성, 수주력, 인력 효율성, 품목 다변화, 판매처 분산 정도" },
    ],
  },
];

/** 조달청 입찰용 등급 — 회사채·기업어음·기업신용평가등급 대응표 */
export const procurementGrades = {
  columns: ["회사채 신용평가등급", "기업어음 신용평가등급", "기업신용평가등급"],
  rows: [
    ["AAA ~ A-", "A1 ~ A2+", "AAA, AA+, AA0, AA-, A+, A0, A-"],
    ["BBB+", "A3+", "BBB+"],
    ["BBB0", "A30", "BBB0"],
    ["BBB-", "A3-", "BBB-"],
    ["BB+, BB0", "B+", "BB+, BB0"],
    ["BB-", "B0", "BB-"],
    ["B+, B0, B-", "B-", "B+, B0, B-"],
    ["CCC+ 이하", "C 이하", "CCC+ 이하"],
  ],
};

/** 공공기관 입찰용 기술등급(TCB) — 수준 라벨은 기존 사이트, 정의는 이크레더블 e-TCB */
export const tcbGrades = {
  columns: ["기술등급", "수준", "정의"],
  rows: [
    ["T1", "최고 수준", "기술환경 변화에 거의 영향을 받지 않으며 기술사업화 성공 가능성이 매우 높은 기업"],
    ["T2", "매우 우수", "기술환경 변화에 거의 영향을 받지 않으며 기술사업화 성공 가능성이 높은 기업"],
    ["T3", "우수", "기술환경 변화에 일부 영향을 받지만 기술사업화 성공 가능성이 매우 양호한 기업"],
    ["T4", "양호", "기술환경 변화에 다소 영향을 받지만 기술사업화 성공 가능성이 양호한 기업"],
    ["T5", "보통 이상", "기술환경 변화에 영향을 받을 수 있지만 기술사업화 성공 가능성이 보통 이상인 기업"],
    ["T6", "보통", "기술환경 변화에 영향을 많이 받아 기술사업화 성공 가능성이 보통인 기업"],
    ["T7", "보통 이하", "기술사업역량·기술경쟁력이 낮아 기술사업화 성공 가능성이 유동적인 기업"],
    ["T8", "미흡", "기술사업역량·기술경쟁력이 낮아 기술사업화 성공 가능성이 매우 유동적인 기업"],
    ["T9", "취약", "기술사업역량·기술경쟁력이 낮아 기술사업화 성공 가능성이 낮은 기업"],
    ["T10", "매우 취약", "기술사업역량·기술경쟁력이 낮아 기술사업화 성공 가능성이 매우 낮은 기업"],
  ],
};

export const creditImprovement: Step[] = [
  { title: "기업 분석 · 진단", description: "재무제표와 비재무 자료로 현재 등급 수준과 감점 요인을 찾습니다." },
  { title: "부족한 요소 개선", description: "평가 요소 가운데 기업이 실질적으로 바꿀 수 있는 부분부터 손봅니다." },
  { title: "악영향 요소 제거", description: "연체·체납·계열 위험처럼 등급을 깎는 요소를 먼저 정리합니다." },
  { title: "단기 · 중장기 계획", description: "단기간에 올릴 항목과 중장기 체질 개선 항목을 나눠 기업의 니즈에 맞게 실행합니다." },
];

/* ------------------------------------------------------------------ PG */

export const pg: FundPage = {
  href: "/growth/pg",
  title: "PG",
  subtitle: "쾌적한 결제 경험과 안전한 거래 환경을 만들어드립니다.",
  banner: { src: "/images/banners/growth.jpg", alt: "상승 그래프와 신용등급 배지 3D 오브젝트" },
  image: { src: "/images/solutions/growth.png", alt: "상승 막대그래프와 화살표" },
  art: "shelf",
  artTint: "lavender",
  definition: {
    strong: "PG(Payment Gateway)는 구매고객이 온라인 상점에서 신용카드 등 다양한 결제수단으로 안전하게 결제할 수 있도록 지원하는 서비스",
    rest: "입니다. 결제 승인 중계부터 매입, 정산, 세금계산서 발행까지 판매대금 정산 업무를 통합해 처리합니다.",
  },
  summary:
    "이지크레더블은 KIS정보통신의 영업위탁사로 KISPG 서비스를 제공합니다. 쇼핑몰·예약·구독처럼 온라인 결제가 필요한 사업자가 신용카드, 계좌이체, 가상계좌, 휴대전화 소액결제를 한 번에 붙이고, 정산 내역은 가맹점관리시스템(MMS)에서 바로 확인할 수 있습니다.",
  facts: [
    { label: "결제수단", value: 4, unit: "종 · 카드·이체·가상계좌·휴대전화" },
    { label: "일정산", value: "D+7", unit: "일 · 은행영업일" },
    { label: "정산 주기 선택", value: "월 1·2·4회", unit: "또는 일정산" },
    { label: "가맹점 관리", value: "MMS", unit: "정산 데이터 조회" },
  ],
  features: [
    {
      icon: "cycle",
      title: "다양한 결제수단 통합",
      body: "신용카드·계좌이체·가상계좌·휴대전화 소액결제를 하나의 결제창으로 제공합니다. 결제수단별 승인과 정산을 한 시스템에서 관리합니다.",
    },
    {
      icon: "check",
      title: "안전한 거래 환경",
      body: "카드사·은행과 연결된 KISPG 인프라를 통해 결제 정보가 암호화되어 중계됩니다. 가맹점은 결제 데이터를 직접 다루지 않아도 됩니다.",
    },
    {
      icon: "doc",
      title: "정산 · 세금계산서 자동화",
      body: "결제 완료 건을 기준으로 수수료를 공제한 정산대금이 지급되고, 한 달치 수수료는 전자세금계산서로 합산 발행됩니다.",
    },
    {
      icon: "star",
      tone: "navy",
      title: "PG 솔루션",
      body: "업종과 결제 규모에 맞는 수수료·정산 주기를 설계하고, 가맹 심사 서류와 시스템 연동까지 도와드립니다.",
    },
  ],
  ctaTitle: "PG 솔루션이 필요하신가요?",
  metaDescription:
    "PG(Payment Gateway) 서비스 안내 — 신용카드·계좌이체·가상계좌·휴대전화 결제 통합, 매입·정산·세금계산서 발행 흐름, 일정산 D+7과 월 1·2·4회 정산주기. 이지크레더블이 KISPG 가맹 신청부터 연동까지 함께합니다.",
};

export const pgFlow: Step[] = [
  { tag: "구매고객", title: "결제", description: "온라인 상점에서 카드·이체·가상계좌·휴대전화로 결제합니다." },
  { tag: "PG", title: "승인 중계", description: "결제 정보를 카드사·은행에 전달하고 승인 결과를 실시간으로 돌려줍니다." },
  { tag: "PG → 카드사", title: "매입", description: "거래 발생 다음 날 결제 완료 내역을 파일로 만들어 카드사에 전자적으로 전송합니다." },
  { tag: "PG → 가맹점", title: "정산", description: "결제 완료 거래를 기준으로 수수료를 공제하고 가맹점에 결제대금을 지급합니다." },
  { tag: "PG → 가맹점", title: "세금계산서 발행", description: "한 달간 발생한 정산 수수료를 합산해 전자세금계산서로 제공합니다." },
];

/** 정산주기 — 신용카드·계좌이체·가상계좌 통합정산. TODO(client): 위탁사 현재 약관 확인 */
export const pgSettlement = {
  columns: ["정산주기", "기준", "결제기간", "정산일"],
  rows: [
    ["일정산", "승인기준", "매일", "D+7일(은행영업일 기준)"],
    ["1회/월", "승인기준", "1일 ~ 말일", "익월 8일"],
    ["2회/월", "승인기준", "1일 ~ 15일", "당월 22일"],
    ["2회/월", "승인기준", "16일 ~ 말일", "익월 8일"],
    ["4회/월", "승인기준", "1일 ~ 7일", "당월 15일"],
    ["4회/월", "승인기준", "8일 ~ 14일", "당월 22일"],
    ["4회/월", "승인기준", "15일 ~ 21일", "당월 29일"],
    ["4회/월", "승인기준", "22일 ~ 말일", "익월 8일"],
  ],
  note: "휴대전화 소액결제는 수납정산 방식으로 M+3개월 5일에 정산됩니다. 결제수단에 따라 정산주기와 수수료가 다르며, 정산 데이터는 가맹점관리시스템(MMS)에서 확인할 수 있습니다.",
};

/* ------------------------------------------------------------------ VAN */

export const van: FundPage = {
  href: "/growth/van",
  title: "VAN",
  subtitle: "매장에서의 결제를 더욱 간편하고 빠르게 하세요.",
  banner: { src: "/images/banners/growth.jpg", alt: "상승 그래프와 신용등급 배지 3D 오브젝트" },
  image: { src: "/images/solutions/growth.png", alt: "상승 막대그래프와 화살표" },
  art: "chat",
  artTint: "mint",
  definition: {
    strong: "VAN(Value Added Network)은 신용카드사와 가맹점 사이의 통신망을 연결해 거래 승인·중계, 전표 매입 등 가맹점과 카드사 간 중개 역할을 하는 신용카드 결제대행 서비스",
    rest: "입니다. 매장의 카드 단말기(POS)가 카드사와 실시간으로 대화하도록 만드는 망이 VAN입니다.",
  },
  summary:
    "이지크레더블은 KIS정보통신과 KSNET의 VAN 영업대리점입니다. 신규 매장의 단말기 설치부터 카드사 가맹 등록, 현금영수증·멤버십 같은 부가서비스, 매출·입금 정산 관리까지 매장 결제 전반을 한 번에 세팅합니다.",
  facts: [
    { label: "승인 서비스", value: 365, unit: "일 · 24시간", plain: true },
    { label: "취급 카드", value: "신용·직불·체크", unit: "전 카드사" },
    { label: "파트너", value: "KIS · KSNET", unit: "" },
    { label: "인프라", value: "IDC", unit: "무장애 · 무중단" },
  ],
  features: [
    {
      icon: "cycle",
      title: "무장애 · 무중단 서비스",
      body: "IDC 센터 구축으로 결제 건수가 늘어도 끊김 없이 승인을 처리합니다. 결제가 멈추면 매출이 멈추기 때문에 안정성이 첫 번째입니다.",
    },
    {
      icon: "star",
      title: "차별화된 부가서비스",
      body: "현금영수증, 통신사 멤버십·OK캐쉬백 적립, 가맹점 전용 정산관리 인터넷서비스까지 매장 운영에 필요한 기능을 함께 제공합니다.",
    },
    {
      icon: "chart",
      title: "선결제 · 비대면 결제",
      body: "BLE(블루투스) 결제, 모바일 오더 같은 선결제 서비스로 매장 회전율을 높이고 고객 대기 시간을 줄입니다.",
    },
    {
      icon: "list",
      tone: "navy",
      title: "VAN 솔루션",
      body: "업종과 매장 규모에 맞는 단말기와 수수료 조건을 제안하고, 카드사 가맹 등록부터 설치·연동, 정산 관리 교육까지 함께합니다.",
    },
  ],
  ctaTitle: "VAN 솔루션이 필요하신가요?",
  metaDescription:
    "VAN(Value Added Network) 서비스 안내 — KIS정보통신·KSNET 무장애 IDC 인프라, 365일 24시간 카드 승인, 현금영수증·멤버십·정산관리 기능, BLE·모바일 오더 선결제. 이지크레더블이 단말기 설치부터 정산까지 함께합니다.",
};

export const vanFunctions: { title: string; description: string }[] = [
  {
    title: "종류에 관계없이 모든 카드 결제 · 승인",
    description:
      "가맹점에 설치된 카드조회기(POS·결제단말기)가 카드 정보와 거래 정보를 해당 카드사로 중계해 승인 여부를 실시간으로 받습니다. 365일 연중무휴 24시간, 신용카드·직불카드·체크카드 모두 결제할 수 있습니다.",
  },
  {
    title: "현금영수증 발급",
    description: "소비자가 현금과 함께 카드 또는 휴대전화번호를 제시하면 소득공제·세액공제 혜택을 받을 수 있는 현금영수증을 단말기에서 바로 발급합니다.",
  },
  {
    title: "멤버십 결제 · 적립",
    description: "같은 단말기로 이동통신사(SKT·KT·LG U+) 멤버십 서비스와 SK플래닛 OK캐쉬백 등의 결제·적립을 처리합니다.",
  },
  {
    title: "매출 · 입금 정산관리 인터넷서비스",
    description: "가맹점 전용 인터넷서비스에서 매출 현황, 카드사별 현황, 입금액, 미입금 관리, 부가세 신고 자료까지 확인할 수 있습니다.",
  },
];

export const vanProcedure: Step[] = [
  { title: "가맹 신청 · 서류", description: "사업자등록증, 통장 사본 등 기본 서류로 가맹점 신청을 접수합니다." },
  { title: "카드사 가맹 등록", description: "VAN사가 각 카드사에 가맹점 등록을 대행합니다." },
  { title: "단말기 설치 · 연동", description: "업종에 맞는 단말기(POS·결제단말기)를 설치하고 부가서비스를 연동합니다." },
  { title: "결제 개시 · 정산 관리", description: "결제를 시작하고 가맹점 인터넷서비스로 매출·입금을 관리합니다." },
];

/* ------------------------------------------------------------------ 기업인증 */

export const certification: FundPage = {
  href: "/growth/certification",
  title: "기업인증",
  subtitle: "인증으로 더 유리한 자금 조건을 만드세요.",
  banner: { src: "/images/banners/certification.jpg", alt: "인증서와 골드 메달 3D 오브젝트" },
  image: { src: "/images/certification.png", alt: "인증서와 골드 메달" },
  art: "check",
  artTint: "sand",
  definition: {
    strong: "벤처기업·이노비즈·메인비즈 같은 경영인증, ISO 경영시스템인증, NET·NEP·조달우수제품 같은 기술·조달인증은 기업의 기술력과 경영 체계를 공적으로 증명하는 제도",
    rest: "입니다. 정책자금 평가 가점과 보증 우대, 공공조달 입찰 가점, 세제 혜택이 여기서 시작됩니다.",
  },
  summary:
    "이지크레더블은 인증 전문 파트너 지속가능경영연구원(ISMRI)과 함께 인증 취득부터 자금 연계까지 한 번에 설계합니다. 어떤 인증이 우리 회사의 자금 계획에 실제로 도움이 되는지부터 가려내고, 취득 뒤에는 정책자금·보증·조달에서 우대를 받도록 연결합니다.",
  facts: [
    { label: "ISMRI 사업 경험", value: 11, unit: "년+", plain: true },
    { label: "함께한 기업", value: 230, unit: "+" },
    { label: "수행 프로젝트", value: 590, unit: "+" },
    { label: "인증 · 컨설팅 영역", value: 9, unit: "개 분야" },
  ],
  features: [
    {
      icon: "award",
      title: "정책자금 · 보증 우대",
      body: "벤처·이노비즈·메인비즈 인증기업은 정책자금 평가와 보증 심사에서 우대를 받습니다. 인증이 곧 금리와 한도로 이어집니다.",
    },
    {
      icon: "doc",
      title: "공공조달 · 입찰 가점",
      body: "ISO 인증과 조달우수제품·혁신제품 지정은 공공기관 입찰과 수의계약의 문을 엽니다.",
    },
    {
      icon: "trend",
      title: "세제 · 거래 신뢰",
      body: "벤처기업 세제 혜택, 대기업 협력사 등록 시 경영시스템 인증 요구 등 인증은 비용을 줄이고 거래를 넓힙니다.",
    },
    {
      icon: "star",
      tone: "navy",
      title: "기업인증 솔루션",
      body: "자금 계획에서 거꾸로 필요한 인증을 고르고, ISMRI가 취득을 맡습니다. 인증 뒤에는 이지크레더블이 정책자금·보증 신청으로 바로 연결합니다.",
    },
  ],
  ctaTitle: "기업인증 상담이 필요하신가요?",
  metaDescription:
    "기업인증 안내 — 벤처기업·이노비즈·메인비즈 경영인증, ISO 9001·14001·45001·27001 경영시스템인증, NET·NEP·조달우수제품 기술·조달인증을 정책자금 우대와 자금 확보로 연결합니다. 인증 전문 파트너 ISMRI와 함께합니다.",
};

/** 인증 → 자금 흐름 */
export const certificationFlow: Step[] = [
  { tag: "이지크레더블", title: "진단", description: "기업 현황과 자금 계획을 보고, 실제로 우대로 이어지는 인증을 고릅니다." },
  { tag: "ISMRI", title: "인증 취득", description: "서류·심사 준비부터 인증기관 대응까지 인증 전문 파트너가 맡습니다." },
  { tag: "정책자금 · 보증 · 조달", title: "우대 적용", description: "평가 가점, 보증 한도·보증료 우대, 입찰 가점, 세제 혜택을 적용받습니다." },
  { tag: "이지크레더블", title: "자금 확보 · 성장", description: "정책자금·보증 신청으로 바로 연결하고, 이후 갱신과 추가 인증까지 관리합니다." },
];

export type CertGroup = { title: string; items: string[]; benefit: string };

/** 핵심 인증 4그룹 — 홈의 certificationGroups와 같은 분류, 여기서는 항목과 효과를 풀어 쓴다 */
export const certificationGroups: CertGroup[] = [
  {
    title: "경영인증",
    items: ["벤처기업", "이노비즈(기술혁신형)", "메인비즈(경영혁신형)", "소부장 · 뿌리기술 전문기업"],
    benefit: "정책자금 평가 가점, 보증 우대, 세제 혜택, 병역특례·인력 지원",
  },
  {
    title: "경영시스템인증",
    items: ["ISO 9001 품질", "ISO 14001 환경", "ISO 45001 안전보건", "ISO 27001 · 27701 정보보안 · 개인정보"],
    benefit: "공공조달 가점, 대기업 협력사 등록 요건, 해외 거래처 신뢰",
  },
  {
    title: "기술 · 조달인증",
    items: ["NET 신기술 · NEP 신제품", "건설신기술 · 성능인증", "조달우수제품 · 혁신제품"],
    benefit: "공공기관 수의계약·우선구매, 기술금융·TCB 등급 우대",
  },
  {
    title: "기업신용등급",
    items: ["기업신용평가(NICE · KoDATA)", "TCB 기술신용평가(이크레더블)"],
    benefit: "보증 한도 확대, 정책자금 금리 우대, 입찰 자격",
  },
];

/** ISMRI가 함께 다루는 그 밖의 영역 (ismri.org 서비스 분류) */
export const certificationOthers: { title: string; items: string }[] = [
  { title: "ESG · 지속가능경영", items: "ESG 전략 수립, 지속가능경영보고서 작성·검증, K-ESG 진단" },
  { title: "환경규제", items: "탄소중립 로드맵, LCA 전과정평가, 제품탄소발자국(PCF)" },
  { title: "산업안전보건", items: "산업안전보건체계 구축, 중대재해처벌법 대응, SH평가 대응" },
  { title: "사업지원 · 비용최적화", items: "정책자금 조달 자문, R&D 과제 자문, 부담금 환급·에너지 비용 절감·보조금 발굴" },
  { title: "GMA 해외진출", items: "CBAM 대응, CE 인증, KC 인증" },
];

export const certificationTargets: { title: string; description: string }[] = [
  { title: "정책자금 신청을 앞둔 기업", description: "평가 가점과 보증 우대를 미리 확보해 한도와 금리를 유리하게 가져갑니다." },
  { title: "공공조달 · 입찰 기업", description: "ISO 인증과 조달우수제품 지정으로 참여 자격과 배점을 채웁니다." },
  { title: "대기업 협력사 등록 기업", description: "품질·환경·안전보건 경영시스템 인증으로 협력사 등록 요건을 맞춥니다." },
  { title: "투자 유치 · R&D 기업", description: "벤처·이노비즈 인증과 TCB 등급으로 기술력을 객관적으로 증명합니다." },
];
