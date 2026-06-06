"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  ExternalLink,
  Check,
  Plus,
  Pencil,
  Trash2,
  X,
  KeyRound,
  Lock,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PorchGroup } from "@/lib/porch-groups";
import {
  addGroup,
  updateGroup,
  deleteGroup,
  verifyKey,
  type GroupInput,
} from "@/app/sites/[subdomain]/social/actions";

const STORAGE_KEY = "porch-social-edit-key";

function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

// ─── Group card ───────────────────────────────────────────────────────────────

function GroupCard({
  group,
  canEdit,
  onEdit,
  onDelete,
}: {
  group: PorchGroup;
  canEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasLink = !!group.joinUrl && group.joinUrl !== "#";
  const reqs = group.postingRequirements;
  const extra = reqs.length - 1;

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-2xl leading-tight tracking-tight text-foreground">
            {group.name}
          </h3>
          {group.focus && (
            <p className="mt-1 text-sm text-muted-foreground">{group.focus}</p>
          )}
        </div>
        {canEdit && (
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={onEdit}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Edit group"
            >
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label="Delete group"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        )}
      </div>

      <div className="mb-5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium text-foreground/80">
          <Users className="size-3.5 text-muted-foreground" aria-hidden />
          {formatCount(group.memberCount)} members
        </span>
      </div>

      <div className="mb-6 flex-1">
        <p className="eyebrow mb-2.5">Posting requirements</p>
        {reqs.length > 0 ? (
          <>
            <ul className="space-y-2">
              {(expanded ? reqs : reqs.slice(0, 1)).map((rule, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
            {extra > 0 && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
                aria-expanded={expanded}
              >
                <ChevronDown
                  className={cn("size-3.5 transition-transform", expanded && "rotate-180")}
                  aria-hidden
                />
                {expanded ? "Show less" : `Show ${extra} more`}
              </button>
            )}
          </>
        ) : (
          <p className="text-sm italic text-muted-foreground/60">
            Not recorded yet — add the rules once you&apos;ve joined the group.
          </p>
        )}
      </div>

      <a
        href={hasLink ? group.joinUrl! : undefined}
        target={hasLink ? "_blank" : undefined}
        rel={hasLink ? "noopener noreferrer" : undefined}
        aria-disabled={!hasLink}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors",
          hasLink
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "pointer-events-none cursor-not-allowed bg-muted text-muted-foreground"
        )}
      >
        <ExternalLink className="size-4" aria-hidden />
        {hasLink ? "Open group" : "Link coming soon"}
      </a>
    </div>
  );
}

// ─── Modal shell ────────────────────────────────────────────────────────────────

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-background p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-xl tracking-tight">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Group form (add / edit) ────────────────────────────────────────────────────

function GroupForm({
  initial,
  pending,
  error,
  onSubmit,
  onCancel,
}: {
  initial?: PorchGroup;
  pending: boolean;
  error: string | null;
  onSubmit: (input: GroupInput) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [memberCount, setMemberCount] = useState(String(initial?.memberCount ?? ""));
  const [focus, setFocus] = useState(initial?.focus ?? "");
  const [rules, setRules] = useState((initial?.postingRequirements ?? []).join("\n"));
  const [joinUrl, setJoinUrl] = useState(initial?.joinUrl ?? "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      name,
      memberCount: parseInt(memberCount, 10) || 0,
      focus,
      postingRequirements: rules.split("\n"),
      joinUrl,
    });
  }

  const field =
    "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary";
  const label = "mb-1.5 block text-xs font-medium text-foreground/80";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className={label} htmlFor="g-name">Group name</label>
        <input
          id="g-name"
          className={field}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Sebastopol Foodies"
          autoFocus
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label} htmlFor="g-members">Member count</label>
          <input
            id="g-members"
            className={field}
            value={memberCount}
            onChange={(e) => setMemberCount(e.target.value.replace(/[^0-9]/g, ""))}
            inputMode="numeric"
            placeholder="4200"
          />
        </div>
        <div>
          <label className={label} htmlFor="g-focus">Focus (optional)</label>
          <input
            id="g-focus"
            className={field}
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            placeholder="Local food & dining"
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="g-rules">Posting requirements</label>
        <textarea
          id="g-rules"
          className={cn(field, "min-h-[110px] resize-y")}
          value={rules}
          onChange={(e) => setRules(e.target.value)}
          placeholder={"One rule per line, e.g.\nNo outside links Mon–Wed\nAdmin approval required"}
        />
        <p className="mt-1 text-xs text-muted-foreground">One rule per line.</p>
      </div>

      <div>
        <label className={label} htmlFor="g-url">Join / group link (optional)</label>
        <input
          id="g-url"
          className={field}
          value={joinUrl}
          onChange={(e) => setJoinUrl(e.target.value)}
          placeholder="https://www.facebook.com/groups/..."
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {pending && <Loader2 className="size-4 animate-spin" />}
          {initial ? "Save changes" : "Add group"}
        </button>
      </div>
    </form>
  );
}

