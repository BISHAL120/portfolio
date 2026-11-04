type MarqueeProps = {
  items: readonly string[];
  className?: string;
};

export function StackMarquee({ items, className = "" }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div
      className={`marquee relative flex overflow-hidden border-y border-white/[0.06] py-4 ${className}`}
    >
      <div className="marquee-track items-center gap-10 pr-10">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= items.length}
            className="flex shrink-0 items-center gap-10 font-mono text-sm tracking-tight text-white/65"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
