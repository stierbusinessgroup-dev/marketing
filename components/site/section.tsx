import { cn } from "@/lib/utils";
import { Container } from "@/components/site/container";

export function Section({
  className,
  innerClassName,
  children,
  bordered = false,
}: {
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <section
      className={cn(
        "py-20 sm:py-24 lg:py-28",
        bordered && "border-t border-border",
        className,
      )}
    >
      <Container className={innerClassName}>{children}</Container>
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="pt-20 pb-12 sm:pt-28 sm:pb-16 border-b border-border">
      <Container>
        <div className="max-w-3xl">
          {eyebrow ? <p className="eyebrow mb-6">{eyebrow}</p> : null}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            {title}
          </h1>
          {lede ? (
            <p className="mt-8 text-lg sm:text-xl text-foreground/75 leading-relaxed max-w-2xl">
              {lede}
            </p>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
