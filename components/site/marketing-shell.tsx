import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

/**
 * Wraps marketing pages with the site Header and Footer.
 * Used because the root layout is chrome-free (so /dashboard and /login
 * can render their own shells without the marketing header/footer).
 */
export function MarketingShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
