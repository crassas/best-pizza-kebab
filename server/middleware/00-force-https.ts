/**
 * Production canonical transport rule.
 *
 * Google can discover both http:// and https:// URLs. The public site must
 * consolidate every HTTP request into the HTTPS version before rendering so
 * the HTTP URL cannot remain as a separately fetchable duplicate.
 */
interface HttpsEvent {
  url: URL;
  req: { method: string; headers: Headers };
}

export default function forceHttpsMiddleware(
  event: HttpsEvent,
  next: () => unknown | Promise<unknown>,
): unknown | Promise<unknown> {
  const forwardedProto = (event.req.headers.get("x-forwarded-proto") ?? "").toLowerCase();
  const isHttp = forwardedProto === "http" || event.url.protocol === "http:";

  if (!isHttp) return next();

  const target = new URL(event.url.toString());
  target.protocol = "https:";

  return new Response(null, {
    status: 308,
    headers: {
      location: target.toString(),
      "cache-control": "public, max-age=3600",
    },
  });
}
