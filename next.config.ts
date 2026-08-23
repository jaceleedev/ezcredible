import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 기존 사이트에서 제거된 렌탈 솔루션 — 검색 유입은 홈으로 받는다
      { source: "/rental/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
