import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTenantBySubdomain } from "@/lib/tenants";
import PorchKitchenSite from "@/components/sites/PorchKitchenSite";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Props = {
  params: Promise<{ subdomain: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subdomain } = await params;
  const tenant = await getTenantBySubdomain(subdomain);
  if (!tenant || !tenant.site_published) {
    return { title: "Not Found" };
  }
  // Porch Kitchen gets a real title; others get the business name.
  if (subdomain === "porchkitchen") {
    return {
      title: "The Porch Kitchen — Sebastopol",
      description:
        "Farm-fresh California cooking, French at heart. Lunch & Dinner, Tue–Sun. Beer & Wine. 6811 Laguna Park Way, Sebastopol.",
    };
  }
  return { title: tenant.business };
}

export default async function TenantSitePage({ params }: Props) {
  const { subdomain } = await params;
  const tenant = await getTenantBySubdomain(subdomain);

  if (!tenant || !tenant.site_published) {
    notFound();
  }

  if (subdomain === "porchkitchen") {
    return <PorchKitchenSite />;
  }

  // Generic published-tenant placeholder for any future client.
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        background: "#f9f9f7",
        color: "#1a1a1a",
        textAlign: "center",
        padding: "48px 24px",
      }}
    >
      <div>
        <p
          style={{
            fontSize: ".75rem",
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: "16px",
          }}
        >
          Coming soon
        </p>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 600,
            letterSpacing: "-.02em",
            marginBottom: "12px",
          }}
        >
          {tenant.business}
        </h1>
        {tenant.location && (
          <p style={{ color: "#555", fontSize: "1.05rem" }}>{tenant.location}</p>
        )}
      </div>
    </div>
  );
}
