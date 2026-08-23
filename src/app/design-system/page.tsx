import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Chip, Pill } from "@/components/ui/pill";
import { Card } from "@/components/ui/card";
import { ImageStage } from "@/components/ui/image-stage";
import { Stat, StatGrid } from "@/components/ui/stat";
import { KeyValueTable } from "@/components/ui/key-value-table";
import { Callout } from "@/components/ui/callout";
import { NumberedCard } from "@/components/ui/numbered-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubNav } from "@/components/ui/sub-nav";
import { Logo } from "@/components/ui/logo";
import { Halftone } from "@/components/ui/halftone";
import { ArrowRight, ArrowUpRight, Award, Chart, Check, Cycle, Doc, ListCheck, Star, Trend } from "@/components/ui/icons";
import { CTABand } from "@/components/layout/cta-band";
import { DataTable } from "@/components/sub/data-table";
import { FactStrip } from "@/components/sub/fact-strip";
import { FeatureCards } from "@/components/sub/feature-cards";
import { SectionNumber } from "@/components/sub/numbered-section";
import { ProcessSteps } from "@/components/sub/process-steps";
import { Timeline } from "@/components/sub/timeline";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "디자인 시스템",
  robots: { index: false, follow: false },
};

/* ---------- 로컬 헬퍼 ---------- */

function Demo({ id, title, note, children, className }: { id: string; title: string; note?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("flex flex-col gap-6 border-t border-line py-14", className)}>
      <div className="flex flex-col gap-2">
        <h2 className="text-h3">{title}</h2>
        {note && <p className="max-w-3xl text-sm leading-relaxed text-muted">{note}</p>}
      </div>
      {children}
    </section>
  );
}

function Swatch({ name, hex, note, dark }: { name: string; hex: string; note?: string; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn("flex h-20 items-end rounded-2xl border border-black/5 p-3 font-mono text-[11px]", dark ? "text-white/80" : "text-ink/70")}
        style={{ background: hex }}
      >
        {hex}
      </div>
      <div className="text-[13px] font-bold">{name}</div>
      {note && <div className="text-xs text-muted">{note}</div>}
    </div>
  );
}

function DarkPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("stage-cobalt relative overflow-hidden rounded-3xl p-8", className)}>
      <Halftone corner="br" />
      <div className="relative">{children}</div>
    </div>
  );
}

const cobalt = [
  ["50", "#eef3ff"], ["100", "#dce7ff"], ["200", "#b9cdff"], ["300", "#8fb3ff"], ["400", "#5e8cff"],
  ["500", "#4271f4"], ["600", "#2e5ad6"], ["700", "#1f47b8"], ["800", "#15368f"], ["900", "#0b1e4d"], ["950", "#0b1433"],
] as const;
const gold = [["50", "#fff8e6"], ["100", "#fff4d6"], ["200", "#ffe9a8"], ["300", "#ffe08a"], ["400", "#f5b940"], ["500", "#e0a030"], ["600", "#d99a2a"], ["700", "#9a6400"]] as const;

const toc = [
  ["colors", "컬러"], ["type", "타이포"], ["headers", "섹션 헤더"], ["buttons", "버튼"], ["pills", "필 · 칩"], ["cards", "카드"], ["stages", "이미지 스테이지"],
  ["stats", "스탯"], ["content", "표 · 콜아웃 · 번호 카드"], ["nav", "내비 요소"], ["sub", "서브페이지 블록"], ["tones", "섹션 톤"], ["cta", "CTA 밴드"], ["logo", "로고"], ["motion", "모션"],
];

