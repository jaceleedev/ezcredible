# 코덱스 이미지 작업 가이드 — 이지크레더블 리디자인

이 저장소(Next.js 16 · App Router · Tailwind 4)의 **임시 이미지를 soft 3D 렌더로 교체**하는 작업입니다.
만들 이미지는 **10개 슬롯, 총 21장**이고, 전부 `public/images/` 아래에 넣은 뒤 아래 "4. 코드 연결"대로 경로만 바꾸면 됩니다.
디자인 규칙의 원본은 `CLAUDE.md`(코발트 스튜디오)이며, 이 문서가 그 규칙 중 이미지에 해당하는 부분을 풀어 쓴 것입니다.

---

## 0. 한눈에

| # | 슬롯 | 장수 | 규격 | 파일 | 쓰이는 곳 |
|---|---|---|---|---|---|
| 1 | 홈 히어로 오브젝트 | 1 | 1600×1000 · 투명 PNG | `public/images/hero-3d.png` | `src/components/home/hero.tsx` |
| 2 | 정책자금 카드 | 1 | 800×600 · 투명 PNG | `public/images/solutions/policy-funds.png` | `src/content/home.ts` `solutions[0].image` + 정책자금 4페이지 01 스테이지 |
| 3 | 유동성자금 카드 | 1 | 800×600 · 투명 PNG | `public/images/solutions/liquidity-funds.png` | `solutions[1].image` + 유동성 3페이지 01 |
| 4 | 성장 카드 | 1 | 800×600 · 투명 PNG | `public/images/solutions/growth.png` | `solutions[2].image` + 성장 3페이지 01 |
| 5 | 회사소개 카드 화살표 | 1 | 1400×780 · 투명 PNG(흰색 오브젝트) | `public/images/arrow-3d.png` | `src/components/home/intro-card.tsx` |
| 6 | 차별화 서비스 3종 | 3 | 800×600 · 투명 PNG | `public/images/services/{expert,shelf,checklist}.png` | `src/content/home.ts` `services[].image` |
| 7 | 기업 인증 | 1 | 800×600 · 투명 PNG | `public/images/certification.png` | `src/content/pages/growth.ts` `certification.image` |
| 8 | 홈 CTA 배경 | 1 | 2000×1000 · JPG | `public/images/cta-character.jpg` | `src/app/page.tsx` `CTABand image` |
| 9 | 서브페이지 배너 8종 | 8 | 2000×600 · JPG | `public/images/banners/{operating,b2b-purchase,facility,small-business,factoring,medical,bills,certification}.jpg` | 각 페이지 콘텐츠의 `banner.src` |
| 10 | 그룹 배너 3종 | 3 | 2000×600 · JPG | `public/images/banners/{growth,about,support}.jpg` | 기업신용평가·PG·VAN / 회사소개 4 / 고객지원 2 |

작업 전 상태를 보려면 개발 서버를 띄워 확인합니다: `pnpm dev --port 3100` (3000은 다른 프로젝트가 점유). 임시 이미지가 들어간 자리에는 개발 모드에서만 보이는 회색 라벨("임시 이미지 · 코덱스…", "3D 이미지 자리 · 코덱스")이 붙어 있습니다.

---

## 1. 공통 스타일 — 21장이 한 세트로 보여야 합니다

**한 문장**: 코발트·네이비·골드 팔레트의 **soft 3D 렌더**, 매트한 표면에 살짝 광택, 스튜디오 조명, 텍스트 없음.

