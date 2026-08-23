import { cn } from "@/lib/cn";

export type StageArtKind = "document" | "coins" | "bars" | "chat" | "shelf" | "check";

/**
 * 3D 이미지가 들어오기 전의 자리표시 오브젝트.
 * 최종 이미지는 같은 팔레트(코발트·네이비·골드)의 soft 3D 렌더로 교체된다.
 */
export function StageArt({ kind, className }: { kind: StageArtKind; className?: string }) {
  switch (kind) {
    case "document":
      return (
        <div aria-hidden="true" className={cn("relative h-48 w-56", className)}>
          <div className="absolute left-6 top-4 h-40 w-[7.5rem] rotate-[-8deg] rounded-[14px] bg-linear-160 from-white to-cobalt-100 shadow-[0_24px_40px_-16px_rgba(11,30,77,0.35)]" />
          <div className="absolute left-16 top-2 flex h-40 w-[7.5rem] rotate-[4deg] flex-col gap-2.5 rounded-[14px] bg-linear-160 from-white to-cobalt-50 p-6 shadow-[0_24px_40px_-16px_rgba(11,30,77,0.35)]">
            <span className="h-2 w-[70%] rounded bg-cobalt-200" />
            <span className="h-2 w-[55%] rounded bg-cobalt-200" />
            <span className="h-2 w-[65%] rounded bg-cobalt-200" />
          </div>
          <div className="absolute bottom-2 right-2 size-16 rounded-full bg-[radial-gradient(circle_at_35%_30%,#7ea3ff,#2e5ad6_60%,#1f47b8)] shadow-[0_18px_30px_-10px_rgba(31,71,184,0.6),inset_0_-6px_12px_rgba(0,0,0,0.18)]" />
        </div>
      );
    case "coins":
      return (
        <div aria-hidden="true" className={cn("relative h-32 w-44", className)}>
          <div className="absolute bottom-0 left-0 h-[26px] w-44 rounded-full bg-linear-to-b from-gold-200 to-gold-600 shadow-[0_10px_16px_-6px_rgba(120,80,0,0.35)]" />
          <div className="absolute bottom-[18px] left-0 h-[26px] w-44 rounded-full bg-linear-to-b from-gold-200 to-gold-500" />
          <div className="absolute bottom-[36px] left-0 h-[26px] w-44 rounded-full bg-linear-to-b from-gold-200 to-gold-500" />
          <div className="absolute bottom-[54px] left-0 h-[26px] w-44 rounded-full bg-linear-to-b from-gold-200 to-gold-500" />
          <div className="absolute bottom-[72px] left-0 h-[26px] w-44 rounded-full bg-linear-to-b from-gold-200 to-gold-400 shadow-[inset_0_2px_4px_rgba(255,255,255,0.7)]" />
          <div className="absolute bottom-[76px] left-12 h-[18px] w-20 rounded-full bg-gold-600/55" />
        </div>
      );
    case "bars":
      return (
        <div aria-hidden="true" className={cn("relative flex h-40 w-52 items-end justify-center gap-4", className)}>
          <div className="h-[60px] w-11 rounded-t-lg rounded-b bg-linear-to-b from-cobalt-300 to-cobalt-500 shadow-[0_16px_24px_-10px_rgba(31,71,184,0.5)]" />
          <div className="h-[92px] w-11 rounded-t-lg rounded-b bg-linear-to-b from-cobalt-300 to-cobalt-600 shadow-[0_16px_24px_-10px_rgba(31,71,184,0.5)]" />
          <div className="h-[128px] w-11 rounded-t-lg rounded-b bg-linear-to-b from-gold-300 to-gold-400 shadow-[0_16px_24px_-10px_rgba(200,140,20,0.5)]" />
          <svg viewBox="0 0 24 24" className="absolute right-0 top-0 size-10 text-navy" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 18l6-6 4 4 6-8" />
            <path d="M14 8h6v6" />
          </svg>
        </div>
      );
    case "chat":
      return (
        <div aria-hidden="true" className={cn("relative h-40 w-56", className)}>
          <div className="absolute left-2 top-2 flex h-[74px] w-[150px] flex-col gap-2 rounded-[20px_20px_20px_6px] bg-linear-160 from-white to-cobalt-50 p-4 shadow-[0_18px_32px_-14px_rgba(11,30,77,0.35)]">
            <span className="h-[7px] w-[72%] rounded bg-cobalt-200" />
            <span className="h-[7px] w-[48%] rounded bg-cobalt-200" />
          </div>
          <div className="absolute bottom-2 right-8 size-[92px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#7ea3ff,#2e5ad6_60%,#1f47b8)] shadow-[0_22px_36px_-12px_rgba(31,71,184,0.6),inset_0_-8px_14px_rgba(0,0,0,0.18)]" />
          <div className="absolute bottom-1 right-3 size-[34px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffe9a8,#f5b940_60%,#d99a2a)] shadow-[0_12px_20px_-8px_rgba(160,110,0,0.5)]" />
        </div>
      );
    case "shelf":
      return (
        <div aria-hidden="true" className={cn("relative h-28 w-56", className)}>
          <div className="absolute bottom-0 left-0 h-[34px] w-56 rounded-[10px] bg-linear-to-b from-white to-cobalt-100 shadow-[0_18px_30px_-14px_rgba(11,30,77,0.4)]" />
          <div className="absolute bottom-[38px] left-[22px] h-8 w-[176px] rounded-[10px] bg-linear-to-b from-cobalt-300 to-cobalt-500 shadow-[0_16px_28px_-12px_rgba(31,71,184,0.5)]" />
          <div className="absolute bottom-[74px] left-12 h-[30px] w-[124px] rounded-[10px] bg-linear-to-b from-gold-200 to-gold-400 shadow-[0_14px_24px_-10px_rgba(160,110,0,0.45)]" />
        </div>
      );
    case "check":
      return (
        <div aria-hidden="true" className={cn("relative h-44 w-52", className)}>
          <div className="absolute left-6 top-1 flex h-[170px] w-[150px] rotate-[-6deg] flex-col gap-3 rounded-[14px] bg-linear-160 from-white to-cobalt-50 p-6 shadow-[0_24px_40px_-16px_rgba(11,30,77,0.35)]">
            <span className="h-2 w-[70%] rounded bg-cobalt-200" />
            <span className="h-2 w-[55%] rounded bg-cobalt-200" />
            <span className="h-2 w-[62%] rounded bg-cobalt-200" />
          </div>
          <div className="absolute bottom-2 right-2 flex size-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffe9a8,#f5b940_60%,#d99a2a)] shadow-[0_18px_30px_-10px_rgba(160,110,0,0.5)]">
            <svg viewBox="0 0 24 24" className="size-8 text-navy" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5 9-10" />
            </svg>
          </div>
        </div>
      );
  }
}
