import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { listGroups } from "@/lib/porch-groups";
import { GroupManagerClient } from "@/components/sites/porch-social/GroupManagerClient";

export const metadata: Metadata = {
  title: "Facebook Group Manager — The Porch Kitchen",
  description: "Facebook groups, posting requirements, and join links for The Porch Kitchen.",
  robots: { index: false, follow: false },
};

// Always render fresh — the group list is edited live.
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ subdomain: string }>;
};

export default async function PorchSocialPage({ params }: Props) {
  const { subdomain } = await params;

  if (subdomain !== "porchkitchen") {
    notFound();
  }

  const groups = await listGroups();
  return <GroupManagerClient initialGroups={groups} />;
}
