import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/site";
import { TiltCard } from "@/components/ui/tilt-card";

type ProjectCardProps = {
  project: Project;
  index: number;
  priority?: boolean;
  large?: boolean;
};

export function ProjectCard({
  project,
  index,
  priority = false,
  large = false,
}: ProjectCardProps) {
  const inner = (
    <div className="card group relative h-full overflow-hidden">
      <div
        className={`relative overflow-hidden ${
          large ? "aspect-[16/9]" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={project.image}
          alt={`${project.title} — ${project.tagline}`}
          fill
          priority={priority}
          sizes={large ? "(max-width: 768px) 100vw, 1100px" : "(max-width: 768px) 100vw, 45vw"}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/20 to-transparent opacity-90" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full border border-white/20 bg-[#0a0a0c] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white">
            {project.kind}
          </span>
        </div>
        <span className="absolute right-4 top-4 font-mono text-[11px] text-white/68">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative flex flex-col gap-4 p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-medium tracking-tight text-paper md:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{project.tagline}</p>
          </div>
          <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-white/72 transition-all duration-500 group-hover:border-accent/60 group-hover:bg-accent group-hover:text-black">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-white/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <TiltCard className="h-full">
      {project.href ? (
        <Link
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} — open live site`}
          className="block h-full"
        >
          {inner}
        </Link>
      ) : (
        <div className="h-full cursor-default">{inner}</div>
      )}
    </TiltCard>
  );
}
