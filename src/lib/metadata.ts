import type { Metadata } from "next";
import { company } from "@/content/site";

export const ogImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "(주)이지크레더블 — 기업의 가능성을 현실로 만드는 파트너. 정책자금 · 유동성자금 · 성장 솔루션",
};

/**
 * 페이지 메타데이터. Next는 openGraph 같은 중첩 객체를 세그먼트 간에 병합하지 않고 통째로 바꾸므로,
 * 페이지가 openGraph를 쓰면 루트의 siteName·locale·파일 기반 OG 이미지가 사라진다. 그래서 전부 여기서 채운다.
 */
export function pageMetadata({ title, description, href }: { title: string; description: string; href: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: href },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: company.name,
      title: `${title} | ${company.name}`,
      description,
      url: href,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image" },
  };
}
