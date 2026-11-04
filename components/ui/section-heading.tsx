import type { ReactNode } from "react";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
};

export function SectionHeading({
  index,
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-xs text-accent">{index}</span>
        <span className="h-px w-8 bg-white/20" />
        <span className="eyebrow">{label}</span>
      </div>
      <h2 className="h2 max-w-[22ch] text-balance">{title}</h2>
      {description ? (
        <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
