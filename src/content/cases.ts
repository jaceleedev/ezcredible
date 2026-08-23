/**
 * 성공사례. 기존 사이트의 9건 그대로(2023년). 업체명은 원문처럼 비식별.
 * TODO(client): 2024~2026 사례로 교체 — 클라이언트 데이터 대기 중.
 */
export type SuccessCase = {
  industry: string;
  company: string;
  revenue: string;
  issue: string;
  duration: string;
  date: string;
  /** 결과 — 상품명과 금액을 나눠 카드 헤드라인을 두 줄로 만든다 */
  product: string;
  amount: string;
};

export const cases: SuccessCase[] = [
  { industry: "운송업", company: "삼*후**", revenue: "365억", issue: "높은 부채비율", duration: "14일", date: "2023년 11월", product: "매출채권 팩토링", amount: "10억 확보" },
  { industry: "도소매업", company: "모**트***", revenue: "107억", issue: "차입금 과다", duration: "3개월", date: "2023년 10월", product: "구매자금", amount: "4억 확보" },
  { industry: "도소매업", company: "에**스*", revenue: "240억", issue: "대표자 변경", duration: "3개월", date: "2023년 9월", product: "구매자금 3억 +", amount: "지급보증 2.5억 확보" },
  { industry: "건설업", company: "지**엠**", revenue: "133억", issue: "녹색 인증", duration: "1개월", date: "2023년 8월", product: "운전자금", amount: "10억 확보" },
  { industry: "정보통신업", company: "이**프*", revenue: "20억", issue: "높은 부채비율", duration: "1개월", date: "2023년 7월", product: "운전자금", amount: "2억 확보" },
  { industry: "도소매업", company: "진*함*", revenue: "250억", issue: "차입금 과다", duration: "1개월", date: "2023년 6월", product: "운전자금", amount: "9억 확보" },
  { industry: "정보통신업", company: "서****스", revenue: "78억", issue: "재무 조정", duration: "1개월", date: "2023년 5월", product: "운전자금", amount: "5억 확보" },
  { industry: "도소매업", company: "비*솔**", revenue: "10억", issue: "짧은 업력", duration: "1개월", date: "2023년 4월", product: "운전자금", amount: "3억 확보" },
  { industry: "건설업", company: "동**앤*", revenue: "483억", issue: "재무 조정", duration: "2개월", date: "2023년 3월", product: "운전자금", amount: "20억 확보" },
];
