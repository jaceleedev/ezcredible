/**
 * JSON-LD를 <script type="application/ld+json">로 심는다.
 * `<`를 유니코드 이스케이프하는 이유: 데이터에 "</script>" 같은 문자열이 섞이면
 * 스크립트 태그가 거기서 끊기고 그 뒤가 HTML로 해석된다.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
