import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PorchDemoShell } from "@/components/sites/PorchDemoShell";

export const metadata: Metadata = {
  title: "Agent Dashboard — The Porch Kitchen",
  description: "Sales preview of the AI agent dashboard for The Porch Kitchen.",
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ subdomain: string }>;
};

export default async function PorchDemoDashboardPage({ params }: Props) {
  const { subdomain } = await params;

  if (subdomain !== "porchkitchen") {
    notFound();
  }

  return <PorchDemoShell />;
}
