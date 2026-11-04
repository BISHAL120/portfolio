import type { Metadata } from "next";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about full-stack roles, freelance projects or a portfolio walkthrough. Based in Dhaka, working remotely worldwide.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pb-24 pt-32 md:pt-40">
      <div className="shell grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Contact</p>
            <h1 className="display max-w-[12ch] text-balance">
              Let&apos;s build something.
            </h1>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-muted">
              I&apos;m open to full-stack roles and select freelance work. Tell
              me about the product, the constraints, and the timeline — I reply
              within a day.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 space-y-6">
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center justify-between gap-4 border-b border-white/10 pb-5"
            >
              <div>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/58">
                  Email
                </p>
                <p className="text-lg tracking-tight text-paper group-hover:text-accent">
                  {site.email}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-white/62 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-accent" />
                <div>
                  <p className="text-sm text-paper">{site.location}</p>
                  <p className="mt-1 text-xs text-white/62">GMT+6 · remote friendly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-accent" />
                <div>
                  <p className="text-sm text-paper">Replies in ~24h</p>
                  <p className="mt-1 text-xs text-white/62">Mon–Fri, 10:00–19:00</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/58">
                Elsewhere
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                    className="link-underline text-sm text-white/72 hover:text-paper"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-mint/20 bg-mint/[0.04] px-4 py-3">
              <p className="flex items-center gap-2 text-xs text-mint/90">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint" />
                {site.availability}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