- 팔레트: 코발트 블루 `#4271F4`(주인공 색) · 네이비 `#0B1E4D` · 웜 골드 `#F5B940`(동전·리본·작은 포인트) · 흰색(서류·종이) · 연한 하늘색 `#E9F3FF`(보조)
- 재질: 매트 플라스틱/클레이 느낌 + 가장자리에 은은한 하이라이트. 유리·크롬·네온·거친 질감 금지
- 조명: 스튜디오 소프트박스, **빛은 왼쪽 위에서**, 그림자는 부드럽고 짧게. 21장 모두 같은 방향
- 카메라: 살짝 위에서 내려다보는 3/4 시점(약 15°), 렌즈 왜곡 없음. 모든 오브젝트 이미지가 같은 시점
- 모서리: 둥글고 두툼한 형태(rounded, chunky). 얇은 선·라인 아이콘 느낌 금지
- 배경: 오브젝트 이미지는 **완전 투명 PNG**(알파 채널, 바닥 그림자는 반투명으로 포함). 배너·CTA만 JPG
- 텍스트·숫자·로고·워터마크 **절대 금지**(화폐 기호 `$`·`₩`도 넣지 말 것). 서류에는 글자 대신 파란 줄 몇 개로 표현
- 인물: CTA(8번)와 서비스 2종(6번)에만 등장. 얼굴은 단순화된 3D 캐릭터(눈·입 정도), 실사 금지
- 기존 사이트 이미지를 참고하려면 `public/images/temp/hero-3d.png`(돈주머니+금화)를 보세요 — **이 느낌을 유지하되 더 정돈된 스튜디오 렌더**로

영문 프롬프트 공통 접두어(모든 이미지 앞에 붙임):

```
Soft 3D render, clay-like matte material with subtle glossy edges, studio softbox lighting from the top-left, gentle short shadows, slight top-down 3/4 camera angle, rounded chunky shapes, color palette of cobalt blue #4271F4, deep navy #0B1E4D, warm gold #F5B940 and white, clean minimal composition, high resolution, no text, no letters, no numbers, no logos, no watermark.
```

네거티브(지원되는 모델이면): `text, letters, numbers, currency symbols, logo, watermark, photo-realistic, glass, chrome, neon, wireframe, line art, flat vector, low poly, grainy, blurry, cropped object, busy background`

---

## 2. 오브젝트 이미지 (투명 PNG)

오브젝트는 캔버스 가운데에 놓고, 사방에 캔버스의 8~10% 여백을 남깁니다(코드가 `object-contain` + 안쪽 패딩으로 배치하므로 꽉 채우지 마세요). 그림자는 오브젝트 바로 아래에 반투명 타원으로 포함합니다.

### 1. 홈 히어로 — `public/images/hero-3d.png` (1600×1000)
- 내용: **금화 더미 + 떠 있는 흰 계약서(파란 줄·둥근 파란 도장) + 위로 올라가는 코발트 화살표**
- 구도: 가로로 넓게. 왼쪽 아래 금화 2~3더미, 가운데 살짝 기울어 떠 있는 서류, 오른쪽 위로 뻗는 화살표. 무게중심이 가운데
- 프롬프트: `…prefix… A hero composition: stacks of shiny gold coins at the lower left, a floating white paper contract tilted slightly with a round cobalt-blue seal and a few blue lines instead of text, and a thick cobalt-blue arrow curving upward to the upper right; the objects float with soft shadows beneath them; transparent background.`
- 주의: 현재 임시 이미지(880×511)보다 세로가 깁니다. 넣은 뒤 1200·1440·1920 폭에서 왼쪽 아래 "성공사례" 카드와 겹치면 `hero.tsx`의 `lg:w-[680px]`를 `lg:w-[620px]` 정도로 줄이세요

### 2. 정책자금 카드 — `public/images/solutions/policy-funds.png` (800×600)
- 내용: **관공서 도장이 찍힌 서류 + 동전 몇 개**
- 프롬프트: `…prefix… A white official document with a round cobalt-blue government seal and blue lines, lying at a slight angle, with three gold coins resting beside it; transparent background.`

### 3. 유동성자금 카드 — `public/images/solutions/liquidity-funds.png` (800×600)
- 내용: **물결처럼 흐르는 금화 + 모래시계**
- 프롬프트: `…prefix… Gold coins flowing in a gentle wave like a stream, next to a small navy-and-gold hourglass with white sand; transparent background.`

### 4. 성장 카드 — `public/images/solutions/growth.png` (800×600)
- 내용: **상승 막대그래프(코발트 2개 + 골드 1개) + 작은 화살표**
- 프롬프트: `…prefix… Three rounded bar-chart columns rising from left to right, two cobalt blue and the tallest one gold, with a small navy arrow pointing up at the top right; transparent background.`

