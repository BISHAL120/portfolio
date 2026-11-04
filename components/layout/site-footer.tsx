import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-[1] border-t border-white/[0.07] bg-[#08080a]">
      <div className="shell py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">Say hello</p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline inline-block text-2xl font-medium tracking-tight text-paper sm:text-3xl"
            >
              {site.email}
            </a>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  className="link-underline hover:text-paper"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-between gap-8 md:flex-col md:items-end">
            <p className="max-w-[24ch] text-sm leading-relaxed text-muted">
              {site.location} · {site.timezone}
              <br />
              Working remotely with teams worldwide.
            </p>
            <Link
              href="/#top"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-paper transition-colors hover:border-accent/60 hover:text-accent"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-xs text-white/58 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-mono">
            Built with Next.js · Three.js · TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
