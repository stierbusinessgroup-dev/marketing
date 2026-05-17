import type { Metadata } from "next";
import { PageHeader } from "@/components/site/section";
import { Container } from "@/components/site/container";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="The firm, the operator, the mission."
      />
      <Container className="py-20 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">Founder</p>
          </div>
          <div className="lg:col-span-9 prose-stbg">
            <p>
              Christopher Andersen has been working with AI since before
              OpenAI&rsquo;s public launch. Over the past ten years he has
              managed businesses across the beverage, hospitality, and auto
              industries in Sonoma County — startups, corporate operations, and
              local main-street businesses.
            </p>
            <p>
              His work has consistently increased profit through fundamental
              strategy and process-oriented initiatives. He founded S-Tier
              Business Group to apply that work, alongside production AI
              implementation, to the Sonoma County market.
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 border-t border-border pt-20">
          <div className="lg:col-span-3">
            <p className="eyebrow">Mission</p>
          </div>
          <div className="lg:col-span-9">
            <p className="font-serif text-2xl sm:text-3xl leading-[1.3] tracking-tight text-foreground">
              Help develop business in Sonoma County. Invest in AI
              infrastructure that makes the most accessible AI tools available
              to local businesses — not just enterprise customers.
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 border-t border-border pt-20">
          <div className="lg:col-span-3">
            <p className="eyebrow">Based in</p>
          </div>
          <div className="lg:col-span-9 prose-stbg">
            <p>
              Sonoma County, California. The work is local by design —
              relationships and context compound, and the businesses that
              built the region deserve the same caliber of infrastructure that
              technology companies have spent the last two decades building
              for themselves.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
