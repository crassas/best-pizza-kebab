import { jsonLd } from "@/lib/restaurant";

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
    />
  );
}
