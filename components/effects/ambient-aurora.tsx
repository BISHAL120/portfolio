"use client";

import { useEffect, useRef } from "react";

type Band = {
  texture: HTMLCanvasElement;
  phase: number;
  scale: number;
  alpha: number;
  orbit: number;
};

function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

/**
 * Pre-renders a soft aurora curtain at low resolution. A single blur pass over
 * hand-drawn sine strokes is much cheaper than blurring every stroke and is
 * invisible once the texture is upscaled.
 */
function makeAuroraTexture(colors: string[], seed: number) {
  const width = 600;
  const height = 350;
  const source = document.createElement("canvas");
  source.width = width;
  source.height = height;
  const ctx = source.getContext("2d")!;
  const random = seeded(seed);

  ctx.globalCompositeOperation = "lighter";

  for (const color of colors) {
    for (let line = 0; line < 14; line++) {
      const offset = line * 3.5 - 26;
      const amplitude = 13 + random() * 26;
      const frequency = ((0.7 + random() * 1.1) * Math.PI * 2) / width;
      const phase = random() * Math.PI * 2;

      ctx.beginPath();
      for (let x = 0; x <= width; x += 6) {
        const y =
          height * 0.5 +
          offset +
          Math.sin(x * frequency + phase) * amplitude +
          Math.sin(x * frequency * 2.6 + phase * 1.7) * amplitude * 0.25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.09 + random() * 0.06;
      ctx.lineWidth = 1 + random() * 1.4;
      ctx.stroke();
    }
  }

  ctx.globalAlpha = 1;

  const output = document.createElement("canvas");
  output.width = width;
  output.height = height;
  const out = output.getContext("2d")!;

  if ("filter" in out) out.filter = "blur(9px)";

  const bloom = out.createRadialGradient(
    width / 2,
    height / 2,
    0,
    width / 2,
    height / 2,
    width * 0.5,
  );
  bloom.addColorStop(0, "rgba(255, 205, 150, 0.14)");
  bloom.addColorStop(0.45, "rgba(142, 240, 200, 0.06)");
  bloom.addColorStop(1, "rgba(0,0,0,0)");
  out.fillStyle = bloom;
  out.fillRect(0, 0, width, height);
  out.drawImage(source, 0, 0);

  out.filter = "none";
  out.globalCompositeOperation = "destination-in";

  const horizontal = out.createLinearGradient(0, 0, width, 0);
  horizontal.addColorStop(0, "rgba(0,0,0,0)");
  horizontal.addColorStop(0.16, "rgba(0,0,0,1)");
  horizontal.addColorStop(0.84, "rgba(0,0,0,1)");
  horizontal.addColorStop(1, "rgba(0,0,0,0)");
  out.fillStyle = horizontal;
  out.fillRect(0, 0, width, height);

  const vertical = out.createLinearGradient(0, 0, 0, height);
  vertical.addColorStop(0, "rgba(0,0,0,0)");
  vertical.addColorStop(0.22, "rgba(0,0,0,0.9)");
  vertical.addColorStop(0.5, "rgba(0,0,0,1)");
  vertical.addColorStop(0.78, "rgba(0,0,0,0.9)");
  vertical.addColorStop(1, "rgba(0,0,0,0)");
  out.fillStyle = vertical;
  out.fillRect(0, 0, width, height);

  return output;
}

/**
 * A looping ambient aurora. Bands orbit slowly on sine/cosine paths with a
 * 26s cycle, so the light drifts continuously and seamlessly regardless of
 * scroll. When a band passes behind a card, the card picks up the liquid-glass
 * treatment for that moment.
 */
export function AmbientAurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const bands: Band[] = [
      {
        texture: makeAuroraTexture(["#ffb86b", "#8ef0c8", "#f2efe7"], 7),
        phase: 0,
        scale: 1.15,
        alpha: 0.5,
        orbit: 0.26,
      },
      {
        texture: makeAuroraTexture(["#8ef0c8", "#9fb4ff"], 31),
        phase: 1.7,
        scale: 0.95,
        alpha: 0.44,
        orbit: 0.3,
      },
      {
        texture: makeAuroraTexture(["#ffb86b", "#f2efe7"], 83),
        phase: 3.4,
        scale: 1.3,
        alpha: 0.46,
        orbit: 0.24,
      },
      {
        texture: makeAuroraTexture(["#9fb4ff", "#8ef0c8"], 149),
        phase: 5.1,
        scale: 1,
        alpha: 0.38,
        orbit: 0.32,
      },
    ];

    let width = window.innerWidth;
    let height = window.innerHeight;
    let cards: HTMLElement[] = [];
    let frame = 0;
    let ticks = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      // Soft light needs far less resolution than text.
      const quality = width < 768 ? 0.4 : 0.45;
      canvas.width = Math.floor(width * quality);
      canvas.height = Math.floor(height * quality);
      ctx.setTransform(quality, 0, 0, quality, 0, 0);
    };

    const refreshCards = () => {
      cards = Array.from(
        document.querySelectorAll<HTMLElement>(".card, [data-liquid]"),
      );
    };

    const clearGlass = (element: HTMLElement) => {
      if (!element.classList.contains("liquid-active")) return;
      element.style.setProperty("--liquid-opacity", "0");
      element.classList.remove("liquid-active");
    };

    const bandPosition = (band: Band, time: number) => {
      const p = (time / 26) * Math.PI * 2 + band.phase;
      return {
        x: width * (0.5 + Math.cos(p * 0.8 + band.phase) * 0.16),
        y:
          height * 0.5 +
          height * band.orbit * Math.sin(p) +
          height * 0.035 * Math.sin(p * 2 + band.phase),
        scale: 1 + 0.05 * Math.sin(p * 1.4 + band.phase),
        breathe: 0.82 + 0.18 * Math.sin(p * 1.6 + band.phase),
      };
    };

    const updateGlass = (time: number) => {
      const candidates: {
        element: HTMLElement;
        strength: number;
        y: number;
      }[] = [];

      for (const element of cards) {
        if (!element.isConnected) {
          clearGlass(element);
          continue;
        }
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -140 || rect.top > height + 140 || rect.width < 30) {
          clearGlass(element);
          continue;
        }

        const centerY = rect.top + rect.height / 2;
        let strength = 0;
        let bandY = centerY;

        for (const band of bands) {
          const position = bandPosition(band, time);
          const distance = Math.abs(position.y - centerY);
          const value =
            Math.max(0, 1 - distance / (rect.height / 2 + 240)) * band.alpha;
          if (value > strength) {
            strength = value;
            bandY = position.y;
          }
        }

        candidates.push({ element, strength, y: bandY - rect.top });
      }

      candidates.sort((a, b) => b.strength - a.strength);
      const keep = new Set(
        candidates
          .filter((candidate) => candidate.strength > 0.1)
          .slice(0, 2)
          .map((candidate) => candidate.element),
      );

      for (const candidate of candidates) {
        if (keep.has(candidate.element)) {
          const { element, strength, y } = candidate;
          element.style.setProperty("--liquid-x", "50%");
          element.style.setProperty("--liquid-y", `${y.toFixed(1)}px`);
          element.style.setProperty(
            "--liquid-opacity",
            (0.12 + Math.min(0.4, strength) * 0.6).toFixed(3),
          );
          element.classList.add("liquid-active");
        } else {
          clearGlass(candidate.element);
        }
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const band of bands) {
        const position = bandPosition(band, time);
        const w = width * 1.2 * band.scale * position.scale;
        const h = w * 0.58;
        ctx.globalAlpha = band.alpha * position.breathe;
        ctx.drawImage(
          band.texture,
          position.x - w / 2,
          position.y - h / 2,
          w,
          h,
        );
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const animate = (now: number) => {
      frame = requestAnimationFrame(animate);
      if (document.hidden) return;

      ticks++;
      // Ambient light reads fine at ~30fps; it halves paint cost.
      if (ticks % 2 !== 0) return;

      draw(now / 1000);
      if (ticks % 8 === 0) updateGlass(now / 1000);
    };

    resize();
    refreshCards();

    let mutationTimer = 0;
    const observer = new MutationObserver(() => {
      window.clearTimeout(mutationTimer);
      mutationTimer = window.setTimeout(refreshCards, 350);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const onResize = () => {
      resize();
      refreshCards();
      if (reduceMotion) draw(0);
    };
    window.addEventListener("resize", onResize);

    if (reduceMotion) {
      draw(0);
    } else {
      frame = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(mutationTimer);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      for (const element of cards) {
        element.classList.remove("liquid-active");
        element.style.removeProperty("--liquid-opacity");
        element.style.removeProperty("--liquid-x");
        element.style.removeProperty("--liquid-y");
      }
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="aura-field" />;
}
