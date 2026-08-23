import { cn } from "@/lib/cn";

type HalftoneProps = {
  /** 어느 모서리에서 번져 나가는지 */
  corner?: "tl" | "tr" | "bl" | "br";
  /** 밝은 면 위에서는 ink */
  tone?: "light" | "ink";
  className?: string;
};

const corners = {
  tl: "left-0 top-0 mask-fade-tl",
  tr: "right-0 top-0 mask-fade-tr",
  bl: "bottom-0 left-0 mask-fade-bl",
  br: "bottom-0 right-0 mask-fade-br",
};

/** 장식용 하프톤 도트. 부모는 relative + overflow-hidden 이어야 한다. */
export function Halftone({ corner = "br", tone = "light", className }: HalftoneProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-[380px] w-[560px]",
        tone === "light" ? "halftone" : "halftone-ink",
        corners[corner],
        className,
      )}
    />
  );
}
