import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/work/project-card";
import { TerminalWindow } from "@/components/home/terminal";
import { featuredProjects, projects, site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="border-t border-white/[0.06] py-24 md:py-32">
      <div className="shell grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="min-w-0">
          <SectionHeading
            index="01"
            label="About"
            title={
              <>
                Three years of shipping,
                <br className="hidden sm:block" /> still obsessed with the
                details.
              </>
            }
          />
          <Reveal className="space-y-5 text-[1.02rem] leading-relaxed text-white/80">
            <p>
              I&apos;m Bishal, a full-stack developer based in Dhaka. For the
              last three years I&apos;ve built and shipped web products for
              clients and small teams — storefronts, dashboards, admin panels,
              and the APIs behind them.
            </p>
            <p>
              Most of my work is Next.js on the front and Node with PostgreSQL
              on the back. I like boring, observable architecture, server
              components by default, and client-side JavaScript only where
              interaction actually needs it.
            </p>
            <p>
              When I&apos;m not on client work I&apos;m usually profiling
              something, experimenting with WebGL, or rebuilding this site for
              the fourth time.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              ["3+ years", "shipping production apps"],
              ["End-to-end", "UI, API, database, deploy"],
              ["GMT+6", "remote-friendly hours"],
            ].map(([stat, label]) => (
              <div key={stat} className="border-t border-white/10 pt-4">
                <p className="text-lg font-medium tracking-tight text-paper">
                  {stat}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{label}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.15} className="min-w-0">
          <TerminalWindow />

          <div
            data-liquid
            className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/62">
              Résumé
            </span>
            <a
              href={site.resume}
              download
              className="inline-flex items-center gap-1.5 text-sm text-paper hover:text-accent"
            >
              PDF, updated 2026
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="border-t border-white/[0.06] py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            index="02"
            label="Capabilities"
            title={
              <>
                Tools I reach for,
                <br className="hidden sm:block" /> and why.
              </>
            }
          />
          <Reveal delay={0.1} className="mb-12 max-w-[34ch] md:mb-16">
            <p className="text-sm leading-relaxed text-muted">
              A practical stack, not a logo wall. I go deep on the pieces that
              decide whether a product is fast, maintainable and pleasant to
              use.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.06}>
              <div className="card h-full p-5 transition-colors duration-500 hover:border-white/20 md:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-sm font-medium tracking-tight text-paper">
                    {group.title}
                  </h3>
                  <span className="font-mono text-[10px] text-white/50">
                    0{i + 1}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[13px] leading-snug text-white/72"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkPreview() {
  return (
    <section id="work" className="border-t border-white/[0.06] py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            index="03"
            label="Selected work"
            title={
              <>
                Products, not
                <br className="hidden sm:block" /> screenshots.
              </>
            }
          />
          <Link
            href="/projects"
            className="group mb-12 inline-flex items-center gap-2 text-sm text-white/72 hover:text-paper md:mb-16"
          >
            All {projects.length} projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="md:col-span-2">
            <ProjectCard project={featuredProjects[0]} index={0} large priority />
          </Reveal>
          {featuredProjects.slice(1).map((project, i) => (
            <Reveal key={project.slug} delay={0.08 * (i + 1)}>
              <ProjectCard project={project} index={i + 1} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 md:col-span-2">
          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 sm:flex-row sm:items-center">
            <p className="text-sm text-white/68">
              Client projects without a public link: available as a walkthrough
              on request.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-paper"
            >
              Ask for the tour
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Principles() {
  return (
    <section className="border-t border-white/[0.06] py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="04"
          label="How I work"
          title="Opinions, loosely held."
        />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] md:grid-cols-3">
          {site.principles.map((principle) => (
            <Reveal key={principle.number} className="bg-[#0a0a0c]">
              <div className="flex h-full flex-col gap-6 p-6 md:p-8">
                <span className="font-mono text-xs text-accent">
                  {principle.number}
                </span>
                <div className="mt-auto">
                  <h3 className="text-lg font-medium tracking-tight text-paper">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {principle.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,184,107,0.14),transparent_60%)]" />
      <div className="shell relative">
        <Reveal>
          <p className="eyebrow mb-6">Next</p>
          <h2 className="display max-w-[18ch] text-balance">
            Have a product that needs shipping?
          </h2>
          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-muted">
            I&apos;m open to full-stack roles and select freelance work. Tell me
            what you&apos;re building — I&apos;ll reply within a day.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn btn-primary group">
              Start a conversation
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a href={`mailto:${site.email}`} className="btn btn-ghost">
              {site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
