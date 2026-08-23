import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { company } from "@/content/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MotionRoot } from "@/components/motion/motion-root";

/** 헤드라인 전용 SUIT. 본문 Pretendard는 globals.css의 동적 서브셋 @font-face로 로드된다. */
const suit = localFont({
  src: [
    { path: "../../public/fonts/suit/SUIT-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-suit",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Pretendard Variable", "Apple SD Gothic Neo", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: { default: company.name, template: `%s | ${company.name}` },
  description: company.description,
  applicationName: company.name,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: company.name,
    title: company.name,
    description: company.description,
  },
  // 홈의 OG 이미지는 app/opengraph-image.png(파일 규칙). 서브페이지는 src/lib/metadata.ts의 pageMetadata()가 채운다
  twitter: { card: "summary_large_image" },
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
