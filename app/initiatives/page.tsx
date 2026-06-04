import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/section";
import { Container } from "@/components/site/container";
import { MarketingShell } from "@/components/site/marketing-shell";

export const metadata: Metadata = { title: "Initiatives" };

type Initiative = {
  name: string;
  status: "Active" | "Early Access" | "In Development" | "Planned";
  body: string;
  href?: { label: string; url: string };
};

const initiatives: Initiative[] = [
  {
    name: "The Connect Wholesale LLC",
    status: "Active",
    body:
      "Integrating AI into the wholesale vehicle market. Pricing intelligence, inventory analysis, and operational tooling for a traditional industry.",
  },
  {
    name: "The Personalized Agent",
    status: "Early Access",
    body:
      "A pay-per-use AI agent for small businesses. The product page has the full picture.",
    href: { label: "See /agent", url: "/agent" },
  },
];

export default function InitiativesPage() {
  return (
    <MarketingShell>
      <PageHeader
        eyebrow="Initiatives"
        title="Active ventures, in portfolio."
        lede="What we operate, build, or invest in. New entries appear as ventures launch — not before."
      />
      <Container className="py-20 sm:py-24">
        <div className="divide-y divide-border">
          {initiatives.map((init) => (
            <article
              key={init.name}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-14 first:pt-0"
            >
              <div className="lg:col-span-3">
                <p className="eyebrow mb-2">Status</p>
                <p className="text-sm text-foreground/85">{init.status}</p>
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-serif text-2xl sm:text-3xl tracking-tight">
                  {init.name}
                </h2>
                <p className="mt-4 max-w-2xl text-base sm:text-lg text-foreground/75 leading-relaxed">
                  {init.body}
                </p>
                {init.href ? (
                  <p className="mt-6 text-sm">
                    <Link
                      href={init.href.url}
                      className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
                    >
                      {init.href.label} →
                    </Link>
                  </p>
                ) : null}
              </div>
            </article>
          ))}
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-14 last:pb-0">
            <div className="lg:col-span-3">
              <p className="eyebrow mb-2">Status</p>
              <p className="text-sm text-muted-foreground">In development</p>
            </div>
            <div className="lg:col-span-9">
              <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-foreground/40">
                Future initiative
              </h2>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
                Placeholder. Real entries land here when there&rsquo;s something
                real to put on the page.
              </p>
            </div>
          </article>
        </div>
      </Container>
    </MarketingShell>
  );
}
