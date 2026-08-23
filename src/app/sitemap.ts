import type { MetadataRoute } from "next";
import { company, contentRevised, nav } from "@/content/site";

/**
 * 사이트맵 — 홈 + site.ts nav의 17개 서브페이지. /design-system(noindex)과 /api는 넣지 않는다.
 * lastModified는 site.ts의 contentRevised(수동 개정일). 빌드 시각을 쓰면 배포할 때마다
 * 전 페이지가 바뀐 것처럼 보여 크롤러가 lastmod를 무시하게 된다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(contentRevised);
  const priority = (href: string) => {
    if (href.startsWith("/policy-funds") || href.startsWith("/liquidity-funds") || href.startsWith("/growth")) return 0.8;
    if (href.startsWith("/about")) return 0.6;
    if (href === "/support/consultation") return 0.7;
    return 0.3;
  };

  const pages = nav.flatMap((group) => group.items).map((item) => ({
    url: `${company.url}${item.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: priority(item.href),
  }));

  return [{ url: company.url, lastModified: now, changeFrequency: "weekly" as const, priority: 1 }, ...pages];
}
