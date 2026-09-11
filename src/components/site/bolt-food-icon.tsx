import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

interface BoltFoodIconProps extends SVGProps<SVGSVGElement> {
  size?: "xs" | "sm" | "md" | "lg";
}

const sizeClasses = {
  xs: "h-3.5 w-auto",
  sm: "h-4 w-auto",
  md: "h-4.5 w-auto",
  lg: "h-5 w-auto",
};

export function BoltFoodIcon({ className, size = "sm", ...props }: BoltFoodIconProps) {
  return (
    <svg
      viewBox="0 0 100 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 inline-block", sizeClasses[size], className)}
      {...props}
    >
      {/* Bolt Green circle/rounded pill */}
      <rect width="28" height="28" rx="14" fill="#34BB78" />
      {/* Lightning bolt path inside the circle */}
      <path
        d="M15.5 5L10 14H14.5L12.5 23L18 14H13.5L15.5 5Z"
        fill="white"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Text "Bolt" and "Food" next to it */}
      <text
        x="34"
        y="19"
        fill="currentColor"
        fontSize="14"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-0.03em"
      >
        Bolt
      </text>
      <text
        x="63"
        y="19"
        fill="#34BB78"
        fontSize="13"
        fontWeight="500"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-0.01em"
      >
        Food
      </text>
    </svg>
  );
}
