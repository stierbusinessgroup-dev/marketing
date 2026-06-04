import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/section";
import { Container } from "@/components/site/container";
import { MarketingShell } from "@/components/site/marketing-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Services" };

const foundationalInclusions: { title: string; description: string }[] = [
  {
    title: "Onboarding",
    description:
      "A structured first session to map your business — your workflows, constraints, and the clearest opportunities for improvement.",
  },
  {
    title: "Custom AI tool creation",
    description:
      "Tools built for how you actually work. A plumber gets a job-cost estimator; a retailer gets an inventory query tool.",
  },
  {
    title: "Training",
    description:
      "Hands-on sessions so you and your team can use the tools confidently — not just hand-offs with documentation.",
  },
  {
    title: "Implementation",
    description:
      "We handle the technical side. Tools land in your existing workflow — your email, your apps, your daily routine.",
  },
  {
    title: "Ongoing business consulting",
    description:
      "Monthly check-ins to review what is working, adjust what is not, and identify the next lever worth pulling.",
  },
];

export default function ServicesPage() {
  const contactHref = `mailto:${site.email}?subject=Foundational%20plan%20inquiry`;

  return (
    <MarketingShell>
      <PageHeader
        eyebrow="Services"
        title="One plan. Two à la carte options."
        lede="Most Sonoma County businesses start with the Foundational plan — everything needed to get AI working for you, at a fixed monthly rate."
      />

      {/* ── Foundational plan ── */}
      <Container className="py-20 sm:py-24">
        {/* Pricing block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-16 border-b border-border">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">Foundational plan</p>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-serif text-5xl sm:text-6xl tracking-tight text-foreground">
                $250
                <span className="text-2xl font-sans font-normal text-foreground/60">
                  /mo
                </span>
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-through">
              $500/mo standard rate
            </p>
            <p className="mt-5 text-sm text-foreground/80 leading-relaxed max-w-xs">
              Founding-member price locked for as long as you remain a
              client — available to the first 10 Sonoma County businesses
              to sign up.
            </p>
            <p className="mt-8">
              <Link
                href={contactHref}
                className="inline-block rounded-none border border-primary bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Get started
              </Link>
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Questions?{" "}
              <Link
                href={`mailto:${site.email}`}
                className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
              >
                Email us
              </Link>
            </p>
          </div>

          <div className="lg:col-span-8">
            <p className="eyebrow mb-8">What is included</p>
            <div className="divide-y divide-border">
              {foundationalInclusions.map((item) => (
                <div key={item.title} className="py-5 first:pt-0 last:pb-0">
                  <p className="font-serif text-lg tracking-tight">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-foreground/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Founding-member callout */}
        <aside className="mt-10 mb-20 border border-border rounded-sm px-8 py-6 bg-muted/40">
          <p className="eyebrow mb-2">Founding members</p>
          <p className="text-base text-foreground/80 leading-relaxed max-w-2xl">
            The first 10 Sonoma County businesses to enroll lock in $250/month
            for the life of their engagement — even as the standard rate
            increases. Spots are limited and assigned in the order inquiries
            are received.
          </p>
          <p className="mt-4 text-sm">
            <Link
              href={contactHref}
              className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
            >
              Inquire about availability →
            </Link>
          </p>
        </aside>

        {/* ── À la carte options ── */}
        <p className="eyebrow mb-10">À la carte</p>
        <div className="divide-y divide-border">
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-14 first:pt-0">
            <div className="lg:col-span-3">
              <p className="eyebrow">Personalized Agent</p>
            </div>
            <div className="lg:col-span-9">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                Personalized Agent
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-foreground/75 leading-relaxed">
                A pay-per-use AI agent built for your business. Captures,
                organizes, and acts on your information. Billed monthly at
                actual token cost — no subscription floor, no minimum.
              </p>
              <p className="mt-6 text-sm">
                <Link
                  href="/agent"
                  className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
                >
                  Learn more about the agent →
                </Link>
              </p>
            </div>
          </article>

          <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-14 last:pb-0">
            <div className="lg:col-span-3">
              <p className="eyebrow">Custom AI Tool Development</p>
            </div>
            <div className="lg:col-span-9">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                Custom AI Tool Development
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-foreground/75 leading-relaxed">
                Purpose-built tools for workflows not covered by the
                Foundational plan. $50/hr plus token usage. New tools become
                a permanent part of your agent&apos;s capability set.
              </p>
              <p className="mt-6 text-sm">
                <Link
                  href={`mailto:${site.email}?subject=Custom%20tool%20development`}
                  className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
                >
                  Email about a project →
                </Link>
              </p>
            </div>
          </article>
        </div>
      </Container>
    </MarketingShell>
  );
}
