import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = ComponentProps<"div"> & {
  size?: "default" | "narrow" | "wide";
};

const sizes = {
  default: "max-w-(--container-site)",
  narrow: "max-w-4xl",
  wide: "max-w-[90rem]",
};

export function Container({ size = "default", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-5 sm:px-8", sizes[size], className)} {...props} />;
}
