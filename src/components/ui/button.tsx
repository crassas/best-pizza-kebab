import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,background-color,color,border-color] duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-orange text-white hover:bg-orange-hot font-semibold shadow-xs",
        secondary:
          "bg-surface border border-line/60 text-cream hover:bg-raised hover:border-line hover:text-white shadow-xs",
        cream: "bg-cream text-ink hover:bg-cream-dim",
        uber: "bg-uber text-cream border border-[#4d6343]/60 hover:bg-[#455c3c] shadow-xs font-semibold transition-colors",
        boltFood: "bg-bolt text-cream border border-[#4d6343]/60 hover:bg-[#43593b] shadow-xs font-semibold transition-colors",
        whatsapp: "bg-whatsapp text-cream border border-[#4d6343]/60 hover:bg-[#3f5436] shadow-xs font-semibold transition-colors",
        outline:
          "border border-cream/45 bg-raised text-cream hover:border-cream hover:bg-surface",
        ghost: "bg-transparent text-cream hover:bg-cream/8",
        ink: "bg-ink text-cream hover:bg-bg",
      },
      size: {
        sm: "h-9 rounded-md px-3.5 text-xs font-semibold",
        md: "h-11 rounded-md px-5 text-sm",
        lg: "h-12 rounded-lg px-6 text-base",
        xl: "h-14 rounded-lg px-7 text-base",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
