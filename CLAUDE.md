@AGENTS.md

# 이지크레더블 리디자인 — 작업 가이드

www.ezcredible.com(한국 B2B 기업금융 컨설팅: 정책자금 · 유동성자금 · 성장 솔루션) 리디자인.
기존 사이트도 Jace가 만든 Next.js 사이트이며, **URL 구조는 그대로 유지**한다(검색 유입 보존).
클라이언트 대표님 취향: 밋밋한 것 싫어함 → 이미지 많고 입체적이어야 한다.

## 스택 · 실행

- Next 16.3 (App Router, Turbopack) · React 19 · TypeScript 6.0 · Tailwind 4 · pnpm 11.22 · Node 24 LTS (mise)
- TS 7과 ESLint 10은 쓰지 않는다 — typescript-eslint(<6.1)와 eslint-plugin-react가 아직 미지원
- 개발 서버: `pnpm dev --port 3100` (이 맥에서 3000은 다른 프로젝트가 점유). `.claude/launch.json`(git 제외)에 `dev` 설정이 있어 preview_start "dev"로 뜬다
- 보고 전 검사: `pnpm exec tsc --noEmit` → `pnpm lint` → `pnpm build`, 그리고 브라우저에서 **1200 / 1440 / 1920 / 390** 폭 확인
  (1200에서만 보고 넘겼다가 넓은 화면에서 히어로가 어긋난 적이 있다)

## 현재 상태 (2026-08-24 기준) — 코드 전부 완료, 계정 생성 + 배포만 남음

완료: 디자인 시스템(`/design-system`, noindex) · 홈 · **서브페이지 17/17** · 404 · sitemap · robots · OG 이미지 · 렌탈 리다이렉트 · **코덱스 3D 이미지 21장**(`675037b`) · **상담 저장·알림·관리자 페이지**(아래)
마지막 커밋 `1d22060`. 상담 백엔드 작업은 아직 커밋 전.

### 인프라 확정 (2026-08-24, Jace 결정) — 전부 무료 구간

| 역할 | 서비스 | 비용 | 비고 |
|---|---|---|---|
| 호스팅 | **Vercel Hobby** | $0 | Jace 결정. ToS상 상업적 사용은 Pro($20/월) 대상이며, 문제 시 **코드 변경 없이 결제만 Pro로 올리면 됨**(마이그레이션 아님). 함수 리전은 `vercel.json`에서 **`sin1`(싱가포르)** 로 고정 — 기본값 `iad1`(미국)이면 DB 왕복마다 태평양을 건넌다. Neon과 같은 리전에 두라는 게 Vercel 지침 |
| DB | **Neon Free** | $0 | 무료도 100 CU-hours 소진 시 그 달 컴퓨트 정지 → 실서비스 뒤 **Launch(최저요금 없는 사용량제, 월 $1~3)** 로 올릴 것 |
| 알림 메일 | **Resend Free** | $0 | 3,000통/월·일 100통·데이터 보관 30일 |

검토 후 기각: Cloudflare Workers(월 $5, 상업적 사용 OK·서울 엣지지만 새 스택 학습 부담) · Netlify Free(크레딧 300 소진 시 사이트 정지) · Supabase(무료는 7일 비활동 시 일시정지, Pro $25).
카카오 알림톡은 건당 8~13원 + 비즈채널 심사 + 대행사 계약이라 제외.

### 상담 백엔드 구조 (2026-08-24 구현)

