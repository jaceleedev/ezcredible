import type { ConsultationPayload } from "./consultation";
import { company } from "@/content/site";

/**
 * 상담 신청 알림 메일. 대표님이 휴대폰 메일 앱에서 바로 읽고 전화까지 거는 흐름을 전제로
 * 연락처를 tel: 링크로 만들고, 표는 메일 클라이언트 호환을 위해 table 태그로 짠다.
 */

const cobalt = "#2F5BD9"; // 흰 글자를 얹으므로 cobalt-600 계열
const navy = "#0B1E4D";
const border = "#E4E8F0";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function row(label: string, valueHtml: string) {
  return `<tr>
    <th align="left" style="padding:10px 12px;border-bottom:1px solid ${border};background:#F7F9FC;font-weight:600;color:${navy};white-space:nowrap;font-size:14px;">${label}</th>
    <td style="padding:10px 12px;border-bottom:1px solid ${border};color:#1A2440;font-size:14px;">${valueHtml}</td>
  </tr>`;
}

export function consultationSubject(payload: ConsultationPayload) {
  return `[상담신청] ${payload.company} · ${payload.name} 님 (${payload.topicLabel})`;
}

export function consultationHtml(payload: ConsultationPayload, id: number) {
  const submitted = new Date(payload.submittedAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  const tel = payload.phone.replace(/-/g, "");
  const adminUrl = `${company.url}/admin/${id}`;

  return `<!doctype html><html lang="ko"><body style="margin:0;padding:24px 12px;background:#F2F5FA;font-family:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid ${border};">
    <tr><td style="background:${cobalt};padding:20px 24px;">
      <div style="color:#fff;font-size:18px;font-weight:700;">새 상담 신청이 접수됐습니다</div>
      <div style="color:#D6E0FA;font-size:13px;margin-top:4px;">${escapeHtml(submitted)} · 접수번호 ${id}</div>
    </td></tr>
    <tr><td style="padding:20px 24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${border};border-radius:8px;overflow:hidden;">
        ${row("희망 솔루션", escapeHtml(payload.topicLabel))}
        ${row("이름", `${escapeHtml(payload.name)} ${escapeHtml(payload.position)}`)}
        ${row("연락처", `<a href="tel:${tel}" style="color:${cobalt};font-weight:600;text-decoration:none;">${escapeHtml(payload.phone)}</a>`)}
        ${row("회사명", escapeHtml(payload.company))}
        ${row("사업자등록번호", escapeHtml(payload.bizNo))}
        ${payload.message ? row("문의 내용", escapeHtml(payload.message).replace(/\n/g, "<br>")) : ""}
      </table>
      <div style="margin-top:20px;text-align:center;">
        <a href="${adminUrl}" style="display:inline-block;background:${navy};color:#fff;padding:11px 22px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;">관리자 페이지에서 보기</a>
      </div>
    </td></tr>
    <tr><td style="background:#F7F9FC;padding:14px 24px;border-top:1px solid ${border};color:#6B7896;font-size:12px;">
      ${escapeHtml(company.name)} 홈페이지 상담 신청 알림 · 이 메일은 발신 전용입니다
    </td></tr>
  </table>
</body></html>`;
}

export function consultationText(payload: ConsultationPayload, id: number) {
  const submitted = new Date(payload.submittedAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  return [
    `새 상담 신청 (접수번호 ${id})`,
    submitted,
    "",
    `희망 솔루션: ${payload.topicLabel}`,
    `이름: ${payload.name} ${payload.position}`,
    `연락처: ${payload.phone}`,
    `회사명: ${payload.company}`,
    `사업자등록번호: ${payload.bizNo}`,
    payload.message ? `문의 내용: ${payload.message}` : "",
    "",
    `관리자 페이지: ${company.url}/admin/${id}`,
  ]
    .filter(Boolean)
    .join("\n");
}
