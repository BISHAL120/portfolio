import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80svh] items-center overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,184,107,0.12),transparent_55%)]" />
      <div className="shell relative">
        <p className="eyebrow mb-6">Error 404</p>
        <h1 className="display max-w-[14ch] text-balance">
          This page shipped to the wrong address.
        </h1>
        <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-muted">
          The link is broken, the page moved, or it never existed. The good stuff
          is one click away.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <Link href="/projects" className="btn btn-ghost">
            See the work
          </Link>
        </div>
        <p className="mt-16 select-none font-mono text-[18vw] font-medium leading-none tracking-tighter text-white/[0.04] md:text-[12rem]">
          404
        </p>
      </div>
    </div>
  );
}