- **스키마**: `db/schema.sql` — `consultations` 테이블 하나. Neon 콘솔 SQL Editor에 붙여넣어 실행(멱등). 실제 Postgres 17 컨테이너에서 전 쿼리 검증 완료
- **DB 접근**: `src/lib/db.ts`(`@neondatabase/serverless` HTTP 드라이버 — 서버리스에 풀 없음, 태그드 템플릿만 허용) + `src/lib/consultations-repo.ts`. ORM 없이 순수 SQL
- **처리 순서가 중요**: `deliver-consultation.ts`는 **저장 성공 = 사용자에게 성공 응답**. 메일 실패로 신청을 되돌리지 않는다(리드 유실 방지). 실패한 메일은 `notify_error`에 남고 관리자 목록에 ⚠로 뜬다
- **IP는 원본을 저장하지 않는다** — `IP_HASH_SECRET`으로 HMAC한 `ip_hash`만. 남용 차단(10분 5건)에 필요한 최소한
- **rate limit은 DB 기준**. 기존 인메모리 Map은 서버리스에서 인스턴스마다 따로라 무력했다 — 고쳤다
- **관리자** `/admin`: 단일 비밀번호 + HMAC 서명 httpOnly 쿠키(`src/lib/admin-auth.ts`). 목록(상태 탭·페이지네이션) / 상세(연락처 tel: 링크). robots.txt·메타 양쪽에서 noindex
- **진행 상태 5단계**: `new`(신규) `in_progress`(진행중) `won`(성공) `lost`(실패) `spam`(스팸). 허용 값은 DB check 제약이 관리하므로 값을 바꾸려면 `db/schema.sql`·`consultations-repo.ts`·`status-badge.tsx` 세 곳을 같이 고칠 것
- **메모는 덮어쓰기가 아니라 로그**(`consultation_notes` 테이블). 적을 때마다 시각과 함께 쌓인다. 상세 화면의 저장 버튼 하나가 상태 변경 + 메모 추가를 같이 처리한다(통화 직후 한 동작으로 끝나도록). 메모를 비우면 상태만 바뀐다
- **`db/schema.sql`은 자가 마이그레이션**이다 — 예전 버전을 이미 실행한 프로젝트에 다시 붙여넣으면 상태값(contacted→in_progress, done→won)을 옮기고 예전 `memo` 컬럼 내용을 메모 로그로 이관한 뒤 컬럼을 지운다. 멱등하므로 언제든 다시 실행해도 된다
- **⚠ 인증 페이지는 반드시 동적이어야 한다**: `isAdminAuthenticated()`가 `cookies()`를 **무조건 먼저** 읽는다. 환경변수 유무로 먼저 분기했더니 빌드 때 `cookies()`에 안 닿아 로그인 화면이 "환경변수 없음" 상태로 정적 프리렌더됐다. Next 16은 Cache Components 사용 시 `export const dynamic`이 제거되므로 여기 의존하지 말 것
- **환경변수 8개**: `.env.example` 참조 (`DATABASE_URL` `RESEND_API_KEY` `CONSULTATION_NOTIFY_TO` `CONSULTATION_NOTIFY_FROM` `CONSULTATION_REPLY_TO` `ADMIN_PASSWORD` `ADMIN_SESSION_SECRET` `IP_HASH_SECRET`)

### 배포 차단 요인 — 클라이언트에게 받을 것 하나 (2026-08-24 조사)

**막힌 것: 카페24 DNS 접근 권한.** Jace는 이 회사를 오래 전에 퇴사해서 계정을 모른다. 이거 하나만 받으면 나머지는 전부 풀린다.

현재 도메인 실측값:

| 항목 | 값 | 의미 |
|---|---|---|
| 네임서버 | `ns1/ns2.cafe24.com`, `.co.kr` | DNS는 **카페24**에서 관리 (Vercel 아님) |
| `www` | `cname.vercel-dns.com` | 이미 Vercel 연결 |
| 루트 A | `76.76.21.21` 등 | Vercel |
| 루트 MX | `kr1-aspmx1/2.worksmobile.com` | 네이버웍스 흔적이나 **회사는 더 이상 안 씀**(Jace 확인). 정리 대상이지만 급하지 않음 |
| 루트 SPF | 없음 | — |

