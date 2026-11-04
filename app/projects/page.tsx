import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ProjectCard } from "@/components/work/project-card";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected full-stack projects: commerce storefronts, dashboards, booking flows and WebGL experiments built with Next.js, Node.js and PostgreSQL.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="pb-24 pt-32 md:pt-40">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-5">Index — 2023 to 2026</p>
          <h1 className="display max-w-[16ch] text-balance">Selected work.</h1>
          <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-muted">
            Products I&apos;ve designed, built and shipped end to end. Live
            links where the project is public; client work is available as a
            walkthrough on request.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/62">
            <span>{projects.length} projects</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span>Full-stack</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span>2023 — 2026</span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={(index % 2) * 0.08}
              className={index === 0 ? "md:col-span-2" : undefined}
            >
              <ProjectCard
                project={project}
                index={index}
                large={index === 0}
                priority={index < 2}
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="card flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center md:p-8">
            <div>
              <p className="text-lg font-medium tracking-tight text-paper">
                Want the full case studies?
              </p>
              <p className="mt-1.5 text-sm text-muted">
                I can walk you through architecture, trade-offs and what I would
                do differently.
              </p>
            </div>
            <a
              href="mailto:monerulmd5@gmail.com?subject=Portfolio%20walkthrough"
              className="btn btn-primary shrink-0"
            >
              Request a walkthrough
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
