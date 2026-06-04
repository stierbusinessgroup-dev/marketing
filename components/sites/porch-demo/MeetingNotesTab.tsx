"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

// ─── Agenda ────────────────────────────────────────────────────────────────────

const AGENDA_ITEMS = [
  "Review foundational plan & S-Tier platform overview",
  "Dining-room launch timeline — 14-day countdown & milestones",
  "Marketing priorities — kanban walkthrough",
  "Catering pipeline — upcoming events & revenue",
  "Next steps & action items",
];

// ─── Foundational plan bullets ────────────────────────────────────────────────

const PLAN_BULLETS = [
  "Inventory & prep agent — Lisa's kitchen stays stocked and the line never misses a par item. The agent flags lows, logs waste, and builds tomorrow's prep list automatically.",
  "Catering pipeline — every inquiry, confirmed event, and revenue figure in one place. No more tracking bookings in your head or on a notepad.",
  "Marketing board — from idea to live: grand-opening teasers, beer & wine pairing nights, Press Democrat pitches — all moving through one clean kanban.",
  "Dining-room launch tracker — 12 milestones across kitchen, front of house, marketing, and permits. One view to know exactly where June 18 stands.",
];

// ─── Chip / item component ────────────────────────────────────────────────────

function Chip({ text, onRemove }: { text: string; onRemove: () => void }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-border bg-background px-3.5 py-2.5 group shadow-sm">
      <p className="text-sm text-foreground/85 flex-1 leading-relaxed">{text}</p>
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 mt-0.5 text-muted-foreground/40 hover:text-muted-foreground transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Remove"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

// ─── Live input + list ────────────────────────────────────────────────────────

function LiveList({
  label,
  placeholder,
  items,
  onAdd,
  onRemove,
  accentClass,
}: {
  label: string;
  placeholder: string;
  items: string[];
  onAdd: (val: string) => void;
  onRemove: (i: number) => void;
  accentClass?: string;
}) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function commit() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setDraft("");
    inputRef.current?.focus();
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
    }
  }

  return (
    <div className="space-y-3">
      <p className={cn("text-sm font-semibold", accentClass ?? "text-foreground")}>{label}</p>

      {/* Input row */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-input bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/40"
        />
        <button
          type="button"
          onClick={commit}
          disabled={!draft.trim()}
          className={cn(
            "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            "disabled:opacity-40 disabled:pointer-events-none"
          )}
        >
          Add
        </button>
      </div>

      {/* Items */}
      {items.length > 0 ? (
        <div className="space-y-2">
          {items.map((item, i) => (
            <Chip key={i} text={item} onRemove={() => onRemove(i)} />
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground/50 italic py-2">
          Nothing yet &mdash; type above and press Enter
        </p>
      )}
    </div>
  );
}

// ─── Exported tab ─────────────────────────────────────────────────────────────

export function MeetingNotesTab() {
  const [parkingLot, setParkingLot] = useState<string[]>([]);
  const [lisaActions, setLisaActions] = useState<string[]>([]);
  const [stierActions, setStierActions] = useState<string[]>([]);

  function removeFrom(list: string[], setList: (v: string[]) => void, index: number) {
    setList(list.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-12 max-w-3xl">

      {/* Today's Agenda */}
      <section>
        <p className="eyebrow mb-4">Today&apos;s Agenda</p>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {AGENDA_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
            >
              <span className="shrink-0 size-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-foreground/85 leading-relaxed pt-0.5">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Foundational Plan Recap */}
      <section>
        <p className="eyebrow mb-2">Foundational Plan Recap</p>
        <p className="text-sm text-muted-foreground mb-4">
          What S-Tier is building for The Porch Kitchen &mdash; <span className="font-semibold text-foreground/70">$250/mo founding rate</span>
        </p>
        <div className="space-y-3">
          {PLAN_BULLETS.map((bullet, i) => (
            <div
              key={i}
              className="flex items-start gap-3.5 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4"
            >
              <span className="shrink-0 size-1.5 rounded-full bg-amber-500 mt-2" />
              <p className="text-sm text-amber-900 leading-relaxed">{bullet}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Idea Parking Lot */}
      <section>
        <p className="eyebrow mb-2">Idea Parking Lot</p>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Capture any idea that comes up mid-meeting. Type it and press Enter &mdash; it appears instantly.
        </p>
        <div className="rounded-xl border border-border bg-card p-5">
          <LiveList
            label="Ideas"
            placeholder="Type an idea and press Enter..."
            items={parkingLot}
            onAdd={(v) => setParkingLot((prev) => [...prev, v])}
            onRemove={(i) => removeFrom(parkingLot, setParkingLot, i)}
          />
        </div>
      </section>

      {/* Action Items */}
      <section>
        <p className="eyebrow mb-2">Action Items</p>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Capture who&apos;s doing what before leaving the meeting.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Lisa */}
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-5">
            <LiveList
              label="Lisa"
              placeholder="Lisa's next step..."
              items={lisaActions}
              onAdd={(v) => setLisaActions((prev) => [...prev, v])}
              onRemove={(i) => removeFrom(lisaActions, setLisaActions, i)}
              accentClass="text-sky-900"
            />
          </div>
          {/* S-Tier */}
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
            <LiveList
              label="S-Tier"
              placeholder="S-Tier's next step..."
              items={stierActions}
              onAdd={(v) => setStierActions((prev) => [...prev, v])}
              onRemove={(i) => removeFrom(stierActions, setStierActions, i)}
              accentClass="text-violet-900"
            />
          </div>
        </div>
      </section>

      {/* Session note */}
      <p className="text-xs text-muted-foreground/50 pb-4">
        Items are session-only &mdash; a page refresh clears them. Screenshot or copy before closing.
      </p>
    </div>
  );
}
