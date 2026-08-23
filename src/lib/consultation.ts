import { consultationTopics, type ConsultationTopic } from "@/content/site";

/** 상담 신청 폼 값 — 클라이언트 검증과 API 검증이 같은 규칙을 쓴다 */
export type ConsultationInput = {
  topic: string;
  name: string;
  position: string;
  phone: string;
  company: string;
  bizNo: string;
  message?: string;
  consent: boolean;
  /** 허니팟 — 사람은 비워 두고 봇은 채운다 */
  website?: string;
};

export type ConsultationField = keyof Omit<ConsultationInput, "website">;

export type ConsultationErrors = Partial<Record<ConsultationField, string>>;

const topicValues = new Set<string>(consultationTopics.map((t) => t.value));

export function isTopic(value: string): value is ConsultationTopic {
  return topicValues.has(value);
}

/** 숫자만 남긴다 */
export function digits(value: string) {
  return value.replace(/\D/g, "");
}

/** 휴대전화·일반전화 하이픈 정리 (010-1234-5678 / 02-123-4567 / 031-1234-5678) */
export function formatPhone(value: string) {
  const d = digits(value).slice(0, 11);
  if (d.startsWith("02")) {
    if (d.length <= 2) return d;
    if (d.length <= 5) return `${d.slice(0, 2)}-${d.slice(2)}`;
    if (d.length <= 9) return `${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`;
    return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6, 10)}`;
  }
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  if (d.length <= 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

export function isValidPhone(value: string) {
  const d = digits(value);
  return /^0\d{8,10}$/.test(d);
}

/** 사업자등록번호 000-00-00000 */
export function formatBizNo(value: string) {
  const d = digits(value).slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 5) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`;
}

/** 사업자등록번호 검증 — 국세청 체크섬(가중치 1,3,7,1,3,7,1,3,5) */
export function isValidBizNo(value: string) {
  const d = digits(value);
  if (d.length !== 10) return false;
  const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5];
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(d[i]) * weights[i]!;
  sum += Math.floor((Number(d[8]) * 5) / 10);
  return (10 - (sum % 10)) % 10 === Number(d[9]);
}

const limits = { name: 30, position: 30, company: 60, message: 1000 };

/** 필드별 오류 메시지. 비어 있으면 통과 */
export function validateConsultation(input: ConsultationInput): ConsultationErrors {
  const errors: ConsultationErrors = {};
  if (!isTopic(input.topic)) errors.topic = "희망하는 솔루션을 선택해 주세요.";
  if (!input.name.trim()) errors.name = "이름을 입력해 주세요.";
  else if (input.name.trim().length > limits.name) errors.name = `이름은 ${limits.name}자 이내로 입력해 주세요.`;
  if (!input.position.trim()) errors.position = "직책을 입력해 주세요.";
  else if (input.position.trim().length > limits.position) errors.position = `직책은 ${limits.position}자 이내로 입력해 주세요.`;
  if (!input.phone.trim()) errors.phone = "연락처를 입력해 주세요.";
  else if (!isValidPhone(input.phone)) errors.phone = "연락처 형식을 확인해 주세요. 예) 010-1234-5678";
  if (!input.company.trim()) errors.company = "회사명을 입력해 주세요.";
  else if (input.company.trim().length > limits.company) errors.company = `회사명은 ${limits.company}자 이내로 입력해 주세요.`;
  if (!input.bizNo.trim()) errors.bizNo = "사업자등록번호를 입력해 주세요.";
  else if (!isValidBizNo(input.bizNo)) errors.bizNo = "사업자등록번호를 확인해 주세요. 예) 123-45-67890";
  if (input.message && input.message.length > limits.message) errors.message = `문의 내용은 ${limits.message}자 이내로 입력해 주세요.`;
  if (!input.consent) errors.consent = "개인정보 수집 및 이용에 동의해 주세요.";
  return errors;
}

/** 저장·전송용으로 정리한 값 */
export function normalizeConsultation(input: ConsultationInput) {
  const topic = consultationTopics.find((t) => t.value === input.topic);
  return {
    topic: input.topic,
    topicLabel: topic?.label ?? input.topic,
    name: input.name.trim(),
    position: input.position.trim(),
    phone: formatPhone(input.phone),
    company: input.company.trim(),
    bizNo: formatBizNo(input.bizNo),
    message: input.message?.trim() ?? "",
  };
}

export type ConsultationPayload = ReturnType<typeof normalizeConsultation> & { submittedAt: string };
