import type { Metadata } from "next";
import { PageHeader } from "@/components/site/section";
import { Container } from "@/components/site/container";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Email is the best way to reach us right now."
      />
      <Container className="py-20 sm:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">Email</p>
          <p className="break-words">
            <a
              href={`mailto:${site.email}`}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary underline underline-offset-[6px] decoration-primary/30 hover:decoration-primary"
            >
              {site.email}
            </a>
          </p>
          <p className="mt-12 max-w-md text-base text-foreground/75 leading-relaxed">
            I read every email and respond within two business days.
          </p>
        </div>
      </Container>
    </>
  );
}
