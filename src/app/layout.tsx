import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { company, searchConsole, seo } from "@/content/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MotionRoot } from "@/components/motion/motion-root";

/** 헤드라인 전용 SUIT. 본문 Pretendard는 globals.css의 동적 서브셋 @font-face로 로드된다. */
const suit = localFont({
  // 800만 등록한다. 헤드라인은 globals.css의 h1~h4 규칙과 .font-display 클래스 모두 800으로 고정돼 있어
  // 700 페이스는 preload만 되고 한 글자도 렌더에 쓰이지 않았다(167KB). 700을 쓰는 곳이 생기면 다시 추가할 것.
  src: [{ path: "../../public/fonts/suit/SUIT-ExtraBold.woff2", weight: "800", style: "normal" }],
  variable: "--font-suit",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Pretendard Variable", "Apple SD Gothic Neo", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: { default: seo.title, template: `%s | ${company.name}` },
  description: seo.description,
  applicationName: company.name,
  // 홈의 자기참조 canonical. 서브페이지 17개는 pageMetadata()가 각자 덮어쓰고,
  // 덮어쓰지 않는 나머지(/admin, /design-system)는 전부 noindex라 영향이 없다.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: company.name,
    title: seo.title,
    description: seo.description,
    url: "/",
  },
  // 홈의 OG 이미지는 app/opengraph-image.png(파일 규칙). 서브페이지는 src/lib/metadata.ts의 pageMetadata()가 채운다
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    // 이미지 미리보기를 큰 크기로 허용한다. 기본값이면 검색 결과 썸네일이 작게 잘린다
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // 값이 비어 있으면 태그 자체가 렌더되지 않는다 (site.ts searchConsole)
  verification: {
    ...(searchConsole.google ? { google: searchConsole.google } : {}),
    ...(searchConsole.naver ? { other: { "naver-site-verification": searchConsole.naver } } : {}),
  },
};

/** 라이트 모드 전용 사이트. 모바일 브라우저 상단 색은 배너·히어로의 네이비에 맞춘다 */
export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#0B1E4D",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${suit.variable} h-full`}>
      <body id="top" className="flex min-h-full flex-col">
        <MotionRoot />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
