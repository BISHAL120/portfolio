"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { SceneBoundary } from "@/components/three/scene-boundary";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => null,
});

function SceneFallback({ label }: { label?: string }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
    >
      <div className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,184,107,0.16),rgba(142,240,200,0.06)_45%,transparent_70%)] blur-2xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <div className="absolute bottom-[18%] left-1/2 h-px w-[56%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      {label ? (
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
          {label}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Placeholder shown while the three.js chunk is downloading and the first
 * frame is being prepared. It mirrors the desk composition so the swap to the
 * real scene doesn't jump.
 */
function SceneSkeleton() {
  return (
    <div
      aria-hidden="true"
      data-scene-skeleton=""
      className="absolute inset-0 overflow-hidden"
    >
      <div className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,184,107,0.1),rgba(142,240,200,0.04)_45%,transparent_70%)] blur-2xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />

      <div className="absolute left-1/2 top-[47%] w-[64%] max-w-[520px] -translate-x-1/2 -translate-y-1/2">
        {/* monitor */}
        <div className="skeleton-shimmer relative mx-auto aspect-[16/10] w-[74%] overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.035]">
          <div className="absolute inset-[7%] rounded-md bg-white/[0.025]" />
          <div className="absolute left-[14%] top-[20%] h-1.5 w-[46%] rounded-full bg-white/[0.06]" />
          <div className="absolute left-[14%] top-[30%] h-1.5 w-[62%] rounded-full bg-white/[0.05]" />
          <div className="absolute left-[14%] top-[40%] h-1.5 w-[38%] rounded-full bg-white/[0.05]" />
          <div className="absolute left-[14%] top-[50%] h-1.5 w-[54%] rounded-full bg-white/[0.05]" />
        </div>
        {/* stand */}
        <div className="mx-auto mt-3 h-2.5 w-14 rounded-full bg-white/[0.05]" />
        {/* desk */}
        <div className="mt-4 flex items-end justify-between gap-4">
          <div className="h-16 w-12 rounded-xl bg-white/[0.045]" />
          <div className="h-3 flex-1 rounded-full bg-white/[0.05]" />
          <div className="h-10 w-14 rounded-2xl bg-white/[0.045]" />
        </div>
      </div>

      <p className="absolute bottom-[16%] left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/65">
        <span className="pulse-dot h-1 w-1 rounded-full bg-accent/70" />
        Preparing scene
      </p>
    </div>
  );
}

function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [skeletonGone, setSkeletonGone] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(motion.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    motion.addEventListener("change", onChange);

    if (!webglAvailable()) {
      setSupported(false);
      return () => motion.removeEventListener("change", onChange);
    }

    // Paint the hero copy first; the scene is decoration and must never
    // compete with the largest contentful paint.
    const handle = window.setTimeout(() => setSupported(true), 900);

    return () => {
      motion.removeEventListener("change", onChange);
      window.clearTimeout(handle);
    };
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(node);

    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const handleReady = useCallback(() => setReady(true), []);

  // Let the scene fade in before dropping the skeleton from the DOM.
  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => setSkeletonGone(true), 900);
    return () => window.clearTimeout(timer);
  }, [ready]);

  const showFallback = failed || supported === false;

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      {showFallback ? (
        <SceneFallback label={supported === false ? "Static view" : undefined} />
      ) : (
        <>
          <SceneFallback />
          {!skeletonGone ? (
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                ready ? "opacity-0" : "opacity-100"
              }`}
            >
              <SceneSkeleton />
            </div>
          ) : null}

          {supported ? (
            <div
              className={`absolute inset-0 transition-opacity duration-1000 ${
                ready ? "opacity-100" : "opacity-0"
              }`}
            >
              <SceneBoundary
                onError={() => setFailed(true)}
                fallback={<SceneFallback />}
              >
                <HeroScene paused={paused} reduced={reduced} onReady={handleReady} />
              </SceneBoundary>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
