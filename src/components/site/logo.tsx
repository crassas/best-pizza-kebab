import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <img
      src="/best-kebab-favicon-v2.png"
      alt="Best Kebab & Pizza"
      className={cn("shrink-0 object-contain rounded-md", className)}
    />
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <picture className="flex items-center">
      <source srcSet="/images/hero-logo.webp" type="image/webp" />
      <img
        src="/images/hero-logo.png"
        alt="Best Kebab & Pizza"
        className={cn(
          "object-contain object-left",
          compact ? "h-9 max-w-[200px]" : "h-11 max-w-[240px]"
        )}
      />
    </picture>
  );
}