// ─── Passcode unlock modal ───────────────────────────────────────────────────────

function UnlockModal({
  onClose,
  onUnlock,
}: {
  onClose: () => void;
  onUnlock: (key: string) => void;
}) {
  const [key, setKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const ok = await verifyKey(key);
      if (ok) {
        onUnlock(key);
      } else {
        setError("Incorrect passcode.");
      }
    });
  }

  return (
    <Modal title="Enter edit passcode" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Editing is passcode-protected. Enter the passcode to add or change groups.
        </p>
        <input
          type="password"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Passcode"
          autoFocus
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {pending && <Loader2 className="size-4 animate-spin" />}
            Unlock
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ─── Manager ──────────────────────────────────────────────────────────────────

type ModalState =
  | { kind: "unlock" }
  | { kind: "add" }
  | { kind: "edit"; group: PorchGroup }
  | null;

export function GroupsTab({ initialGroups }: { initialGroups: PorchGroup[] }) {
  const router = useRouter();
  const [editKey, setEditKey] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  // Restore an unlocked session from sessionStorage.
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) setEditKey(stored);
  }, []);

  const canEdit = editKey !== null;
  const totalReach = initialGroups.reduce((sum, g) => sum + g.memberCount, 0);

  function unlock(key: string) {
    sessionStorage.setItem(STORAGE_KEY, key);
    setEditKey(key);
    setModal(null);
  }

  function lock() {
    sessionStorage.removeItem(STORAGE_KEY);
    setEditKey(null);
  }

  function handleSubmit(input: GroupInput) {
    if (!editKey) return;
    setFormError(null);
    startTransition(async () => {
      const result =
        modal?.kind === "edit"
          ? await updateGroup(editKey, modal.group.id, input)
          : await addGroup(editKey, input);
      if (result.ok) {
        setModal(null);
        router.refresh();
      } else {
        setFormError(result.error);
      }
    });
  }

  function handleDelete(group: PorchGroup) {
    if (!editKey) return;
    if (!window.confirm(`Delete "${group.name}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deleteGroup(editKey, group.id);
      if (result.ok) router.refresh();
      else window.alert(result.error);
    });
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">
            Your Facebook groups
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Every group you post to, with its member reach, specific posting rules,
            and a direct link. Check the requirements before you post.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {canEdit ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setFormError(null);
                  setModal({ kind: "add" });
                }}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Plus className="size-4" />
                Add group
              </button>
              <button
                type="button"
                onClick={lock}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
              >
                <Lock className="size-3.5" />
                Done
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setModal({ kind: "unlock" })}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              <KeyRound className="size-3.5" />
              Edit
            </button>
          )}
        </div>
      </div>

        {/* Summary stats */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="eyebrow">Groups</p>
            <p className="mt-1 font-serif text-4xl tracking-tight text-foreground">
              {initialGroups.length}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Active in your social rotation</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="eyebrow">Combined Reach</p>
            <p className="mt-1 font-serif text-4xl tracking-tight text-foreground">
              {formatCount(totalReach)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Total members across all groups</p>
          </div>
        </div>

        {/* Groups */}
        {initialGroups.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {initialGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                canEdit={canEdit}
                onEdit={() => {
                  setFormError(null);
                  setModal({ kind: "edit", group });
                }}
                onDelete={() => handleDelete(group)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border py-16 text-center">
            <p className="text-sm text-muted-foreground">No groups yet.</p>
            {canEdit ? (
              <button
                type="button"
                onClick={() => {
                  setFormError(null);
                  setModal({ kind: "add" });
                }}
                className="mt-3 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Plus className="size-4" />
                Add your first group
              </button>
            ) : (
              <p className="mt-1 text-xs text-muted-foreground/70">
                Groups will appear here once they&apos;re added.
              </p>
            )}
          </div>
        )}

      {/* Modals */}
      {modal?.kind === "unlock" && (
        <UnlockModal onClose={() => setModal(null)} onUnlock={unlock} />
      )}
      {modal?.kind === "add" && (
        <Modal title="Add group" onClose={() => setModal(null)}>
          <GroupForm
            pending={pending}
            error={formError}
            onSubmit={handleSubmit}
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}
      {modal?.kind === "edit" && (
        <Modal title="Edit group" onClose={() => setModal(null)}>
          <GroupForm
            initial={modal.group}
            pending={pending}
            error={formError}
            onSubmit={handleSubmit}
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}
    </>
  );
}
