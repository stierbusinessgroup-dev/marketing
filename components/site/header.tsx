import Link from "next/link";
import { Container } from "@/components/site/container";
import { primaryNav, site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-sm border-b border-border">
      <Container className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
        <Link
          href="/"
          className="font-serif text-lg sm:text-xl tracking-tight text-foreground hover:text-primary transition-colors"
        >
          {site.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-foreground/70">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
