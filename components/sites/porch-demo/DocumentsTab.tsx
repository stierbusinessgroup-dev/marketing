"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { accountantDocs } from "@/lib/accountant-docs";
import type { Components } from "react-markdown";

// ─── Markdown component map ────────────────────────────────────────────────────

const mdComponents: Components = {
  h1: ({ children, ...props }) => (
    <h1
      className="font-serif text-2xl sm:text-3xl tracking-tight text-foreground mt-8 mb-4 first:mt-0 pb-2 border-b border-border"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="font-serif text-xl sm:text-2xl tracking-tight text-foreground mt-8 mb-3"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="font-serif text-lg sm:text-xl tracking-tight text-foreground mt-6 mb-2"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="text-sm sm:text-base leading-relaxed text-foreground/85 mb-4"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="list-disc list-outside pl-5 mb-4 space-y-1.5 text-sm sm:text-base text-foreground/85"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="list-decimal list-outside pl-5 mb-4 space-y-1.5 text-sm sm:text-base text-foreground/85"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-5 rounded-xl border border-border">
      <table
        className="w-full text-sm border-collapse"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-muted/50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="text-left px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground border-b border-border whitespace-nowrap"
      {...props}
    >
      {children}
    </th>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="divide-y divide-border" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="hover:bg-muted/20 transition-colors" {...props}>
      {children}
    </tr>
  ),
  td: ({ children, ...props }) => (
    <td
      className="px-4 py-3 text-sm text-foreground/80 align-top"
      {...props}
    >
      {children}
    </td>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-amber-400 bg-amber-50 px-5 py-3 rounded-r-lg my-4 text-sm text-amber-900 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-foreground/75" {...props}>
      {children}
    </em>
  ),
  hr: ({ ...props }) => (
    <hr className="my-8 border-border" {...props} />
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground/80"
      {...props}
    >
      {children}
    </code>
  ),
};

// ─── Exported tab ─────────────────────────────────────────────────────────────

export function DocumentsTab() {
  const [activeKey, setActiveKey] = useState<string>(accountantDocs[0].key);

  const activeDoc = accountantDocs.find((d) => d.key === activeKey) ?? accountantDocs[0];

  return (
    <div className="max-w-3xl space-y-6">
      {/* Intro line */}
      <p className="text-sm text-muted-foreground">
        Working documents for today&apos;s discussion &mdash; drafts, for review.
      </p>

      {/* Sub-document switcher */}
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Document selector"
      >
        {accountantDocs.map((doc) => (
          <button
            key={doc.key}
            type="button"
            role="tab"
            aria-selected={activeKey === doc.key}
            onClick={() => setActiveKey(doc.key)}
            className={cn(
              "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              activeKey === doc.key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {doc.label}
          </button>
        ))}
      </div>

      {/* Document body */}
      <div className="rounded-xl border border-border bg-card px-6 sm:px-10 py-8 shadow-sm">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={mdComponents}
        >
          {activeDoc.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
