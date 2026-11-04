"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { site } from "@/lib/site";

type Status = "idle" | "opening" | "invalid";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-white/50 outline-none transition-colors focus:border-accent/60 focus:bg-white/[0.05]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message || !email.includes("@")) {
      setStatus("invalid");
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry — ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}\n${email}`,
    );

    setStatus("opening");
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="card p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-xs text-white/68">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-xs text-white/68">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-xs text-white/68">
            What are you building?
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="A sentence or two about the product, the timeline, and what you need help with."
            className={`${fieldClass} resize-none`}
          />
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
          <button type="submit" className="btn btn-primary group w-full sm:w-auto">
            Send message
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center justify-center gap-2 text-sm text-white/68 transition-colors hover:text-paper"
          >
            {copied ? <Check className="h-4 w-4 text-mint" /> : <Copy className="h-4 w-4" />}
            {copied ? "Email copied" : "Copy email instead"}
          </button>
        </div>

        <p
          aria-live="polite"
          className={`pt-1 text-xs leading-relaxed ${
            status === "invalid" ? "text-red-400" : "text-white/58"
          }`}
        >
          {status === "invalid"
            ? "Please add your name, a valid email, and a short message."
            : status === "opening"
              ? "Opening your email app… if nothing happens, copy the address instead."
              : "This opens your email app with the message pre-filled. No data is sent to a server."}
        </p>
      </form>
    </div>
  );
}
