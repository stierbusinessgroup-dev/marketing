import type { Metadata } from "next";
import { PageHeader } from "@/components/site/section";
import { Container } from "@/components/site/container";
import { MarketingShell } from "@/components/site/marketing-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Opportunities" };

export default function OpportunitiesPage() {
  return (
    <MarketingShell>
      <PageHeader
        eyebrow="Opportunities"
        title="Open positions and investment opportunities."
        lede="Roles and capital opportunities at S-Tier Business Group and our portfolio companies."
      />
      <Container className="py-20 sm:py-24">
        <div className="border-y border-border py-20 max-w-2xl">
          <p className="font-serif text-2xl sm:text-3xl text-foreground tracking-tight">
            Nothing open right now.
          </p>
          <p className="mt-6 text-base text-foreground/75 leading-relaxed">
            If you&rsquo;d like to be considered for future work or investment,
            email us — we keep an active list and reach out as openings come up.
          </p>
          <p className="mt-8 text-sm">
            <a
              href={`mailto:${site.email}?subject=Future%20opportunities`}
              className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
            >
              {site.email}
            </a>
          </p>
        </div>
      </Container>
    </MarketingShell>
  );
}
