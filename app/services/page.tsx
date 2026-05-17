import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/section";
import { Container } from "@/components/site/container";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Services" };

type Service = {
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
};

const services: Service[] = [
  {
    eyebrow: "01",
    title: "Fundamental Business Consulting",
    body:
      "Foundational analysis and strategic work for local businesses. Process design, organizational fundamentals, profit-focused implementation.",
    cta: {
      label: "Email for estimated pricing →",
      href: `mailto:${site.email}?subject=Consulting%20inquiry`,
    },
  },
  {
    eyebrow: "02",
    title: "Personalized Agent",
    body:
      "Pay-per-use AI agent built for your business. Captures, organizes, and acts on your information. Monthly invoice by actual token cost — no subscription floor.",
    cta: { label: "Learn more about the agent →", href: "/agent" },
  },
  {
    eyebrow: "03",
    title: "Custom AI Tool Development",
    body:
      "Custom tools built on the agent for your specific workflows. $50/hr plus token usage. New tools become part of your agent's permanent capability.",
    cta: {
      label: "Email about a project →",
      href: `mailto:${site.email}?subject=Custom%20tool%20development`,
    },
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Three ways we work with you."
        lede="Each engagement stands on its own, and most clients use more than one. Pricing is direct and listed where it's been set."
      />
      <Container className="py-20 sm:py-24">
        <div className="divide-y divide-border">
          {services.map((svc) => (
            <article
              key={svc.title}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-14 first:pt-0 last:pb-0"
            >
              <div className="lg:col-span-3">
                <p className="eyebrow">{svc.eyebrow}</p>
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                  {svc.title}
                </h2>
                <p className="mt-5 max-w-2xl text-lg text-foreground/75 leading-relaxed">
                  {svc.body}
                </p>
                <p className="mt-6 text-sm">
                  <Link
                    href={svc.cta.href}
                    className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
                  >
                    {svc.cta.label}
                  </Link>
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
