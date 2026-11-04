import Link from "next/link";
import { Fragment } from "react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { HeroVisual } from "@/components/hero/hero-visual";
import { site } from "@/lib/site";

const nameParts = site.name.split(" ");
const nameLines =
  nameParts.length > 2
    ? [nameParts.slice(0, -1).join(" "), nameParts[nameParts.length - 1]]
    : [site.name];

const role = "Full-stack developer building fast, reliable products for the web.";

function Words({
  text,
  start,
  step,
  className,
}: {
  text: string;
  start: number;
  step: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <p className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="word-mask">
            <span
              className={`word-inner ${word === "fast" ? "text-accent" : ""}`}
              style={{ animationDelay: `${(start + index * step).toFixed(3)}s` }}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 md:pb-24"
    >
      {/* 3D scene */}
      <div className="absolute inset-y-0 right-0 z-0 w-full opacity-45 md:w-[64%] md:opacity-100 lg:w-[60%]">
        <HeroVisual />
      </div>

      {/* One full-width scrim instead of a panel that starts at the canvas
          edge — keeps the background continuous and still protects the copy. */}
      <div className="hero-scrim pointer-events-none absolute inset-0 z-[1]" />

      <div className="shell relative z-10 w-full">
        <div className="max-w-[680px]">
          <div className="fade-up flex flex-wrap items-center gap-3 [animation-delay:0.05s]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs text-white/80 backdrop-blur">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint" />
              Available for work
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/62">
              <MapPin className="h-3 w-3" />
              Dhaka · GMT+6
            </span>
          </div>

          <h1 className="display mt-7 text-balance">
            {nameLines.map((line, index) => (
              <span key={line} className="line-mask">
                <span
                  className="line-inner"
                  style={{ animationDelay: `${(0.1 + index * 0.12).toFixed(2)}s` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <Words
            text={role}
            start={0.36}
            step={0.014}
            className="mt-5 max-w-[36ch] text-xl leading-snug text-white/85 sm:text-2xl md:text-[1.7rem]"
          />

          <Words
            text="Three years shipping end-to-end — React and Next.js on the surface, Node and PostgreSQL underneath. I care about load times, clean architecture, and interfaces that feel alive."
            start={0.58}
            step={0.009}
            className="mt-6 max-w-[48ch] text-[0.98rem] leading-relaxed text-muted"
          />

          <div className="fade-up mt-9 flex flex-wrap items-center gap-3 [animation-delay:0.82s]">
            <Link href="/projects" className="btn btn-primary group">
              See selected work
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a href={site.resume} download className="btn btn-ghost">
              Download résumé
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 [animation-delay:0.92s]">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
              Find me
            </span>
            {site.socials.slice(0, 3).map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-sm text-white/72 transition-colors hover:text-paper"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* scene affordance */}
      <div className="fade-up pointer-events-none absolute right-8 top-28 z-10 hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65 backdrop-blur md:flex [animation-delay:1.05s]">
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
        Live scene — move your cursor
      </div>

      <div className="fade-up pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex [animation-delay:1.15s]">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/58">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