### 5. 회사소개 카드 화살표 — `public/images/arrow-3d.png` (1400×780, 흰색)
- 내용: **흰색 3D 상승 화살표** 하나. 네이비 카드 위에 올라가므로 **오브젝트 자체가 흰색**(아이보리 아님), 그림자는 없거나 아주 옅게
- 프롬프트: `…prefix… A single thick white 3D arrow rising from the lower left to the upper right, smooth matte white surface with soft gray shading, no other objects; transparent background.`
- 교체 대상: 지금은 `public/images/arrow-3d.svg`. PNG로 바꾸면서 `intro-card.tsx`의 `src`·`width`·`height`를 수정(아래 4절)

### 6. 차별화 서비스 3종 — `public/images/services/*.png` (800×600)
- `expert.png` — **말풍선 + 전문가**: 코발트 정장의 단순한 3D 캐릭터(상반신)가 흰 말풍선 옆에 서 있음
  `…prefix… A simplified 3D character with a cobalt-blue suit and friendly minimal face, standing next to a large white rounded speech bubble; transparent background.`
- `shelf.png` — **상품이 쌓인 선반**: 흰 선반 2단에 코발트·골드·네이비 상자/서류가 정돈되어 있음
  `…prefix… A two-tier white shelf holding neatly arranged cobalt-blue, gold and navy boxes and folders of different sizes; transparent background.`
- `checklist.png` — **체크리스트를 든 관리자**: 단순한 3D 캐릭터가 골드 체크 표시 3개가 있는 흰 클립보드를 듦
  `…prefix… A simplified 3D character holding a white clipboard with three gold check marks and blue lines, friendly minimal face; transparent background.`

### 7. 기업 인증 — `public/images/certification.png` (800×600)
- 내용: **인증서 + 골드 리본 메달**
- 프롬프트: `…prefix… A white certificate document with blue lines and a cobalt border, with a gold medal on a navy ribbon pinned to its lower right corner; transparent background.`

---

## 3. 배경 이미지 (JPG)

### 8. 홈 CTA 배경 — `public/images/cta-character.jpg` (2000×1000)
- 내용: **서류판을 든 3D 캐릭터 + 하늘·도시 실루엣**. 기존 `public/images/temp/cta-character.jpg`의 느낌(캐릭터가 오른쪽, 밝은 하늘)을 3D 스타일로
- 구도: **캐릭터는 오른쪽 1/3**, 왼쪽 2/3는 잔잔한 하늘·도시 실루엣. 코드가 왼쪽에 네이비 그라디언트를 덮고 흰 글씨를 얹으므로 왼쪽은 단순하게
- 프롬프트: `…prefix… Wide banner: a friendly simplified 3D business character holding a white clipboard stands on the right third, in front of a soft cobalt-blue sky with light clouds and a minimal navy city skyline silhouette along the bottom; the left two thirds are calm open sky; cinematic but clean.`
- 교체 뒤 `object-cover object-right`라 세로가 잘릴 수 있으니 캐릭터 머리가 위쪽 15% 안에 들어오지 않게

### 9. 서브페이지 배너 8종 — `public/images/banners/*.jpg` (2000×600)
공통: **네이비 `#0B1E4D` 바탕**, 해당 솔루션을 상징하는 3D 오브젝트를 **오른쪽 40% 영역에 어둡게(톤 다운)** 배치. 왼쪽 60%는 거의 단색 네이비(제목이 올라감). 코드가 위에 네이비 그라디언트와 도트 패턴을 한 번 더 덮으므로 **오브젝트는 배너 자체에서 은은하게**(밝기 40~60%) 보이면 됩니다. 위아래로 잘릴 수 있으니 오브젝트는 세로 가운데.

배너 공통 접미어: `…prefix… Ultra-wide dark banner on a deep navy #0B1E4D background, the left 60% is nearly empty plain navy, a dimly lit soft 3D object group sits in the right 40% in muted cobalt and gold tones with low contrast, subtle depth, no text.`

| 파일 | 오브젝트 |
|---|---|
| `operating.jpg` | 금화 더미와 흰 서류(운전자금) |
| `b2b-purchase.jpg` | 두 건물 사이를 잇는 화살표와 서류·동전(기업 간 거래) |
| `facility.jpg` | 공장 건물 블록과 톱니바퀴, 크레인(시설 투자) |
| `small-business.jpg` | 차양이 달린 작은 상점과 동전(소상공인) |
| `factoring.jpg` | 흐르는 금화와 흰 매출채권 서류(팩토링) |
| `medical.jpg` | 십자 표시 병원 건물 블록과 동전(의료사업자) |
| `bills.jpg` | 어음 모양 긴 서류와 시계(전자어음) |
| `certification.jpg` | 인증서와 골드 메달(기업인증) |

