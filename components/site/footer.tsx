import Link from "next/link";
import { Container } from "@/components/site/container";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-xl tracking-tight">{site.name}</p>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground leading-relaxed">
              {site.description}
            </p>
            <p className="mt-6 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
              >
                {site.email}
              </a>
            </p>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <p className="eyebrow mb-4">{col.heading}</p>
                <ul className="space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-foreground/75 hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Sonoma County, California</p>
        </div>
      </Container>
    </footer>
  );
}
