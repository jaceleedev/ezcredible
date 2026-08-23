"use client";

import { useEffect } from "react";

/**
 * JS가 살아 있다는 표시만 남긴다. globals.css의 스크롤 리빌 숨김은
 * html.has-motion 아래서만 동작하므로, 무JS 환경에서는 콘텐츠가 그대로 보인다.
 * 스크롤은 브라우저 기본 그대로 둔다(스무스 스크롤 라이브러리 없음).
 */
export function MotionRoot() {
  useEffect(() => {
    document.documentElement.classList.add("has-motion");
  }, []);
  return null;
}