export default function DesignSystemPage() {
  return (
    <>
      <Section tone="navy" halftone className="pt-40 md:pt-44">
        <Container className="relative flex flex-col gap-6">
          <Pill tone="glass" dot="gold">코발트 스튜디오 · v1</Pill>
          <h1 className="text-h1 text-white">
            이지크레더블
            <br />
            디자인 시스템
          </h1>
          <p className="max-w-2xl text-lead text-white/80">
            토큰은 <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em]">src/app/globals.css</code>의 <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em]">@theme</code>에, 컴포넌트는{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em]">src/components</code>에 있습니다. 홈과 17개 서브페이지가 이 부품으로 조립됩니다.
          </p>
          <nav aria-label="목차" className="flex flex-wrap gap-2 pt-2">
            {toc.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="rounded-full border border-white/25 bg-white/8 px-3.5 py-1.5 text-[13px] font-semibold text-white/90 hover:bg-white/15">
                {label}
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      <Container className="pb-24">
        <Demo id="colors" title="컬러" note="브랜드 코발트 500은 로고 색 그대로. 흰 글자를 얹는 면은 600 이상(대비 5.9:1). 골드는 3D 오브젝트의 동전·캐릭터에서 가져온 보조 포인트라 수치 단위·태그·작은 강조에만 쓴다.">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 lg:grid-cols-11">
            {cobalt.map(([step, hex]) => (
              <Swatch key={step} name={`cobalt-${step}`} hex={hex} dark={Number(step) >= 500} note={step === "500" ? "brand · 로고" : step === "600" ? "brand-strong · 버튼" : step === "900" ? "navy" : step === "950" ? "navy-deep · 푸터" : undefined} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {gold.map(([step, hex]) => (
              <Swatch key={step} name={`gold-${step}`} hex={hex} dark={Number(step) >= 500} note={step === "400" ? "단위 · 점" : step === "700" ? "골드 칩 글자" : undefined} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            <Swatch name="ink" hex="#0f172a" dark note="제목" />
            <Swatch name="body" hex="#475569" dark note="본문" />
            <Swatch name="muted" hex="#64748b" dark note="보조" />
            <Swatch name="line" hex="#e8eef9" note="테두리" />
            <Swatch name="soft" hex="#f3f7ff" note="연한 면" />
            <Swatch name="tint-sky" hex="#e9f3ff" note="스테이지" />
            <Swatch name="tint-mint" hex="#e8f8f1" note="스테이지" />
            <Swatch name="tint-lavender" hex="#efebff" note="스테이지" />
          </div>
        </Demo>

        <Demo id="type" title="타이포" note="헤드라인 SUIT ExtraBold, 본문 Pretendard Variable(동적 서브셋). 제목은 word-break: keep-all + text-wrap: balance 가 기본. 크기는 clamp()라 뷰포트에 따라 흐른다.">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1"><span className="text-xs font-semibold text-muted">text-hero · 40→74px</span><p className="font-display text-hero font-extrabold">미래를 디자인하는 파트너</p></div>
            <div className="flex flex-col gap-1"><span className="text-xs font-semibold text-muted">text-h1 · 36→64px</span><p className="font-display text-h1 font-extrabold">운전자금</p></div>
            <div className="flex flex-col gap-1"><span className="text-xs font-semibold text-muted">text-h2 · 28→48px</span><p className="font-display text-h2 font-extrabold">당신의 기업에 날개를 다세요!</p></div>
            <div className="flex flex-col gap-1"><span className="text-xs font-semibold text-muted">text-h3 · 22→26px</span><p className="font-display text-h3 font-extrabold">정책자금 솔루션</p></div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-1"><span className="text-xs font-semibold text-muted">text-lead · 17→19px · Pretendard 400</span><p className="text-lead text-body">당신의 비즈니스가 어려움에 부딪혀도, 포기하지 않고 가능성을 찾아내겠습니다.</p></div>
              <div className="flex flex-col gap-1"><span className="text-xs font-semibold text-muted">text-[15px] / text-sm · 본문 · 보조</span><p className="text-[15px] leading-relaxed text-body">원자재의 구매, 생산, 임금 등 기업의 영업활동에 소요되는 경영자금 필요시, 기업의 부담을 줄이고 중소기업 육성을 위해 정부에서 낮은 금리로 지원하는 정책자금입니다.</p><p className="text-sm text-muted">업체명은 비식별 처리되어 있습니다.</p></div>
            </div>
            <div className="flex flex-col gap-1"><span className="text-xs font-semibold text-muted">text-stat · 숫자 · tabular-nums</span><p className="font-display text-stat font-extrabold tabular-nums">2,000<span className="text-base text-brand-strong">+억</span> · 500<span className="text-base text-brand-strong">+건</span> · 2019<span className="text-base text-brand-strong">년</span></p></div>
          </div>
        </Demo>

        <Demo id="headers" title="섹션 헤더" note="아이브로우 Pill + h2 + 리드. 왼쪽 정렬은 오른쪽에 액션을 둘 수 있고, 어두운 면에서는 tone=&quot;dark&quot;.">
          <SectionHeader eyebrow="맞춤형 솔루션" title="당신의 기업에 날개를 다세요!" lead="정책자금 · 유동성자금 · 성장, 세 가지 축으로 자금 확보부터 성장까지 함께합니다." align="center" />
          <SectionHeader eyebrow="성공사례" title="숫자로 확인하는 성공사례" lead="업체명은 비식별 처리되어 있습니다." action={<Button variant="outline" size="sm" icon="none">전체 보기</Button>} />
          <DarkPanel><SectionHeader tone="dark" eyebrow="기업 인증 · NEW" eyebrowTone="gold" title="인증으로 더 유리한 자금 조건을 만드세요" lead="벤처기업·이노비즈·메인비즈 같은 경영인증은 정책자금 우대의 출발점입니다." /></DarkPanel>
        </Demo>

        <Demo id="buttons" title="버튼" note="primary는 cobalt-600(대비 확보). 어두운 면 위에서는 white + ghost 조합. 화살표는 기본, 외부 링크는 자동으로 ↗.">
          <div className="flex flex-wrap items-center gap-3">
            <Button>상담 신청하기</Button>
            <Button variant="navy">빠른 상담신청</Button>
            <Button variant="outline" icon="none">솔루션 둘러보기</Button>
            <Button variant="link">자세히 보기</Button>
            <Button href="https://www.ismri.org">ismri.org 바로가기</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">상담 신청</Button>
            <Button size="md">상담 신청</Button>
            <Button size="lg">상담 신청하기</Button>
            <Button size="lg" disabled>비활성</Button>
          </div>
          <DarkPanel>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="white" size="lg">상담 신청하기</Button>
              <Button variant="ghost" size="lg" icon="none">솔루션 둘러보기</Button>
              <Button variant="white" size="sm">상담 신청</Button>
            </div>
          </DarkPanel>
        </Demo>

        <Demo id="pills" title="필 · 칩" note="Pill은 섹션 아이브로우와 라벨, Chip은 솔루션 카드의 하위 키워드. 점(dot)은 히어로 아이브로우처럼 살아 있는 느낌이 필요할 때만.">
          <div className="flex flex-wrap items-center gap-3">
            <Pill>맞춤형 솔루션</Pill>
            <Pill tone="gold">기업 인증 · NEW</Pill>
            <Pill tone="white">차별화된 서비스</Pill>
            <Pill tone="navy">성공사례</Pill>
            <Pill tone="soft" size="sm">2023년 11월</Pill>
            <Pill tone="gold" size="sm">14일 소요</Pill>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Chip>운전자금</Chip><Chip>B2B구매자금</Chip><Chip>시설자금</Chip><Chip>소상공인자금</Chip><Chip tone="gold">기업인증 NEW</Chip>
          </div>
          <DarkPanel className="py-6">
            <div className="flex flex-wrap items-center gap-3">
              <Pill tone="glass" dot="gold">전문적이며, 안전하고, 고객 중심의 기업 금융 솔루션</Pill>
              <Pill tone="glass" dot="green">성공사례 · 운송업</Pill>
            </div>
          </DarkPanel>
        </Demo>

        <Demo id="cards" title="카드" note="white 카드는 레이어드 그림자(shadow-card), interactive면 호버에 8px 떠오르고 진한 그림자가 서서히 겹친다. 솔루션 카드 = ImageStage + 제목 + 설명 + 칩 + 링크. 사례 카드 = 메타 + 결과 헤드라인 + 키값 행.">
          <div className="grid gap-6 md:grid-cols-3">
            <Card padding="none" interactive>
              <ImageStage tint="sky" art="document" className="rounded-b-none rounded-t-3xl" />
              <div className="flex flex-1 flex-col gap-3.5 p-7">
                <h3 className="text-h3">정책자금 솔루션</h3>
                <p className="text-[15px] leading-relaxed text-body">세밀한 분석으로 자금 확보를 도와드립니다.</p>
                <div className="flex flex-wrap gap-2"><Chip>운전자금</Chip><Chip>B2B구매자금</Chip><Chip>시설자금</Chip><Chip>소상공인자금</Chip></div>
                <Button variant="link" className="mt-auto pt-2 text-sm" href="/policy-funds/operating">자세히 보기</Button>
              </div>
            </Card>
            <Card padding="none" interactive>
              <ImageStage tint="mint" art="coins" className="rounded-b-none rounded-t-3xl" />
              <div className="flex flex-1 flex-col gap-3.5 p-7">
                <h3 className="text-h3">유동성자금 솔루션</h3>
                <p className="text-[15px] leading-relaxed text-body">필요한 자금을 부채 없이 마련합니다.</p>
                <div className="flex flex-wrap gap-2"><Chip>매출채권 팩토링</Chip><Chip>의료사업자 대출</Chip><Chip>전자어음할인</Chip></div>
                <Button variant="link" className="mt-auto pt-2 text-sm" href="/liquidity-funds/receivables-factoring">자세히 보기</Button>
              </div>
            </Card>
            <Card padding="none" interactive>
              <ImageStage tint="lavender" art="bars" className="rounded-b-none rounded-t-3xl" />
              <div className="flex flex-1 flex-col gap-3.5 p-7">
                <h3 className="text-h3">성장 솔루션</h3>
                <p className="text-[15px] leading-relaxed text-body">지속적 성장을 위해 필요한 것들을 제시합니다.</p>
                <div className="flex flex-wrap gap-2"><Chip>기업신용평가</Chip><Chip>PG</Chip><Chip>VAN</Chip><Chip tone="gold">기업인증 NEW</Chip></div>
                <Button variant="link" className="mt-auto pt-2 text-sm" href="/growth/corporate-credit-evaluation">자세히 보기</Button>
              </div>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <div className="flex items-center justify-between"><span className="text-[13px] font-semibold text-muted">운송업 · 연매출 365억</span><Pill tone="gold" size="sm">14일 소요</Pill></div>
              <div className="mt-4 font-display text-h3 font-extrabold">매출채권 팩토링<br /><span className="text-brand-strong">10억 확보!</span></div>
              <div className="mt-4 flex flex-col border-t border-line text-sm text-body">
                <div className="flex justify-between border-b border-line/70 py-2.5"><span className="text-slate-400">이슈</span><span className="font-semibold text-ink">높은 부채비율</span></div>
                <div className="flex justify-between py-2.5"><span className="text-slate-400">성공일</span><span className="font-semibold text-ink">2023년 11월</span></div>
              </div>
            </Card>
            <Card tone="soft">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-cobalt-50 text-brand-strong"><Trend size={24} /></div>
              <h3 className="mt-4 text-h3">운전자금의 장점</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">일반 시중은행과 비교하여 금리가 낮기 때문에, 기업의 금융비용이 절감되고 경쟁력이 올라갑니다.</p>
            </Card>
            <Card tone="navy">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-gold-400"><Star size={24} /></div>
              <h3 className="mt-4 text-h3 text-white">운전자금 솔루션</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/80">모든 정책자금을 연구·분석하여 가장 합리적인 정책자금을 지원받을 수 있도록 도와드립니다.</p>
            </Card>
          </div>
        </Demo>

        <Demo id="stages" title="이미지 스테이지" note="3D 렌더가 놓이는 틴트 무대. src가 없으면 StageArt 자리표시가 들어가고, 코덱스 이미지(투명 PNG)가 오면 src만 바꾸면 된다. 슬롯 목록은 캔버스 노트의 생성 리스트와 1:1.">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <ImageStage tint="sky" art="document" aspect="square" />
            <ImageStage tint="mint" art="coins" aspect="square" />
            <ImageStage tint="lavender" art="bars" aspect="square" />
            <ImageStage tint="sky" art="chat" aspect="square" />
            <ImageStage tint="sand" art="shelf" aspect="square" />
            <ImageStage tint="navy" art="check" aspect="square" />
          </div>
        </Demo>

        <Demo id="stats" title="스탯" note="네이비 카드 안의 2×2. 숫자는 Counter로 보이는 순간 세어 올라간다(서버 렌더에는 최종값). 단위는 골드.">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
            <Card tone="navy" padding="lg" className="justify-center gap-4">
              <div className="text-[13px] font-bold tracking-[0.12em] text-cobalt-300">회사소개</div>
              <h3 className="text-h2 text-white">기업의 가능성을<br />현실로 만드는 파트너</h3>
              <p className="max-w-sm text-[15px] leading-relaxed text-white/78">금융업계에서 오랜 경력을 가진 전문가가 상담 신청부터 자금 확보, 그 이후의 관리까지 함께합니다.</p>
            </Card>
            <Card tone="navy" padding="none">
              <StatGrid>
                <Stat label="창립" value={2019} unit="년" plain />
                <Stat label="고객 만족도" value={100} unit="%" />
                <Stat label="솔루션 성공" value={500} unit="+건" />
                <Stat label="솔루션 금액" value={2000} unit="+억" />
              </StatGrid>
            </Card>
          </div>
          <div className="grid grid-cols-2 gap-6 rounded-3xl border border-line p-7 md:grid-cols-4">
            <Stat tone="light" label="창립" value={2019} unit="년" plain />
            <Stat tone="light" label="고객 만족도" value={100} unit="%" />
            <Stat tone="light" label="솔루션 성공" value={500} unit="+건" />
            <Stat tone="light" label="솔루션 금액" value={2000} unit="+억" />
          </div>
        </Demo>

        <Demo id="content" title="표 · 콜아웃 · 번호 카드" note="서브페이지 본문 부품. 표는 모바일에서 라벨이 위로 올라가고, 콜아웃의 강조는 <strong>으로.">
          <KeyValueTable
            rows={[
              { label: "지원대상", value: "일반중소기업 또는 예비창업자 (개인사업자 및 법인사업자) · 국세 및 지방세 체납이 없는 신용등급이 양호한 중소기업" },
              { label: "지원종류", value: "정부지원 운전자금" },
              { label: "융자한도", value: "기업 신용등급에 따라 한도 부여" },
              { label: "상담서류", value: "재무제표, 사업자등록증 사본, 부가세표준증명원 등" },
            ]}
          />
          <Callout>
            <strong>원자재의 구매, 생산, 임금 등 기업의 영업활동에 소요되는 경영자금</strong> 필요시, 기업의 부담을 줄이고 중소기업 육성을 위해 정부에서 낮은 금리로 지원하는 정책자금입니다.
          </Callout>
          <div className="grid gap-5 md:grid-cols-3">
            <NumberedCard index={1} title="경영안전자금" description="재해, 경영애로 해소 등 긴급 자금소요 지원" />
            <NumberedCard index={2} title="재도약지원자금" description="사업전환, 구조개선, 재창업 지원" />
            <NumberedCard index={3} title="투융자복합금융자금" description="우수기업 융자 투자요소 및 복합방식 자금 지원" />
          </div>
        </Demo>

        <Demo id="nav" title="내비 요소" note="배너 위 브레드크럼과, 배너 아래 떠 있는 알약형 서브내비(현재 경로 활성 + 우측 액션).">
          <DarkPanel className="py-6"><Breadcrumb items={[{ label: "정책자금 솔루션", href: "/policy-funds/operating" }, { label: "운전자금" }]} /></DarkPanel>
          <SubNav
            current="/policy-funds/operating"
            items={[
              { label: "운전자금", href: "/policy-funds/operating" },
              { label: "B2B구매자금", href: "/policy-funds/b2b-purchase" },
              { label: "시설자금", href: "/policy-funds/facility" },
              { label: "소상공인자금", href: "/policy-funds/small-business" },
            ]}
            action={<Button variant="navy" size="sm" href="/support/consultation">빠른 상담신청</Button>}
          />
          <div className="flex flex-wrap items-center gap-5 text-brand-strong">
            {[ArrowRight, ArrowUpRight, Check, Doc, Cycle, Chart, Trend, ListCheck, Star, Award].map((Icon, i) => (
              <span key={i} className="flex size-11 items-center justify-center rounded-xl bg-cobalt-50"><Icon size={22} /></span>
            ))}
          </div>
        </Demo>

        <Demo id="sub" title="서브페이지 블록" note="src/components/sub — 배너(SubHero)·번호 섹션(NumberedSection) 아래에 조립하는 본문 부품. 같은 스타일로 페이지마다 다른 본문을 만든다. 조합 예: /policy-funds/operating(기본형), /policy-funds/small-business(표 중심), /policy-funds/b2b-purchase(스펙·주의사항), /about/history(타임라인), /about/directions(지도).">
          <div className="flex flex-col gap-3">
            <SectionNumber index={2} />
            <h2 className="text-h2">번호 섹션 헤더</h2>
          </div>
          <FactStrip
            facts={[
              { label: "2026년 융자 규모", value: "4조 643억", unit: "원" },
              { label: "운전자금 연간 한도", value: 5, unit: "억 원 이내" },
              { label: "대출기간", value: 5, unit: "년 이내 · 거치 2년" },
              { label: "기업당 총 한도", value: "60억", unit: "원" },
            ]}
          />
          <FeatureCards
            items={[
              { icon: "trend", title: "장점", body: "시중은행보다 낮은 금리로 금융비용이 줄고 경쟁력이 올라갑니다." },
              { icon: "list", title: "특징", body: ["기업 신용등급에 따라 한도 적용", "단기 대출 및 장기 대출 상환 가능"] },
              { icon: "star", tone: "navy", title: "솔루션", body: "이지크레더블은 모든 정책자금을 연구·분석하여 가장 합리적인 자금을 설계합니다." },
            ]}
          />
          <DataTable
            columns={["자금", "지원대상", "대출한도", "대출금리"]}
            rows={[
              [{ content: "경영안정", rowSpan: 2 }, "업력 무관 소상공인", "연간 7천만 원", "기준금리 +0.6%p"],
              [null, "재해확인증 발급 소상공인", "1억 원", "연 2.0% 고정"],
              ["성장기반", "제조업 소공인", "운전 1억 · 시설 5억 원", "기준금리 +0.6%p"],
            ]}
            note="첫 열은 가로 스크롤 중에도 고정(sticky). rowSpan 병합은 셀을 객체로, 병합된 자리는 null."
          />
          <ProcessSteps
            steps={[
              { tag: "1단계", title: "융자 신청·접수", description: "정책자금 내비게이션 → 정책우선도 평가 → 신청서 작성" },
              { tag: "2단계", title: "융자대상 결정", description: "기업평가(기술성·사업성·성장성)" },
              { tag: "3단계", title: "대출 및 사후관리", description: "약정 체결, 대출 실행, 사용 현황 모니터링" },
            ]}
          />
          <Callout tone="gold">
            <strong>골드 콜아웃</strong> — 융자제한·거래 주의사항처럼 “조심할 것”에 쓴다. 정의 콜아웃(brand)과 역할을 나눈다.
          </Callout>
          <Timeline
            entries={[
              { date: "2023.01", year: "2023", title: "KSNET(케이에스넷)", description: "VAN 영업대리점" },
              { date: "2022.10", year: "2022", title: "웰페이", description: "매출채권팩토링 서비스 계약" },
              { date: "2019.07", year: "2019", title: "이지크레더블 설립" },
            ]}
          />
        </Demo>

        <Demo id="tones" title="섹션 톤" note="페이지는 white → soft → navy/cobalt 를 번갈아 쌓는다. halftone 옵션이 모서리 도트를 깐다.">
          <div className="grid gap-4 md:grid-cols-2">
            {(["white", "soft", "navy", "cobalt", "ink"] as const).map((tone) => (
              <Section key={tone} tone={tone} halftone compact className="rounded-3xl border border-line px-8">
                <div className="relative flex items-center justify-between">
                  <span className="font-display text-h3 font-extrabold">tone=&quot;{tone}&quot;</span>
                  <Pill tone={tone === "white" || tone === "soft" ? "brand" : "glass"}>{tone === "white" || tone === "soft" ? "밝은 면" : "어두운 면"}</Pill>
                </div>
              </Section>
            ))}
          </div>
        </Demo>

        <Demo id="logo" title="로고" note="public/brand/ezcredible-logo.svg(클라이언트 제공 원본)를 파일 그대로 쓴다. 푸터는 원본을 흰색으로만 바꾼 사본, 헤더는 한글을 잘라낸 마크 사본 + Pretendard 텍스트.">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-8 rounded-3xl border border-line p-8"><div className="flex items-center gap-2.5 text-brand"><Logo variant="mark" className="h-7" /><span className="font-sans text-lg font-bold tracking-tight">(주)이지크레더블</span></div><Logo variant="lockup" className="h-24" /></div>
            <div className="flex flex-col gap-8 rounded-3xl bg-navy-deep p-8 text-white"><div className="flex items-center gap-2.5"><Logo variant="mark" tone="white" className="h-7" /><span className="font-sans text-lg font-bold tracking-tight">(주)이지크레더블</span></div><Logo variant="lockup" tone="white" className="h-24" /></div>
          </div>
        </Demo>
      </Container>

      <div id="cta" className="pb-24">
        <CTABand inset title="운전자금 솔루션이 필요하신가요?" ctaLabel="빠른 상담신청" />
      </div>

      <Container className="pb-32">
        <Demo id="motion" title="모션" note="스크롤 라이브러리 없음(브라우저 기본 스크롤). Reveal은 IntersectionObserver로 data-inview를 켜고 CSS가 전환을 맡는다. 카운터·플로팅·줄 리빌도 요소 단위이며 prefers-reduced-motion이면 전부 꺼진다.">
          <div className="grid gap-4 md:grid-cols-3">
            <Reveal className="rounded-3xl border border-line p-7"><div className="text-sm font-bold text-brand-strong">variant=&quot;up&quot;</div><p className="mt-2 text-sm text-muted">아래에서 28px 올라오며 나타남 (기본)</p></Reveal>
            <Reveal variant="fade" delay={120} className="rounded-3xl border border-line p-7"><div className="text-sm font-bold text-brand-strong">variant=&quot;fade&quot; · delay 120</div><p className="mt-2 text-sm text-muted">제자리에서 페이드</p></Reveal>
            <Reveal variant="scale" delay={240} className="rounded-3xl border border-line p-7"><div className="text-sm font-bold text-brand-strong">variant=&quot;scale&quot; · delay 240</div><p className="mt-2 text-sm text-muted">0.97 → 1 스케일 + 페이드</p></Reveal>
          </div>
        </Demo>
      </Container>
    </>
  );
}