### 10. 그룹 배너 3종 — `public/images/banners/*.jpg` (2000×600, 9번과 같은 규격·스타일)

| 파일 | 오브젝트 | 쓰는 페이지 |
|---|---|---|
| `growth.jpg` | 상승 그래프 + 신용등급 배지(별 리본) | 기업신용평가 · PG · VAN |
| `about.jpg` | 빌딩과 악수하는 두 3D 캐릭터 | 회사소개 · 회사연혁 · 업무절차 · 오시는길 |
| `support.jpg` | 헤드셋을 쓴 3D 캐릭터와 말풍선 | 상담신청 · 개인정보처리방침 |

---

## 4. 코드 연결 — 파일을 넣은 뒤 바꿀 곳

`src/content/**`는 글·경로만 있는 데이터 파일이고, 컴포넌트는 `src`가 있으면 이미지를, 없으면 CSS 자리표시를 그립니다. 아래 순서대로 바꾸면 끝입니다.

1. **히어로** `src/components/home/hero.tsx`
   - `src="/images/temp/hero-3d.png"` → `src="/images/hero-3d.png"`, `width={880} height={511}` → 실제 픽셀(`width={1600} height={1000}`)
   - 같은 파일 맨 아래 `<DevLabel …>임시 이미지 · 코덱스 3D로 교체</DevLabel>` 줄과 `import { DevLabel } from "./dev-label";` 삭제
2. **솔루션 카드** `src/content/home.ts` — `solutions[0..2]`에 `image: "/images/solutions/policy-funds.png"` / `liquidity-funds.png` / `growth.png` 추가(필드는 이미 정의돼 있음, 값만 없음)
3. **서비스 카드** `src/content/home.ts` — `services[0..2]`에 `image: "/images/services/expert.png"` / `shelf.png` / `checklist.png`
4. **회사소개 화살표** `src/components/home/intro-card.tsx` — `src="/images/arrow-3d.svg"` → `"/images/arrow-3d.png"`, `width={700} height={390}` → `width={1400} height={780}`. 그다음 `public/images/arrow-3d.svg` 삭제
5. **기업 인증** `src/content/pages/growth.ts` — `certification` 객체에 `image: { src: "/images/certification.png", alt: "인증서와 골드 메달" }`
6. **홈 CTA** `src/app/page.tsx` — `image={{ src: "/images/temp/cta-character.jpg", alt: "" }}` → `"/images/cta-character.jpg"`, 바로 아래 `<DevLabel …>임시 이미지 · 코덱스 3D 캐릭터로 교체</DevLabel>`와 `import { DevLabel }` 줄 삭제
7. **서브페이지 배너** — 다음 파일의 `banner: { src: "/images/temp/sub-banner.jpg", alt: "" }`를 바꾸고 `alt`에 한 줄 설명을 넣습니다
   - `src/content/pages/policy-funds.ts`: `operating` → `/images/banners/operating.jpg`, `b2bPurchase` → `b2b-purchase.jpg`, `facility` → `facility.jpg`, `smallBusiness` → `small-business.jpg`
   - `src/content/pages/liquidity-funds.ts`: `factoring` → `factoring.jpg`, `medical` → `medical.jpg`, `bills` → `bills.jpg`
   - `src/content/pages/growth.ts`: `credit`·`pg`·`van` → `growth.jpg`(셋 다 같은 파일), `certification` → `certification.jpg`
   - `src/content/pages/about.ts`: `companyPage`·`historyPage`·`procedurePage`·`directionsPage` → `about.jpg`
   - `src/app/support/consultation/page.tsx`, `src/app/support/privacy-policy/page.tsx`: `SubHero`의 `image` src → `/images/banners/support.jpg`
   - 각 페이지의 `<SubHero … imageLabel="임시 배너 · 코덱스 2000×600으로 교체" />`에서 **`imageLabel` prop을 제거**(17개 `page.tsx`, `grep -rn imageLabel src/app`으로 찾기)
