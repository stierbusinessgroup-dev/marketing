import type { Metadata } from "next";
import { PageHeader } from "@/components/site/section";
import { Container } from "@/components/site/container";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Learn" };

const lessons = [
  {
    num: "Lesson 1",
    title: "How the brain consolidates memory",
    source: "Drawn from ADR 0017",
  },
  {
    num: "Lesson 2",
    title: "How tools talk to the user",
    source: "Drawn from ADR 0019",
  },
  {
    num: "Lesson 3",
    title: "How the brain knows what it remembers",
    source: "Drawn from ADR 0020",
  },
];

export default function LearnPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learn"
        title="An open notebook of how we built our agent."
        lede="Released as architecture decision records — the actual design documents we wrote, walked through with code where relevant. Lessons accumulate as we add to the agent."
      />
      <Container className="py-20 sm:py-24">
        <p className="eyebrow mb-10">Lessons</p>
        <ol className="divide-y divide-border border-y border-border">
          {lessons.map((l) => (
            <li
              key={l.num}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 py-8"
            >
              <div className="sm:col-span-3">
                <p className="text-sm text-foreground/80">{l.num}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {l.source}
                </p>
              </div>
              <div className="sm:col-span-9">
                <p className="font-serif text-xl sm:text-2xl tracking-tight text-foreground/45">
                  {l.title}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Coming soon.
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-muted-foreground">More coming.</p>

        <div className="mt-20 border-t border-border pt-12 max-w-2xl">
          <p className="eyebrow mb-4">Notify me</p>
          <p className="text-base text-foreground/85 leading-relaxed">
            Email me when new lessons land.
          </p>
          <p className="mt-4 text-sm">
            <a
              href={`mailto:${site.email}?subject=Learn%20updates`}
              className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
            >
              {site.email}
            </a>
          </p>
        </div>
      </Container>
    </>
  );
}