**옛 회사 Vercel 계정은 받을 필요 없다.** 현재 ezcredible.com은 전 직장 Vercel 계정에서 돌고 있고 Jace는 본인 이메일로 새 계정을 팠는데, [Vercel 문서](https://vercel.com/docs/domains/working-with-domains/add-a-domain)상 *"If the domain is in use by another Vercel account, you will need to verify access to the domain, with a TXT record… this will not move the domain into your account, but will allow you to use it in your project."* 즉 **DNS에 TXT 하나만 넣으면 새 프로젝트에서 쓸 수 있다.** 카페24 접근만 있으면 된다.

카페24 접근이 생기면 넣을 레코드(전부 **추가만** 하는 것이라 사이트·기존 메일에 영향 없음):

1. Vercel 도메인 확인용 TXT (Vercel 대시보드가 값을 알려준다)
2. A·CNAME을 새 프로젝트 값으로 (Vercel이 제시하는 값)
3. Resend 3개 — `send` MX, `send` TXT(SPF), `resend._domainkey` TXT.
   **MX가 `send` 서브도메인에 붙으므로 루트 MX를 건드리지 않는다** → 회사 메일을 깨뜨릴 위험 없음. 루트 도메인을 인증해도 `noreply@ezcredible.com`으로 발송 가능

**그 전까지 `CONSULTATION_NOTIFY_TO`는 Jace 주소 하나만 유지할 것.** Resend는 도메인 인증 전까지 가입 계정 주소로만 보내고, 수신자 목록에 허용되지 않은 주소가 하나라도 섞이면 **요청 전체가 403으로 거부**된다(대표님 주소를 넣으면 Jace한테도 안 온다). 저장은 되고 알림만 실패하며 `notify_error`에 남아 관리자 목록에 ⚠로 뜬다.

### 다음 세션 가이드 — 순서대로

계정은 이미 다 만들었다 — Neon(싱가포르, 스키마 적용됨) · Resend(Jace 계정) · Vercel(Jace 새 계정). 로컬 `.env.local`에 값이 다 들어 있고 실제로 저장·발송까지 확인했다.

1. **도메인 없이 Vercel에 먼저 배포한다** (DNS를 기다릴 필요 없는 유일한 큰 작업).
   `*.vercel.app` 주소로 올려서 프로덕션에서 실제로 도는지 확인하는 게 목적이다. 도메인은 나중에 붙이면 된다.

   **⚠ `.env.local`은 배포되지 않는다.** `.gitignore`에 걸려 있어 git에도 없고 Vercel도 못 본다.
   Vercel 프로젝트 설정 > Environment Variables에 **직접** 넣어야 한다. 안 넣으면 빌드는 성공하고
   런타임에만 조용히 실패한다(폼은 "준비 중", `/admin`은 "DATABASE_URL 없음").

   넣을 값 6개 — `.env.local`의 값 그대로:
   `DATABASE_URL` `RESEND_API_KEY` `CONSULTATION_NOTIFY_TO` `ADMIN_PASSWORD` `ADMIN_SESSION_SECRET` `IP_HASH_SECRET`
   `CONSULTATION_NOTIFY_FROM`·`CONSULTATION_REPLY_TO`는 **키를 만들지 말 것**(도메인 인증 후 FROM만 추가).
   빈 값으로 키만 만들어도 이제는 안전하다 — `deliver-consultation.ts`의 `env()`가 빈 문자열을 미설정으로 본다.

   **환경변수는 Production만 체크한다.** 셋 다 체크하면 브랜치 푸시마다 생기는 프리뷰 배포가
   운영 DB에 직접 쓴다(프리뷰에서 폼 테스트하면 진짜 상담 목록에 섞인다).
   Production만 두면 프리뷰에서는 폼이 "준비 중"으로 뜨고 운영 데이터를 안 건드린다.

   Hobby 한도는 여유가 크다(함수 300초·2GB, 외부 네트워크 제한 없음, 리전 1개 — `vercel.json`에 `sin1` 고정).
   배포 후 **실제 폼으로 1건 제출**해서 저장 + 메일 수신 + `/admin` 노출까지 확인하고, 그 행은 지운다.
2. **도메인 연결은 카페24 접근 권한을 받은 뒤**(위 "배포 차단 요인" 절). 그때 할 것:
   `privacyMeta.revised`를 배포일로 → 실제 도메인에서 `sitemap.xml`·`robots.txt`·OG 태그 확인 →
   네이버 서치어드바이저·구글 서치콘솔에 sitemap 제출 → 기존 유입 URL 17개 200 확인(리다이렉트는 `/rental/*` 하나뿐)
3. **클라이언트 데이터 반영**(받는 대로): 보호책임자 이메일(`site.ts` `privacyOfficer.email` — 전화는 채워짐), 2024~2026 성공사례(`src/content/cases.ts`)·수치(`src/content/home.ts` `stats`)·연혁(`src/content/pages/about.ts` `history`, 2023.1 이후 공백에 DevLabel), 의료/어음/PG/VAN 상품 수치·B2B 취급은행(`TODO(client)` 주석 검색), 고해상도 기관 로고(`public/images/partners/`)
4. **배포 전 QA — 2026-08-24 1회차 완료.** 남은 건 Safari 하나뿐.
   - 측정 방식: 각 페이지를 지정 폭 iframe에 띄워 `scrollWidth` 초과·깨진 이미지·h1 개수를 재는 스크립트(스크린샷 육안 확인보다 확실하다). **19페이지 × 4폭(390/1200/1440/1920) = 76조합 전부 이상 없음**, 관리자 3페이지 × 4폭도 이상 없음
   - 내부 링크 21개 전부 200, 404가 실제 404 반환, `/rental/*` 308, robots·sitemap(18항목)에 admin·design-system 없음
   - **Lighthouse(프로덕션 빌드, 모바일): 접근성·모범사례·SEO·Agentic 전부 100, 실패 0건.** 성능 트레이스 LCP 129ms·CLS 0(로컬호스트라 LCP 절대값은 무의미, CLS 0과 렌더차단 0ms가 의미 있는 값)
   - 1회차에서 잡아 고친 것 3개는 아래 "QA에서 고친 것" 절 참고
   - `prefers-reduced-motion`: CSS 3블록이 배포 CSS에 살아 있음을 런타임 확인(scroll-behavior·[data-reveal]·float/줄리빌). JS는 `case-carousel`·`counter` 둘 다 early-return
   - 키보드: 폼 컨트롤 10개 전부 라벨 연결, 양수 tabindex 없음, 진짜 `button[type=submit]`, 허니팟은 `tabIndex={-1}`+`aria-hidden`, **검증 실패 시 첫 오류 필드로 포커스 이동**. 단 **실제 타건 테스트는 못 했다** — 브라우저 패널이 OS 포커스를 못 받아 `document.hasFocus()`가 false
   - Safari / 모바일 Safari: **Jace가 직접 확인, 이상 없음**(2026-08-24). 이 환경에서는 Safari를 띄울 수 없으므로 앞으로도 이 항목은 Jace가 볼 것

### QA에서 고친 것 (2026-08-24)

- **골드 텍스트 대비 미달** — `Chip tone="gold"`(홈 "기업인증 NEW")가 4.3:1로 AA 미달. 원인은 Tailwind 4가 `@theme` 색을 oklch로 변환하면서 실제 렌더가 `#9a6400` → `#9d6908`로 밝아진 것. **토큰 계산값만 믿지 말 것.** `--color-gold-700`을 `#8a5a00`으로 낮춰 5.4:1 확보. 이 토큰은 밝은 배경 위 텍스트로만 쓰여 다른 곳에 영향 없음
- **헤더 로고 링크 접근명 불일치(WCAG 2.5.3)** — 로고 `<img alt="(주)이지크레더블">`와 옆 텍스트가 같은 글자라 링크 내부 텍스트가 중복됐고, `aria-label="(주)이지크레더블 홈"`에 그게 다 안 들어갔다. `Logo`에 `alt` prop을 추가해 헤더에서만 `alt=""`(장식 이미지). 푸터 로고는 옆에 글자가 없으므로 alt 유지
- **"자세히 보기" 링크 4개가 비서술적(SEO)** — **`aria-label`로는 안 고쳐진다.** Lighthouse `link-text`는 접근명이 아니라 보이는 텍스트를 본다. `<span className="sr-only">{솔루션명} </span>자세히 보기`로 DOM 텍스트만 늘렸다(화면 표시는 그대로, 접근명에 보이는 글자가 포함되어 2.5.3도 만족)
- **관리자 화면 헤더 문제 2개** — 헤더가 `fixed`(72/88px)인데 관리자 레이아웃에 상단 여백이 없어 제목이 가렸고(`pt-28 lg:pt-36`으로 해결), 스크롤 전 헤더가 `bg-transparent text-white`라 흰 배경에 흰 로고로 안 보였다(`pathname.startsWith("/admin")`이면 항상 solid). 둘 다 배너가 있는 일반 페이지에서는 안 드러나던 문제
5. 미결 답 받기(아래 "미결" 절) — 업무위탁 로고 스트립(홈+회사소개에 들어가 있음), factoring 서브도메인, 기준금리 분기 갱신 담당(`QUARTERLY` 주석 3곳: 소진공 기준금리, 기보 할인율)

검수 시 확인한 코덱스 변경(참고): 히어로 `width/height` 1600×1000, `arrow-3d.svg` → `.png`, 서비스 카드 `self-stretch`, CTA 리드 모바일 `max-w`, 푸터 로고 `self-start`, `SubHero` 배너 모바일 `object-[85%_center]`(오른쪽 오브젝트가 보이도록), 자금 페이지 11개 01 스테이지는 그룹 카드 이미지 재사용, 회사소개 3페이지 01 스테이지도 솔루션 이미지 재사용, `/design-system/og` 재캡처. `privacyOfficer.phone`이 채워져 있다(Jace 확인값) — 이메일은 아직 빈 값.

### SEO · 메타 (2026-08-23)

- `src/app/sitemap.ts`(홈 + nav 17개, `/design-system`·`/api` 제외) · `src/app/robots.ts`(design-system·api 차단) · `next.config.ts` 리다이렉트 `/rental/:path*` → `/` (308, 기존 사이트에서 제거된 렌탈 솔루션)
- OG 이미지: `src/app/opengraph-image.png`(1200×630) + `.alt.txt`. 원본은 `/design-system/og` 페이지 — 1200×630 뷰포트로 `#og-card`를 캡처(Next 개발 배지 `nextjs-portal`은 지운 뒤). 코덱스 히어로 이미지로 재캡처 완료(2026-08-24)
- **페이지 메타는 반드시 `pageMetadata()`(`src/lib/metadata.ts`)로** — Next는 `openGraph` 같은 중첩 객체를 세그먼트 간 병합하지 않아서, 페이지가 `openGraph`를 직접 쓰면 루트의 siteName·locale·OG 이미지가 사라진다(실제로 그랬다). 홈만 루트 layout 메타 + 파일 규칙 이미지
- 404: `src/app/not-found.tsx` — 코발트 스테이지 + 전체 메뉴. 프로덕션에서 404 상태 코드 확인

### 고객지원 2페이지 (2026-08-23)

- 개인정보처리방침(`src/content/pages/privacy.ts`, 13조): 기존 2023-08-31 본문을 개인정보 보호법 제30조 체계로 손봤다 — 정보통신망법 삭제, 수집 항목에 직책·희망 솔루션·(선택) 문의 내용, 보유기간 3년으로 통일, 제3자 제공·처리 위탁 조항 분리, 접속기록 1년, 구제기관 갱신, 면책 문구 삭제. **보호책임자 = 대표 이주환**, 연락처는 `site.ts` `privacyOfficer`(전화 채워짐, 이메일은 빈 값 — 비어 있으면 표시 안 함 + DevLabel). 제6조 위탁 현황은 배포(호스팅·전송 서비스) 시 채울 것. 개정일 `privacyMeta.revised`는 배포일로
- 상담신청: 기존 필드(희망 솔루션·이름·직책·연락처·회사명·사업자등록번호·동의) + 선택 문의 내용. 검증은 `src/lib/consultation.ts`(클라이언트·서버 공용 — 전화 형식, 사업자번호 체크섬), 동의 박스에 수집 항목·목적·보유기간 요약(`consentSummary`, 방침과 같은 값). API는 허니팟 + IP당 10분 5건 제한. `?topic=policy-funds|liquidity-funds|growth|certification`로 희망 솔루션 미리 선택 — `SubHero`의 빠른 상담신청이 그룹에 맞게 붙인다


## 디자인 레퍼런스 — 먼저 볼 것

1. **승인된 디자인 캔버스 v2.1 "코발트 스튜디오"**
   https://claude.ai/code/artifact/9bf8dd6e-c562-414e-92e4-3958934285d5
   홈 보드(Main) + 서브페이지 템플릿 보드(Sub, 운전자금) + 스티키 노트(코덱스 이미지 생성 리스트)
2. **코드로 구현된 결과** — 브라우저로 직접 볼 것: `/design-system`(토큰·컴포넌트 전부), `/`(홈)
3. 기존 사이트 www.ezcredible.com — 콘텐츠와 섹션 순서의 기준. 디자인은 참고하지 않는다(이전 디자이너 작업)
4. 기각된 v1 세 방향 — https://claude.ai/code/artifact/83906312-3316-4d5c-832a-4241bd5f035f
   (다크 HUD / 종이 에디토리얼 / 하늘) — "밋밋하다, 폰트 별로다, 이미지가 없다"로 전부 기각. 이 방향으로 돌아가지 말 것

## 디자인 규칙 — 코발트 스튜디오

- **팔레트** (`src/app/globals.css` `@theme`): cobalt 500 `#4271F4` = 로고 색 = 대표 스테이지 색. 흰 글자를 얹는 면은 **cobalt-600 이상**(대비 5.9:1). 네이비 `#0B1E4D`(카드) / `#0B1433`(푸터). 골드 `#F5B940`는 3D 오브젝트(동전·캐릭터)에서 온 보조 포인트 — 단위·태그·작은 강조에만
- **폰트**: 헤드라인 SUIT 700/800(`next/font/local`, `--font-suit`), 본문 Pretendard Variable 동적 서브셋 92조각 self-host(`src/styles/pretendard.css`). **next/font/google·Noto Sans KR 금지**(한글 서브셋 없음/촌스러움)
- **이미지 우선**: 모든 주요 섹션에 이미지 슬롯. 스타일은 하나 — soft 3D 렌더(코발트·네이비·골드, 스튜디오 조명, 투명 PNG). 기관·위탁사 로고는 실제 로고 그대로
- **입체감 장치**: 하프톤 도트(`<Halftone>`), 코발트 스테이지(`stage-cobalt`), 겹치는 카드(히어로 위 네이비 카드), 레이어드 그림자(`shadow-card`), 틴트 이미지 스테이지(`<ImageStage>`)
- **모션 = 요소 단위**: 돈주머니 플로팅, 헤드라인 줄 리빌 + 골드 밑줄(`.reveal-line`, `.underline-sweep`), 스크롤 리빌(`<Reveal>`), 카운터(`<Counter>`), 성공사례 4.5초 자동 넘김. **스크롤 하이재킹 금지** — Lenis는 요청된 적 없고 Jace가 직접 빼라고 했다
- **푸터**: 로고 · 상담신청|개인정보처리방침 · 슬로건 · 상호/대표자/사업자등록번호/주소/Copyright 전부 유지
- **로고**: `public/brand/ezcredible-logo.svg`(클라이언트 파일)를 **파일 그대로** 쓴다. 푸터 = 흰색 사본. 헤더 = 한글을 잘라낸 마크 사본 + **"(주)이지크레더블" Pretendard 텍스트**(마크와 같은 색으로 흰색↔코발트 전환). 로고 레터링을 재조합하거나 다른 폰트로 바꾸지 말 것
- **금지 목록**: HUD/모노 라벨·코너 마커 같은 테크 장식, 라인 일러스트(3D와 안 섞임), 이미지 없는 텍스트 섹션, 기본 Tailwind 그림자, 새 색 발명

## 컴포넌트 규칙

- `cn()`(`src/lib/cn.ts`)은 `extendTailwindMerge`로 커스텀 폰트 크기(hero/h1/h2/h3/lead/stat)를 등록해 둔 것. className을 받는 컴포넌트는 반드시 `cn()`을 쓴다
- 모바일 드로어는 `<header>`의 형제여야 한다(헤더의 backdrop-blur가 fixed 자식을 무너뜨림)
- 서버 컴포넌트 → 클라이언트 컴포넌트로 함수 prop을 넘기지 않는다(`Counter`의 `plain` 불리언처럼 직렬화 가능한 값만)
- 임시 이미지는 `<DevLabel>`로 표시(프로덕션에서 사라짐). `ImageStage`는 `src`가 없으면 `StageArt` 자리표시를 그린다
- 서브페이지 부품(`src/components/ui`): `Breadcrumb` · `SubNav`(배너 아래 떠 있는 알약, 클라이언트 — 모바일에서 활성 항목을 가운데로 스크롤) · `Callout`(`tone="gold"`는 주의사항) · `NumberedCard` · `KeyValueTable`(2열) · `ImageStage`(`aspect="photo"`가 서브 01 스테이지) · `CTABand inset`
- 서브페이지 블록(`src/components/sub`): `SubHero`(배너+브레드크럼+h1+서브내비를 한 덩어리로, `href`만 주면 site.ts nav에서 그룹을 찾는다) · `NumberedSection`(01 + h2 + 리드, `aside`를 주면 캔버스 01처럼 2열) · `FundIntro`(정의 콜아웃 + 스테이지 + `FactStrip`) · `FeatureCards`(카드 3장, 세 번째 navy) · `DataTable`(다열 표, 첫 열 sticky, rowSpan 병합) · `ProcessSteps` · `RestrictionsCallout` — 전부 `/design-system#sub`에 예시
- 서브페이지 조립 방식: **블록은 공용, 본문 구성은 페이지마다 다르게** 명시적으로 조립한다(범용 JSON 렌더러 만들지 말 것). 페이지 글은 `src/content/pages/*.ts`, `page.tsx`는 metadata + 블록 나열만

## 콘텐츠 · IA

- 내비/회사정보: `src/content/site.ts` (기존 URL 그대로). 홈 데이터: `src/content/home.ts`, 사례 9건: `src/content/cases.ts`
- 제거 확정: 렌탈 솔루션, 업무 협약사(메뉴). 추가: **기업인증** (`/growth/certification`, 성장 솔루션 4번째)
- **ISMRI(지속가능경영연구원, https://www.ismri.org)** — 대표님 지인 회사, 인증 전문. 홈에 파트너 카드 + 외부 링크로 들어가 있다. 협약사 로고 스트립처럼 다루지 말고 "인증 → 정책자금 우대 → 자금 확보" 흐름으로 엮는다
- 기존 수치·사례·연혁은 전부 2023년 것 → 클라이언트 최신 데이터 필요. 카피는 **자연스럽게 다시 써도 되고 최신 정보로 보강해도 된다**(Jace 허락). 단 한도·금리 같은 숫자는 기억이 아니라 중진공(kosmes.or.kr) 자금별 안내 페이지에서 확인해서 쓸 것.
  참고: 2026 중진공 정책자금 총 4조 4,313억(융자 4조 643억 + 이차보전 3,670억), 혁신창업사업화 1조 6,058억 · 신성장기반 1조 2,851억 · 재도약 6,125억 · 긴급경영안정 2,500억; 2026 변화 — 정책자금 내비게이션, DX·ESG 금리 우대, 원스트라이크 아웃제 (2차 출처, 공고로 재확인)

## 서브페이지 템플릿 (캔버스 Sub 보드)

배너(사진 + 네이비 오버레이 + 하프톤, 브레드크럼, h1, 한 줄 부제) → 배너 아래 겹쳐 뜨는 `SubNav`(같은 그룹 하위 메뉴 + 빠른 상담신청) → 번호 섹션 01~(정의는 `Callout`, 장점·특징·솔루션은 카드 3장 — 솔루션 카드는 네이비, 종류는 `NumberedCard` 그리드, 세부내용은 `KeyValueTable`) → `CTABand inset` → 푸터.
17개 페이지 목록은 `site.ts`의 nav 그대로. 배너 사진 8종도 코덱스 생성 대상(아래). 배너가 없는 페이지는 `SubHero`가 코발트 그라디언트로 폴백한다. 지금은 캔버스의 임시 사진 `public/images/temp/sub-banner.jpg`(1400×213 저해상도)를 `DevLabel`과 함께 쓴다.

정책자금 4페이지가 기준 구현이다: 운전자금(기본형 01~05) · 시설자금(03이 `DataTable`) · 소상공인자금(03 규모 표 + 04 대상·우대금리 + 05 조건 표 + 06 절차 2종) · B2B구매자금(02 스펙 `KeyValueTable` + 04 보증 개요 2열 + 05 주의사항 골드 콜아웃).

### 정책자금 콘텐츠 출처 (2026-08-23 확인 — `src/content/pages/policy-funds.ts` 상단 주석에도 있음)

- 중진공: kosmes.or.kr 사업개요(`SHSBI001M0`)·융자대상/제한(`002`)·융자절차(`003`)·혁신창업(`004`)·신시장진출(`006`)·신성장기반(`007`)·재도약(`008`)·긴급경영안정(`012`). 2026 융자 4조 643억 + 이차보전 3,670억, 기업당 60억(지방 70억·우대 100억), 운전 연 5억·5년(거치 2), 시설 10년(거치 담보 4·신용 3). 밸류체인안정화자금은 kosmes에 수치 페이지가 없어 이름·설명만 넣었다
- 소진공: 「2026년 중소벤처기업부 소상공인 정책자금 융자사업 공고」(제2025-656호, mss.go.kr 첨부 PDF 30쪽 — 총 3조 3,620억, 자금별 한도·금리·기간·우대금리). 분기 기준금리(2026 3분기 3.85%)는 semas.or.kr 소상공인정책자금 페이지 — **분기마다 갱신**, 코드에 `QUARTERLY` 주석
- B2B구매자금: 기존 사이트 본문(위탁사 기준) 유지. 취급은행 14곳·수수료 구조는 `TODO(client)` — 클라이언트 확인 전 바꾸지 말 것
- 기존 사이트의 "운전자금 종류" 6개(경영안전자금·중소기업신용자금 등)는 2026 중진공 체계가 아니라 6개 세부자금으로 교체했다. 돌아가지 말 것

### 유동성자금 콘텐츠 출처 (`src/content/pages/liquidity-funds.ts`)

- 매출채권 팩토링 = **기보 중소기업팩토링** 제도. kibo.or.kr 서비스 안내(`/factoring/sprt/sprt01/fctSvcNtc.do`)·기준 할인율(`/sprt02/selectStdDcrto.do`). 기업당 최대 30억, 2026-04-01 기준 할인율 연 1.50~4.20%(90일 평균 0.8%), 판매기업 기술사업평가등급 B↑·구매기업 팩토링등급 BB↑. 기존 사이트 비교표의 "외담대 상환청구권 없음"은 기보 표대로 "있음"으로 고쳤다. 할인율은 `QUARTERLY`
- 의료사업자 대출(월 요양급여 600%+200% 최대 30억, 최저 연 6.6%) · 전자어음할인(N01~N15 등급별 할인율 표)은 위탁 상품사 기준이라 기존 값 유지 + `TODO(client)`. 절차 5단계는 상품 조건에서 유추한 것 — 클라이언트 확인 필요
- 페이지 구성: 팩토링(02 카드 4장 → 03 비교표+상환청구권 콜아웃 → 04 판매/구매 이점 2열 카드 → 05 요건 표 → 06 절차 5단계) · 의료(02 카드 4 → 03 표 → 04 대상 4카드 → 05 절차) · 어음(02 카드 4 → 03 할인율 표 → 04 표 → 05 절차). `FeatureCards columns={4}`로 특징 3 + 솔루션 navy

### 성장 솔루션 콘텐츠 출처 (`src/content/pages/growth.ts`)

- 기업신용평가: 기존 사이트 본문(등급 정의·평가요소·조달청 입찰용 표) 유지. TCB 기술등급 T1~T10 정의는 이크레더블 e-TCB 등급체계(etcb.co.kr)로 채웠다(기존 표는 T10이 비어 있었음). 구성: 02 카드 4 → 03 등급 표(배지) → 04 재무/비재무 2열 카드 → 05 조달청·TCB 표 2개 → 06 개선 4단계
- PG·VAN: 기존 사이트 본문(KIS정보통신·KSNET 위탁 기준) 유지 + `TODO(client)`. PG 정산주기 표는 rowSpan 병합 + `columnWidths`. VAN 이용 절차 4단계는 일반 절차를 쓴 것 — 클라이언트 확인
- 기업인증(신규): ISMRI 9개 서비스 분류·실적(11년+/230+/590+)으로 작성. 구성: 02 인증→우대→자금 4단계 → 03 효과 카드 4 → 04 인증 4그룹 카드 + ISMRI 기타 영역 → 05 ISMRI 파트너 카드(외부 링크) → 06 추천 기업 4. 협약사 로고 스트립처럼 다루지 않는다

### 회사소개 그룹 (`src/content/pages/about.ts`) — `FundIntro` 없이 페이지별 구성

- 회사소개: 01 태그라인 콜아웃+소개 → 홈 `stats` 수치 4개(2023년 값, `TODO(client)`) → 02 세 가지 약속(기존 3선언) → 03 하는 일(홈 `solutions` 카드 재사용) → 04 함께하는 기관(`PartnerLogos` — 홈 `Partners`에서 분리한 로고 두 줄) → 05 회사 정보 표
- 회사연혁: `Timeline` 부품(연도 묶음 + 세로선 카드) 12건 최신순. **2023.1 이후 공백** — `DevLabel`로 표시, 클라이언트 데이터 대기
- 업무절차: 6단계 `ProcessSteps columns={3}` + 원칙 카드 3 + 준비 서류 4. 수수료·비용 같은 확인 안 된 주장은 넣지 않았다
- 오시는길: 구글 지도 임베드(키 없음, `output=embed`) + 네이버/카카오 지도 검색 링크 버튼, 지하철·버스·정류장 카드, 도보·주차(30분 무료, 이후 30분당 1,000원)

## 코덱스 이미지 리스트 — 완료(2026-08-24). 재생성·추가 시 참고

**코덱스에게 줄 실행 가이드는 `docs/codex-image-guide.md`** (슬롯별 영문 프롬프트 · 규격 · 파일 경로 · 코드 연결 지점 · 검증 · 보고 형식). 아래 표는 요약이며 규격이 다르면 가이드가 우선. 공통 프롬프트 접두어: **soft 3D render, 코발트 블루(#4271F4)·네이비·웜 골드 팔레트, 매트+살짝 광택, 스튜디오 조명(왼쪽 위), 배경 투명 PNG, 그림자 부드럽게, 텍스트 없음**

| # | 슬롯 | 내용 | 들어갈 곳 |
|---|---|---|---|
| 1 | 히어로 1600×1000 | 금화 더미 + 떠 있는 계약서 + 상승 화살표 | `public/images/hero-3d.png` (temp 교체) |
| 2 | 정책자금 카드 800×600 | 관공서 도장 찍힌 서류 + 동전 | `home.ts` solutions[0].image |
| 3 | 유동성자금 카드 | 물결처럼 흐르는 금화 + 모래시계 | solutions[1].image |
| 4 | 성장 카드 | 상승 막대그래프 + 작은 화살표 | solutions[2].image |
| 5 | 회사소개 카드 1400×780 | 흰색 3D 상승 화살표(네이비 배경용) | `public/images/arrow-3d.png` (svg 교체) |
| 6 | 차별화 서비스 3종 | 말풍선+전문가 / 상품 쌓인 선반 / 체크리스트 든 관리자 | `home.ts` services[].image |
| 7 | 기업 인증 | 인증서 + 리본 메달(골드) | 인증 섹션/페이지 |
| 8 | CTA 2000×1000 JPG | 서류판 든 캐릭터 + 하늘·도시(기존 캐릭터 느낌) | `public/images/cta-character.jpg` (temp 교체) |
| 9 | 서브페이지 배너 8종 2000×600 | 각 솔루션 상징 오브젝트를 네이비 배경에 어둡게 | 운전/구매/시설/소상공인/팩토링/의료/어음/인증 |
| 10 | 그룹 배너 3종 2000×600 (Jace 승인 2026-08-23) | 성장: 상승 그래프+신용등급 배지 / 회사소개: 빌딩+악수하는 캐릭터 / 고객지원: 헤드셋 캐릭터+말풍선 | 기업신용평가·PG·VAN(성장), 회사소개·연혁·업무절차·오시는길, 상담신청·개인정보처리방침 |

21장 모두 `public/images/`에 들어가 있고 temp 폴더는 삭제됐다. 이미지를 바꾸면 `/design-system/og`에서 OG 이미지를 재캡처할 것. 자금 페이지 11개·회사소개 3페이지의 01 스테이지(`FundPage.image` / `ImageStage src`)는 그룹 카드 이미지를 재사용 중 — 페이지별 전용 오브젝트가 필요해지면 가이드 2절 형식으로 추가 생성. 기관 로고 10개는 기존 사이트의 200px PNG라 고해상도/SVG를 클라이언트에게 요청해야 한다.

## 일하는 방식 (Jace 피드백)

- **지시는 글자 그대로 실행**한다. 더 나은 대안이 있으면 지시대로 만든 뒤 한 줄로만 제안 (로고를 내 방식으로 바꿨다가 "왜 하라는 대로 안 하냐"를 들었다)
- 커밋 메시지는 한글 + 영문 타입 접두사(`feat:` `fix:` `chore:` `docs:`). 커밋/푸시는 Jace가 시킬 때 — 보통 마일스톤마다 "커밋하고 푸시해줘"라고 한다
- 보고는 실제로 확인한 것만. 스크린샷·측정값으로 검증하고 말할 것
- 답변·코드 주석은 한글

## 미결 (Jace에게 물어볼 것)

- 지원기관·업무위탁 로고 스트립 유지 여부(홈 `Partners` + 회사소개 04 `PartnerLogos`에 넣어둠, 답변 없음)
- factoring.ezcredible.com(별도 골드 톤 랜딩) 유지/흡수 — 팩토링 페이지(`/liquidity-funds/receivables-factoring`)가 기보 기준으로 완성돼 있어 흡수도 가능
- 클라이언트 데이터: 2024~2026 성공사례·수치·연혁, 보호책임자 이메일, 의료/어음/PG/VAN 상품 수치·B2B 취급은행 확인, 고해상도 기관 로고
- 분기마다 갱신할 값(`QUARTERLY` 주석): 소진공 정책자금 기준금리(2026 3분기 3.85%), 기보 팩토링 기준 할인율(2026-04-01 1.50~4.20%) — 누가 언제 갱신할지
