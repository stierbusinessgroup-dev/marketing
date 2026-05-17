import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/section";
import { Container } from "@/components/site/container";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "The Agent" };

const steps = [
  {
    num: "01",
    title: "Capture",
    body: "Talk to it; it saves the right things to the right places — journal, contacts, tasks, calendar.",
  },
  {
    num: "02",
    title: "Organize",
    body: "A weekly consolidation reviews everything you've captured and updates how the agent understands you.",
  },
  {
    num: "03",
    title: "Act",
    body: "Ask it to do things — create events, follow up with someone, find what you said about X — and it does them.",
  },
];

const tools = [
  "Journal capture and Learn statements",
  "Contact management with deduplication",
  "Calendar event creation",
  "Task creation",
  "Cortex proposals — the consolidation step",
];

export default function AgentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product"
        title="A personalized AI agent for your business."
        lede="It captures your information, organizes it as it accumulates, and acts on your behalf when asked. Built on the same architecture S-Tier uses internally."
      />
      <Container className="py-20 sm:py-24 space-y-24">
        {/* How it works */}
        <section>
          <p className="eyebrow mb-10">How it works</p>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {steps.map((s) => (
              <li
                key={s.num}
                className="border-t border-foreground/20 pt-6"
              >
                <p className="eyebrow mb-4">{s.num}</p>
                <h3 className="font-serif text-2xl tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-base text-foreground/75 leading-relaxed">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Current tools */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-t border-border pt-20">
          <div className="lg:col-span-3">
            <p className="eyebrow">Current tools</p>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight">
              What it can do today
            </h2>
            <ul className="mt-8 space-y-4 text-base sm:text-lg text-foreground/85 leading-relaxed">
              {tools.map((t) => (
                <li key={t} className="flex gap-4 items-baseline">
                  <span
                    aria-hidden
                    className="mt-2 h-px w-6 flex-none bg-primary"
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              More are added based on what customers need.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-t border-border pt-20">
          <div className="lg:col-span-3">
            <p className="eyebrow">Pricing</p>
          </div>
          <div className="lg:col-span-9 prose-stbg max-w-2xl">
            <p>
              Pay per use. Monthly invoice based on actual token costs from the
              underlying LLMs. No subscription floor, no upfront commitment.
            </p>
            <p>
              Need a custom tool? Tool development is{" "}
              <strong className="text-foreground">$50/hr plus token usage</strong>.
              New tools become permanent capabilities of your agent.
            </p>
          </div>
        </section>

        {/* Ongoing development */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-t border-border pt-20">
          <div className="lg:col-span-3">
            <p className="eyebrow">Ongoing development</p>
          </div>
          <div className="lg:col-span-9 prose-stbg max-w-2xl">
            <p>
              The agent gets more capable over time. New tools are added based
              on what customers need, and architecture decisions are published
              as we make them in our <Link href="/learn">Learn</Link> series.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border pt-20">
          <p className="font-serif text-2xl sm:text-3xl leading-[1.25] tracking-tight max-w-2xl">
            Want early access? Email us about your business and what you&rsquo;d
            want the agent to do.
          </p>
          <p className="mt-8 text-base">
            <a
              href={`mailto:${site.email}?subject=Agent%20early%20access`}
              className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
            >
              {site.email}
            </a>
          </p>
        </section>
      </Container>
    </>
  );
}
