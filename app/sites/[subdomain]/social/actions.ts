"use server";

import { revalidatePath } from "next/cache";
import { getAdminClient } from "@/lib/supabase/admin";

const TABLE = "porch_facebook_groups";
const PAGE_PATH = "/sites/[subdomain]/social";

// ─── Types ────────────────────────────────────────────────────────────────────

export type GroupInput = {
  name: string;
  memberCount: number;
  focus: string;
  postingRequirements: string[];
  joinUrl: string;
};

export type ActionResult = { ok: true } | { ok: false; error: string };

// ─── Passcode gate ─────────────────────────────────────────────────────────────
// Editing is gated by a shared passcode held only by the owner. Validated
// SERVER-SIDE on every mutation — hiding the UI is not the security boundary.

function keyOk(key: string): boolean {
  const expected = process.env.PORCH_SOCIAL_EDIT_KEY;
  return typeof expected === "string" && expected.length > 0 && key === expected;
}

/** Cheap pre-check so the UI can unlock edit mode before a form is filled in. */
export async function verifyKey(key: string): Promise<boolean> {
  return keyOk(key);
}

// ─── Validation ────────────────────────────────────────────────────────────────

function clean(input: GroupInput): GroupInput | null {
  const name = input.name.trim();
  if (!name) return null;
  return {
    name,
    memberCount: Number.isFinite(input.memberCount) ? Math.max(0, Math.trunc(input.memberCount)) : 0,
    focus: input.focus.trim(),
    postingRequirements: input.postingRequirements.map((r) => r.trim()).filter(Boolean),
    joinUrl: input.joinUrl.trim(),
  };
}

function toRow(g: GroupInput) {
  return {
    name: g.name,
    member_count: g.memberCount,
    focus: g.focus || null,
    posting_requirements: g.postingRequirements,
    join_url: g.joinUrl || null,
  };
}

// ─── Mutations ─────────────────────────────────────────────────────────────────

export async function addGroup(key: string, input: GroupInput): Promise<ActionResult> {
  if (!keyOk(key)) return { ok: false, error: "Incorrect passcode." };
  const cleaned = clean(input);
  if (!cleaned) return { ok: false, error: "Group name is required." };

  const admin = getAdminClient();
  if (!admin) return { ok: false, error: "Storage is not configured." };

  const { error } = await admin.from(TABLE).insert(toRow(cleaned));
  if (error) return { ok: false, error: error.message };

  revalidatePath(PAGE_PATH, "page");
  return { ok: true };
}

export async function updateGroup(key: string, id: string, input: GroupInput): Promise<ActionResult> {
  if (!keyOk(key)) return { ok: false, error: "Incorrect passcode." };
  const cleaned = clean(input);
  if (!cleaned) return { ok: false, error: "Group name is required." };

  const admin = getAdminClient();
  if (!admin) return { ok: false, error: "Storage is not configured." };

  const { error } = await admin
    .from(TABLE)
    .update({ ...toRow(cleaned), updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath(PAGE_PATH, "page");
  return { ok: true };
}

export async function deleteGroup(key: string, id: string): Promise<ActionResult> {
  if (!keyOk(key)) return { ok: false, error: "Incorrect passcode." };

  const admin = getAdminClient();
  if (!admin) return { ok: false, error: "Storage is not configured." };

  const { error } = await admin.from(TABLE).delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath(PAGE_PATH, "page");
  return { ok: true };
}
