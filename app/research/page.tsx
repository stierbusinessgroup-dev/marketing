import type { Metadata } from "next";
import { PageHeader } from "@/components/site/section";
import { Container } from "@/components/site/container";
import { MarketingShell } from "@/components/site/marketing-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Research" };

export default function ResearchPage() {
  return (
    <MarketingShell>
      <PageHeader
        eyebrow="Research"
        title="Daily-curated reading on AI, business, and Sonoma County."
        lede="Auto-populated by the agent. The feed starts when daily research automation lands."
      />
      <Container className="py-20 sm:py-24">
        <p className="eyebrow mb-8">Today&rsquo;s feed</p>
        <div className="border-y border-border py-24 text-center">
          <p className="font-serif text-2xl sm:text-3xl text-foreground/40 tracking-tight">
            Empty for now.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            The first entries appear when the daily research job goes live.
          </p>
        </div>

        <div className="mt-20 border-t border-border pt-12 max-w-2xl">
          <p className="eyebrow mb-4">Weekly digest</p>
          <p className="text-base text-foreground/85 leading-relaxed">
            Email me the weekly digest.
          </p>
          <p className="mt-4 text-sm">
            <a
              href={`mailto:${site.email}?subject=Weekly%20digest`}
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
