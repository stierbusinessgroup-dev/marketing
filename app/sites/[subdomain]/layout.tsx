import type { Metadata } from "next";
import "./porch.css";

/**
 * Tenant site layout.
 *
 * Deliberately minimal: no S-Tier chrome (no header, footer, font vars).
 * The porch.css file loaded here carries the Google Fonts @import and all
 * site-specific custom properties. It is scoped under .pk-site so it cannot
 * bleed into the root layout.
 *
 * This layout is a segment layout, so it inherits the root <html>/<body>
 * from app/layout.tsx. The pk-site div wrapping each site resets everything
 * it needs via its own CSS custom properties.
 */
export const metadata: Metadata = {
  title: {
    default: "Site",
    template: "%s",
  },
};

export default function TenantSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
