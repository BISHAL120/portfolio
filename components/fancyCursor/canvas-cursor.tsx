"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; vx: number; vy: number };

const CONFIG = {
  friction: 0.5,
  trails: 18,
  size: 45,
  dampening: 0.25,
  tension: 0.98,
};

export default function CanvasCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // No cursor to decorate on touch devices, and no motion for people who
    // asked for less of it.
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let phase = Math.random() * Math.PI * 2;
    let lines: TrailLine[] = [];
    let frame = 0;
    let running = false;
    let initialized = false;

    class TrailLine {
      spring: number;
      friction: number;
      nodes: Point[];

      constructor(spring: number) {
        this.spring = spring + 0.1 * Math.random() - 0.02;
        this.friction = CONFIG.friction + 0.01 * Math.random() - 0.002;
        this.nodes = Array.from({ length: CONFIG.size }, () => ({
          x: pos.x,
          y: pos.y,
          vx: 0,
          vy: 0,
        }));
      }

      update() {
        let spring = this.spring;
        const head = this.nodes[0];
        head.vx += (pos.x - head.x) * spring;
        head.vy += (pos.y - head.y) * spring;

        for (let i = 0; i < this.nodes.length; i++) {
          const node = this.nodes[i];
          if (i > 0) {
            const previous = this.nodes[i - 1];
            node.vx += (previous.x - node.x) * spring;
            node.vy += (previous.y - node.y) * spring;
            node.vx += previous.vx * CONFIG.dampening;
            node.vy += previous.vy * CONFIG.dampening;
          }
          node.vx *= this.friction;
          node.vy *= this.friction;
          node.x += node.vx;
          node.y += node.vy;
          spring *= CONFIG.tension;
        }
      }

      draw() {
        const head = this.nodes[0];
        context.beginPath();
        context.moveTo(head.x, head.y);

        for (let i = 1; i < this.nodes.length - 1; i++) {
          const current = this.nodes[i];
          const next = this.nodes[i + 1];
          const midX = 0.5 * (current.x + next.x);
          const midY = 0.5 * (current.y + next.y);
          context.quadraticCurveTo(current.x, current.y, midX, midY);
        }

        const beforeLast = this.nodes[this.nodes.length - 2];
        const last = this.nodes[this.nodes.length - 1];
        context.quadraticCurveTo(beforeLast.x, beforeLast.y, last.x, last.y);
        context.stroke();
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const render = () => {
      if (!running) return;
      frame = requestAnimationFrame(render);

      context.globalCompositeOperation = "source-over";
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.globalCompositeOperation = "lighter";

      phase += 0.0015;
      const hue = 285 + Math.sin(phase) * 85;
      context.strokeStyle = `hsla(${Math.round(hue)}, 72%, 62%, 0.22)`;
      context.lineWidth = 1.2;

      for (const line of lines) {
        line.update();
        line.draw();
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      render();
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const spawn = () => {
      lines = Array.from(
        { length: CONFIG.trails },
        (_, i) => new TrailLine(0.4 + (i / CONFIG.trails) * 0.025),
      );
    };

    const onMove = (event: MouseEvent) => {
      pos.x = event.clientX;
      pos.y = event.clientY;
      if (!initialized) {
        initialized = true;
        spawn();
        start();
      }
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (initialized) start();
    };

    const onBlur = () => stop();
    const onFocus = () => {
      if (initialized) start();
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70]"
    />
  );
}
