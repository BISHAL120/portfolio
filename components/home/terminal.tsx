"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

type Segment = { text: string; className: string };
type Line = { segments: Segment[]; gapBefore?: boolean };

function jsonLine(key: string, value: string, comma = ","): Line {
  return {
    segments: [
      { text: `  "${key}": `, className: "text-white/65" },
      { text: value, className: "text-mint/90" },
      { text: comma, className: "text-white/65" },
    ],
  };
}

function buildLines(): Line[] {
  return [
    {
      segments: [
        { text: "➜ ", className: "text-mint" },
        { text: "whoami", className: "text-white/62" },
      ],
    },
    {
      segments: [
        {
          text: site.name.toLowerCase().replaceAll(" ", "-"),
          className: "text-white/80",
        },
      ],
    },
    {
      gapBefore: true,
      segments: [
        { text: "➜ ", className: "text-mint" },
        { text: "cat profile.json", className: "text-white/62" },
      ],
    },
    { segments: [{ text: "{", className: "text-white/80" }] },
    jsonLine("name", `"${site.name}"`),
    jsonLine("role", `"${site.role.toLowerCase()}"`),
    jsonLine("location", `"${site.location.toLowerCase()}"`),
    jsonLine("timezone", `"${site.timezone}"`),
    jsonLine("focus", `["next", "node", "pg"]`),
    jsonLine("status", `"open to work"`),
    { segments: [{ text: "}", className: "text-white/80" }] },
    {
      gapBefore: true,
      segments: [
        { text: "➜ ", className: "text-mint" },
        { text: "ls principles/", className: "text-white/62" },
      ],
    },
    {
      segments: [
        {
          text: "ship-small  performance  accessibility",
          className: "text-white/80",
        },
      ],
    },
    {
      gapBefore: true,
      segments: [{ text: "➜ ", className: "text-mint" }],
    },
  ];
}

export function TerminalWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const lines = useMemo(buildLines, []);

  const characters = useMemo(() => {
    const out: { char: string; className: string; line: number }[] = [];
    lines.forEach((line, lineIndex) => {
      line.segments.forEach((segment) => {
        for (const char of segment.text) {
          out.push({ char, className: segment.className, line: lineIndex });
        }
      });
    });
    return out;
  }, [lines]);

  const plainText = useMemo(
    () => lines.map((line) => line.segments.map((s) => s.text).join("")).join("\n"),
    [lines],
  );

  const [started, setStarted] = useState(false);
  const [typed, setTyped] = useState(0);
  const total = characters.length;

  // Wait for the card's reveal animation before the typing starts.
  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setTyped(total);
      setStarted(true);
      return;
    }
    const timer = window.setTimeout(() => setStarted(true), 900);
    return () => window.clearTimeout(timer);
  }, [inView, reduceMotion, total]);

  useEffect(() => {
    if (!started || reduceMotion || typed >= total) return;

    const previous = characters[typed - 1];
    const next = characters[typed];
    const delay =
      typed === 0
        ? 240
        : previous && next && previous.line !== next.line
          ? 150
          : 6;

    const timer = window.setTimeout(
      () => setTyped((value) => Math.min(value + 1, total)),
      delay,
    );
    return () => window.clearTimeout(timer);
  }, [started, typed, total, reduceMotion, characters]);

  // Render only the characters typed so far, grouped by colour.
  let remaining = typed;
  const rendered = lines.map((line) => {
    const segments: Segment[] = [];
    for (const segment of line.segments) {
      if (remaining <= 0) break;
      const text = segment.text.slice(0, remaining);
      remaining -= text.length;
      if (text) segments.push({ text, className: segment.className });
    }
    return segments;
  });

  const cursorLine =
    typed === 0 ? 0 : (characters[Math.min(typed, total) - 1]?.line ?? lines.length - 1);

  const lineMarkup = (
    line: Line,
    segments: Segment[],
    key: number,
    showCursor = false,
  ) => (
    <div key={key} className={`whitespace-pre ${line.gapBefore ? "mt-4" : ""}`}>
      {segments.map((segment, index) => (
        <span key={index} className={segment.className}>
          {segment.text}
        </span>
      ))}
      {showCursor ? <span className="terminal-cursor" /> : null}
    </div>
  );

  return (
    <div ref={ref} className="card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#8ef0c8]/80" />
        <span className="ml-3 font-mono text-[11px] text-white/58">
          bishal@portfolio — zsh
        </span>
      </div>

      <div className="grid overflow-x-auto p-4 font-mono text-[10.5px] leading-relaxed min-[360px]:text-[11px] sm:p-6 sm:text-[12.5px]">
        <span className="sr-only">{plainText}</span>

        {/* Invisible full text reserves the final height, so typing never
            shifts the layout around it. */}
        <div aria-hidden="true" className="invisible col-start-1 row-start-1">
          {lines.map((line, index) =>
            lineMarkup(line, line.segments, index),
          )}
        </div>

        <div aria-hidden="true" className="col-start-1 row-start-1">
          {lines.map((line, index) => {
            const segments = rendered[index];
            const visible = segments.length > 0;
            if (!visible && index !== cursorLine) return null;
            return lineMarkup(line, segments, index, index === cursorLine);
          })}
        </div>
      </div>
    </div>
  );
}
