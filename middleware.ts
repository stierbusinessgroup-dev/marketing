import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

/**
 * Base domains that the S-Tier marketing app is served under.
 * A subdomain is the leading label before any of these.
 * "www" and the bare apex are treated as the main app (no tenant routing).
 */
const BASE_DOMAINS = ["stierbusinessgroup.com", "localhost"];

/**
 * Extract the tenant subdomain from a raw host header value.
 *
 * Examples:
 *   "porchkitchen.stierbusinessgroup.com" -> "porchkitchen"
 *   "porchkitchen.localhost:3001"         -> "porchkitchen"
 *   "stierbusinessgroup.com"             -> null  (apex)
 *   "www.stierbusinessgroup.com"         -> null  (www)
 *   "localhost:3001"                     -> null  (no subdomain)
 */
function extractSubdomain(host: string): string | null {
  // Strip port
  const hostname = host.split(":")[0].toLowerCase();

  for (const base of BASE_DOMAINS) {
    if (hostname === base) return null;           // apex
    if (hostname.endsWith(`.${base}`)) {
      const label = hostname.slice(0, hostname.length - base.length - 1);
      // Treat "www" as the main app
      if (label === "www") return null;
      // Reject nested dots (e.g. "a.b.stierbusinessgroup.com")
      if (label.includes(".")) return null;
      return label;
    }
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const subdomain = extractSubdomain(host);

  if (subdomain) {
    // Tenant subdomain detected. Rewrite to /sites/[subdomain][rest-of-path].
    // Tenant sites are public — skip the auth gate entirely.
    const url = request.nextUrl.clone();
    const suffix =
      url.pathname === "/" ? "" : url.pathname;
    url.pathname = `/sites/${subdomain}${suffix}`;
    return NextResponse.rewrite(url);
  }

  // No subdomain — main S-Tier app. Run the auth gate as before.
  return await updateSession(request);
}

export const config = {
  // Run on all routes except static assets and image files.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
