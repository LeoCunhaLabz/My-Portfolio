"use client"

import { useId, useState, type FormEvent } from "react";
import { Card } from "@/components/Card";
import type { NewsletterStatus } from "@/app/api/newsletter/route";

type FormState = "idle" | "sending" | NewsletterStatus | "too_many_attempts";

const messages: Partial<Record<FormState, string>> = {
  pending: "Almost done. Check your inbox and click the link to confirm.",
  already_subscribed: "You're already subscribed.",
  invalid_email: "Enter a valid email address.",
  too_many_attempts: "Too many attempts. Please try again in a few minutes.",
  error: "Something went wrong, so you weren't subscribed. Please try again later.",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sign-up for new posts by email, at the end of each post and of /blog (#6).
// /api/newsletter passes the address to Brevo, which asks the reader to confirm it.
export const NewsletterForm = () => {
  const [state, setState] = useState<FormState>("idle");
  const id = useId();
  const headingId = `${id}-heading`;
  const emailId = `${id}-email`;
  const messageId = `${id}-message`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!emailPattern.test(email)) {
      setState("invalid_email");
      return;
    }

    setState("sending");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, website: data.get("website") ?? "" }),
      });
      // The Vercel firewall answers 429 on its own when one address sends too many.
      if (response.status === 429) {
        setState("too_many_attempts");
        return;
      }
      const { status } = (await response.json()) as { status?: NewsletterStatus };
      setState(status && status in messages ? status : "error");
      if (status === "pending") form.reset();
    } catch {
      setState("error");
    }
  }

  const sending = state === "sending";
  const isError = state === "invalid_email" || state === "too_many_attempts" || state === "error";

  return (
    <Card className="p-6 md:p-8">
      <section aria-labelledby={headingId}>
        <h2 id={headingId} className="font-serif text-2xl md:text-3xl">
          Get new posts by email
        </h2>
        <p className="mt-3 leading-relaxed text-white/70">
          One email when I publish a new post. Nothing else, and you can unsubscribe anytime.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6">
          <label htmlFor={emailId} className="block text-sm font-semibold text-white/80">
            Email address
          </label>
          <div className="mt-2 flex flex-col gap-3 md:flex-row">
            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              aria-invalid={state === "invalid_email"}
              aria-describedby={messageId}
              className="h-12 w-full rounded-xl border border-white/15 bg-gray-900/60 px-4 text-white placeholder:text-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 md:flex-1"
            />
            <button
              type="submit"
              disabled={sending}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 font-semibold text-gray-900 transition-colors hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 disabled:cursor-wait disabled:opacity-70"
            >
              {sending ? "Subscribing…" : "Subscribe"}
            </button>
          </div>

          {/* Left empty by people, filled in by bots. Hidden from sight, keyboards and screen readers. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Website
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <p
            id={messageId}
            role="status"
            className={`mt-3 min-h-6 text-sm ${isError ? "text-rose-300" : "text-emerald-300"}`}
          >
            {messages[state]}
          </p>
        </form>

        <p className="mt-4 text-sm leading-relaxed text-white/60">
          You&apos;ll get a confirmation email first. Your address is kept by Brevo, my email provider, and used only
          for these emails. Prefer RSS?{" "}
          <a
            href="/blog/feed.xml"
            className="rounded font-semibold text-white/80 underline underline-offset-4 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            Follow the feed
          </a>
          .
        </p>
      </section>
    </Card>
  );
};
