import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface WhatsAppIconProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const sizeClasses = {
  xs: "size-4",
  sm: "size-[18px]",
  md: "size-5",
  lg: "size-6",
};

export function WhatsAppIcon({
  className,
  size = "sm",
  alt = "WhatsApp",
  ...props
}: WhatsAppIconProps) {
  return (
    <img
      src="/images/whatsapp-icon.jpg"
      alt={alt}
      width={64}
      height={64}
      className={cn(
        "shrink-0 object-cover rounded-full inline-block",
        sizeClasses[size],
        className,
      )}
      loading="eager"
      decoding="async"
      {...props}
    />
  );
}
