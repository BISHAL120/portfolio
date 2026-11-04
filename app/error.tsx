"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70svh] items-center pt-24">
      <div className="shell">
        <p className="eyebrow mb-5">Something broke</p>
        <h1 className="display max-w-[16ch] text-balance">
          That wasn&apos;t supposed to happen.
        </h1>
        <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-muted">
          An unexpected error interrupted this page. Try again — if it keeps
          happening, email me and I&apos;ll fix it.
        </p>
        <button onClick={reset} className="btn btn-primary mt-8">
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
