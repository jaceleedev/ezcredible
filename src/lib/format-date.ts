/** 서버는 UTC로 도므로 표시용 시각은 항상 한국 시간으로 고정해서 포맷한다 */
export function formatKst(iso: string, withTime = true) {
  return new Date(iso).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...(withTime ? { hour: "2-digit", minute: "2-digit", hour12: false } : {}),
  });
}
