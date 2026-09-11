import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface UberIconProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const sizeClasses = {
  xs: "size-[18px]",
  sm: "size-5",
  md: "size-6",
  lg: "size-7",
  xl: "size-8",
};

export function UberIcon({ className, size = "sm", alt = "Uber Eats", ...props }: UberIconProps) {
  return (
    <img
      src="/images/uberlogo.png"
      alt={alt}
      width={64}
      height={64}
      className={cn("shrink-0 object-contain rounded-full inline-block", sizeClasses[size], className)}
      loading="eager"
      decoding="async"
      {...props}
    />
  );
}
