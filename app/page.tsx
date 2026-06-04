import Link from "next/link";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { MarketingShell } from "@/components/site/marketing-shell";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <MarketingShell>
      {/* Hero
         Headline candidates considered:
         1. "Business consulting and AI implementation for Sonoma County." (chosen — most direct)
         2. "Local businesses deserve world-class infrastructure. We build it."
         3. "Sonoma County business consulting, powered by working AI." */}
      <section className="pt-24 sm:pt-32 lg:pt-40 pb-20 sm:pb-24">
        <Container>
          <p className="eyebrow mb-8">Sonoma County, California</p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.02] tracking-[-0.02em] max-w-4xl">
            Business consulting and AI implementation for Sonoma County.
          </h1>
          <p className="mt-10 max-w-2xl text-lg sm:text-xl text-foreground/75 leading-relaxed">
            S-Tier Business Group develops local businesses through fundamental
            strategy work and production AI infrastructure — making the most
            capable tools available outside of enterprise.
          </p>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link
              href="/services"
              className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
            >
              Services
            </Link>
            <Link
              href="/agent"
              className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
            >
              The Agent
            </Link>
            <Link
              href="/contact"
              className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
            >
              Contact
            </Link>
          </div>
        </Container>
      </section>

      {/* Three pillars */}
      <Section bordered>
        <p className="eyebrow mb-12">What we do</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          <PillarCard
            href="/services"
            eyebrow="01"
            title="Consulting"
            body="Foundational analysis and strategic work for local businesses. Process design, organizational fundamentals, profit-focused implementation."
          />
          <PillarCard
            href="/agent"
            eyebrow="02"
            title="Agent"
            body="A pay-per-use AI agent that captures your information, organizes it as it accumulates, and acts on your behalf when asked."
          />
          <PillarCard
            href="/initiatives"
            eyebrow="03"
            title="Initiatives"
            body="Active ventures we operate or invest in — currently AI-integrated work in traditional industries."
          />
        </div>
      </Section>

      {/* Foundational pricing callout */}
      <Section bordered>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="eyebrow mb-6">Foundational plan</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight">
              Everything you need to get AI working in your business.
            </h2>
          </div>
          <div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-serif text-5xl tracking-tight text-foreground">
                $250
                <span className="text-xl font-sans font-normal text-foreground/60">
                  /mo
                </span>
              </span>
              <span className="text-sm text-muted-foreground line-through">
                $500/mo
              </span>
            </div>
            <p className="mt-4 text-base text-foreground/75 leading-relaxed max-w-sm">
              Founding-member price — locked for life — for the first 10 Sonoma
              County businesses to sign up. Includes onboarding, custom AI tool
              creation, training, implementation, and ongoing consulting.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href={`mailto:${site.email}?subject=Foundational%20plan%20inquiry`}
                className="inline-block rounded-none border border-primary bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Get started
              </Link>
              <Link
                href="/services"
                className="text-sm text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
              >
                See what is included →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission */}
      <Section bordered>
        <div className="max-w-3xl">
          <p className="eyebrow mb-8">Mission</p>
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-[1.25] tracking-tight text-foreground">
            Help develop business in Sonoma County. Invest in AI infrastructure
            that makes the most accessible tools available to local
            businesses — not just enterprise customers.
          </p>
          <p className="mt-10 text-sm">
            <Link
              href="/about"
              className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
            >
              About S-Tier &amp; Christopher Andersen →
            </Link>
          </p>
        </div>
      </Section>
    </MarketingShell>
  );
}

function PillarCard({
  href,
  eyebrow,
  title,
  body,
}: {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="group block border-t border-foreground/20 pt-8 transition-colors hover:border-primary"
    >
      <p className="eyebrow mb-6">{eyebrow}</p>
      <h2 className="font-serif text-2xl sm:text-3xl tracking-tight group-hover:text-primary transition-colors">
        {title}
      </h2>
      <p className="mt-4 text-base text-foreground/75 leading-relaxed">
        {body}
      </p>
      <p className="mt-6 inline-flex items-center gap-1 text-sm text-primary">
        Learn more <span aria-hidden>→</span>
      </p>
    </Link>
  );
}
