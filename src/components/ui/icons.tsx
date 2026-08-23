import type { ComponentProps, ReactNode } from "react";

type IconProps = Omit<ComponentProps<"svg">, "children"> & { size?: number };

function Base({ size = 16, strokeWidth = 2.2, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </Base>
);
export const ArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </Base>
);
export const ArrowUp = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 19V5" />
    <path d="M6 11l6-6 6 6" />
  </Base>
);
export const ChevronLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="M15 6l-6 6 6 6" />
  </Base>
);
export const ChevronRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 6l6 6-6 6" />
  </Base>
);
export const ChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 9l6 6 6-6" />
  </Base>
);
export const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12l5 5 9-10" />
  </Base>
);
export const Menu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Base>
);
export const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </Base>
);
export const Home = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
  </Base>
);
export const Doc = (p: IconProps) => (
  <Base strokeWidth={1.75} {...p}>
    <path d="M7 3h7l5 5v13H7z" />
    <path d="M14 3v5h5" />
    <path d="M10 13h6" />
    <path d="M10 17h6" />
  </Base>
);
export const Cycle = (p: IconProps) => (
  <Base strokeWidth={1.75} {...p}>
    <path d="M4 12a8 8 0 0 1 14-5" />
    <path d="M18 4v3h-3" />
    <path d="M20 12a8 8 0 0 1-14 5" />
    <path d="M6 20v-3h3" />
  </Base>
);
export const Chart = (p: IconProps) => (
  <Base strokeWidth={1.75} {...p}>
    <path d="M4 20h16" />
    <path d="M7 16v-4" />
    <path d="M12 16V8" />
    <path d="M17 16V5" />
  </Base>
);
export const Trend = (p: IconProps) => (
  <Base strokeWidth={1.9} {...p}>
    <path d="M4 18l6-6 4 4 6-8" />
    <path d="M14 8h6v6" />
  </Base>
);
export const ListCheck = (p: IconProps) => (
  <Base strokeWidth={1.9} {...p}>
    <path d="M4 6h16" />
    <path d="M4 12h10" />
    <path d="M4 18h7" />
    <path d="M17 15l2 2 4-4" />
  </Base>
);
export const Star = (p: IconProps) => (
  <Base strokeWidth={1.9} {...p}>
    <path d="M12 3l2.4 5 5.6.8-4 3.9.9 5.6-4.9-2.6L7.1 18.3l.9-5.6-4-3.9L9.6 8z" />
  </Base>
);
export const Award = (p: IconProps) => (
  <Base strokeWidth={1.9} {...p}>
    <circle cx="12" cy="9" r="5" />
    <path d="M9 13.5L8 21l4-2 4 2-1-7.5" />
  </Base>
);
export const Phone = (p: IconProps) => (
  <Base strokeWidth={1.9} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </Base>
);