8. **서브페이지 01 스테이지(선택, 권장)** — 자금 페이지 11개는 `FundPage.image`가 비어 있어 CSS 자리표시가 뜹니다. 새로 그리지 않고 그룹 카드 이미지를 재사용하세요:
   - `policy-funds.ts`의 `operating`·`facility`·`smallBusiness`·`b2bPurchase`: `image: { src: "/images/solutions/policy-funds.png", alt: "…" }`
   - `liquidity-funds.ts`의 `factoring`·`medical`·`bills`: `/images/solutions/liquidity-funds.png`
   - `growth.ts`의 `credit`·`pg`·`van`: `/images/solutions/growth.png` (`certification`은 5번에서 이미 지정)
9. **OG 이미지 원본** `src/app/design-system/og/page.tsx` — `src="/images/temp/hero-3d.png"` → `"/images/hero-3d.png"`
10. **임시 폴더 삭제** — 위가 끝나면 `public/images/temp/` 전체 삭제. `grep -rn "images/temp" src`가 비어야 합니다

---

## 5. 검증 — 보고 전에 반드시

```bash
pnpm exec tsc --noEmit && pnpm lint && pnpm build
```

세 개가 모두 통과해야 합니다. 그다음 `pnpm dev --port 3100`으로 띄우고 **1200 / 1440 / 1920 / 390 네 폭**에서 확인합니다:

- 홈: 히어로 오브젝트가 "성공사례" 카드·"2,000억+" 배지와 겹치지 않는지(1920에서 특히), 솔루션·서비스 카드 6장의 오브젝트 크기감이 비슷한지, CTA 캐릭터가 오른쪽에 온전히 보이고 왼쪽 글씨가 읽히는지
- 서브페이지 아무거나 3개(예: `/policy-funds/operating`, `/growth/certification`, `/about/history`): 배너 오브젝트가 제목 글자 뒤로 오지 않는지(오른쪽에 있어야 함), 01 스테이지 이미지가 잘리지 않는지
- 페이지에 회색 "임시 이미지 · 코덱스" 라벨이 하나도 남지 않았는지
- **OG 이미지 재캡처**: `/design-system/og`를 1200×630 뷰포트로 열어 `#og-card` 요소를 PNG로 캡처해 `src/app/opengraph-image.png`를 덮어씁니다(캡처 전에 `document.querySelectorAll('nextjs-portal').forEach(p => p.remove())`로 Next 개발 배지를 지울 것)

파일 용량 기준: 오브젝트 PNG 한 장 600KB 이하, 배너·CTA JPG 400KB 이하(품질 80~85). 넘으면 PNG는 `pngquant`/`oxipng`, JPG는 품질을 낮춰 다시 저장. 이미지 컴포넌트가 `next/image`라 실제 전송은 자동 최적화되지만 원본 저장소 크기는 이 기준을 지켜 주세요.

---

## 6. 하지 말 것

- 이미지에 글자·숫자·화폐 기호·로고를 넣지 않습니다. 기관 로고(`public/images/partners/`)와 회사 로고(`public/brand/`)는 **건드리지 않습니다**
- 스타일을 섞지 않습니다 — 라인 일러스트, 플랫 벡터, 실사 사진, 로우폴리 전부 금지. 21장은 한 스튜디오에서 찍은 것처럼
- 팔레트 밖의 색(보라·민트·빨강 등)을 주인공으로 쓰지 않습니다
- 코드는 4절에 적힌 경로·prop·DevLabel 외에는 수정하지 않습니다. 레이아웃·컴포넌트·콘텐츠 문구를 바꾸지 않습니다
- 커밋하지 않습니다 — 파일을 넣고 검증 결과를 보고하면 Jace가 확인 후 커밋합니다

---

## 7. 완료 보고 형식

1. 만든 파일 21개 경로와 각 용량
2. 수정한 코드 파일 목록(`git status --short`)
3. `tsc` / `lint` / `build` 결과
4. 네 폭 스크린샷(홈 전체, 서브페이지 1개 전체, 390 홈 상단)
5. 스타일이 맞지 않아 다시 만들어야 한다고 생각하는 이미지가 있으면 어느 것인지와 이유
