"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/supabase/client";

type Mode = "password" | "magic";
type Status = "idle" | "loading" | "success" | "error" | "unconfigured";

export function LoginForm() {
  const [mode, setMode] = useState<Mode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isSupabaseConfigured()) {
      setStatus("unconfigured");
      setMessage(
        "Authentication isn't configured yet. Add your Supabase credentials to .env.local to enable sign-in."
      );
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      // Dynamic import keeps @supabase/ssr out of the static bundle when unconfigured
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = await createClient();

      if (mode === "magic") {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (error) throw error;
        setStatus("success");
        setMessage("Check your email — a sign-in link is on its way.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // Redirect to dashboard on success
        window.location.href = "/dashboard";
      }
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setMessage(msg);
    }
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-20">
      <Container>
        <div className="max-w-sm mx-auto">
          {/* Header */}
          <div className="mb-10">
            <p className="eyebrow mb-5">S-Tier Business Group</p>
            <h1 className="font-serif text-3xl sm:text-4xl tracking-tight">
              Sign in
            </h1>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Access your operating dashboard.
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-muted mb-8 text-sm">
            <button
              type="button"
              onClick={() => { setMode("password"); setStatus("idle"); setMessage(""); }}
              className={`flex-1 py-1.5 px-3 rounded-md transition-all font-medium ${
                mode === "password"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Password
            </button>
            <button
              type="button"
              onClick={() => { setMode("magic"); setStatus("idle"); setMessage(""); }}
              className={`flex-1 py-1.5 px-3 rounded-md transition-all font-medium ${
                mode === "magic"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Magic link
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors"
              />
            </div>

            {mode === "password" && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required={mode === "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors"
                />
              </div>
            )}

            {/* Status messages */}
            {status !== "idle" && status !== "loading" && message && (
              <div
                className={`rounded-lg px-4 py-3 text-sm leading-relaxed ${
                  status === "success"
                    ? "bg-muted text-foreground/80 border border-border"
                    : status === "unconfigured"
                    ? "bg-amber-50 text-amber-900 border border-amber-200"
                    : "bg-destructive/5 text-destructive border border-destructive/20"
                }`}
              >
                {message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-10 text-sm"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading"
                ? "Signing in…"
                : mode === "magic"
                ? "Send sign-in link"
                : "Sign in"}
            </Button>
          </form>

          {/* Footer link */}
          <p className="mt-10 text-center text-xs text-muted-foreground">
            <Link
              href="/"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Back to stierbusinessgroup.com
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
