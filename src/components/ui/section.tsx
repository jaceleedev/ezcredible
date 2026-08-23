import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Halftone } from "./halftone";

type SectionProps = ComponentProps<"section"> & {
  tone?: "white" | "soft" | "navy" | "cobalt" | "ink";
  /** 모서리 하프톤 장식 (navy/cobalt 톤에서 주로) */
  halftone?: boolean;
  /** 위아래 여백을 줄인 컴팩트 섹션 */
  compact?: boolean;
};

const tones = {
  white: "bg-white text-ink",
  soft: "bg-soft text-ink",
  navy: "bg-navy text-white",
  cobalt: "stage-cobalt-bright text-white",
  ink: "bg-navy-deep text-white",
};

export function Section({
  tone = "white",
  halftone = false,
  compact = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        compact ? "py-14 md:py-20" : "py-20 md:py-28",
        tones[tone],
        className,
      )}
      {...props}
    >
      {halftone && (
        <>
          <Halftone corner="tl" tone={tone === "white" || tone === "soft" ? "ink" : "light"} />
          <Halftone corner="br" tone={tone === "white" || tone === "soft" ? "ink" : "light"} />
        </>
      )}
      {children}
    </section>
  );
}
