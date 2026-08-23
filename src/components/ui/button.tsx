import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight, ArrowUpRight } from "./icons";

type Variant = "primary" | "white" | "navy" | "ghost" | "outline" | "link";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand-strong text-white shadow-button hover:bg-cobalt-700",
  white: "bg-white text-cobalt-700 shadow-button hover:bg-cobalt-50",
  navy: "bg-navy text-white hover:bg-cobalt-800",
  ghost: "border border-white/45 bg-white/10 text-white hover:bg-white/20",
  outline: "border border-line-strong bg-white text-ink hover:border-cobalt-300 hover:text-brand-strong",
  link: "h-auto px-0 text-brand-strong underline-offset-4 hover:text-cobalt-700 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "h-10 gap-2 px-4 text-sm",
  md: "h-12 gap-2.5 px-6 text-[15px]",
  lg: "h-14 gap-3 px-7 text-base",
};

type Common = {
  variant?: Variant;
  size?: Size;
  /** 뒤에 붙는 아이콘. 외부 링크는 자동으로 external */
  icon?: "arrow" | "external" | "none";
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = Common & { href: string; external?: boolean } & Omit<
    ComponentProps<"a">,
    "href" | "className" | "children"
  >;
type NativeButtonProps = Common & { href?: undefined; external?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

function classes(variant: Variant, size: Size, className?: string) {
  return cn(
    "inline-flex shrink-0 items-center justify-center rounded-full font-bold whitespace-nowrap transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-(--ease-out-quart) active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    variant === "link" ? "" : sizes[size],
    className,
  );
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, className, children } = props;
  const isExternal = props.href !== undefined && (props.external ?? /^https?:/.test(props.href));
  const iconKind = icon ?? (isExternal ? "external" : "arrow");
  const trailing =
    iconKind === "arrow" ? <ArrowRight size={size === "lg" ? 18 : 16} /> : iconKind === "external" ? <ArrowUpRight size={16} /> : null;

  if (props.href !== undefined) {
    const { href, external: _external, variant: _v, size: _s, icon: _i, className: _c, children: _ch, ...rest } = props;
    void _external; void _v; void _s; void _i; void _c; void _ch;
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={classes(variant, size, className)} {...rest}>
          <span>{children}</span>
          {trailing}
        </a>
      );
    }
    return (
      <Link href={href} className={classes(variant, size, className)} {...rest}>
        <span>{children}</span>
        {trailing}
      </Link>
    );
  }

  const { variant: _v, size: _s, icon: _i, className: _c, children: _ch, href: _h, external: _e, type, ...rest } = props;
  void _v; void _s; void _i; void _c; void _ch; void _h; void _e;
  return (
    <button type={type ?? "button"} className={classes(variant, size, className)} {...rest}>
      <span>{children}</span>
      {trailing}
    </button>
  );
}
