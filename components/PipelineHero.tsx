"use client";

import { useEffect, useRef } from "react";

/**
 * Live data-pipeline hero. Dependency-free canvas: labeled packets flow
 * source → ingest → warehouse → serve along bezier rails; nodes pulse on
 * arrival; the scene parallaxes toward the cursor. Decorative (aria-hidden).
 * Reduced-motion renders one static frame. Pauses when the tab is hidden.
 */

const NODES = [
  { key: "source", label: "source", fx: 0.36, fy: 0.16 },
  { key: "ingest", label: "ingest", fx: 0.55, fy: 0.52 },
  { key: "warehouse", label: "warehouse", fx: 0.76, fy: 0.2 },
  { key: "serve", label: "serve", fx: 0.94, fy: 0.5 },
] as const;

const TAGS = ["10-K", "XBRL", "BTS", "FRED", "Δrev", "macro"];
const AMBER = "244, 168, 58";

type Packet = { seg: number; t: number; speed: number; tag: string | null; r: number };

export default function PipelineHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pts: { x: number; y: number }[] = [];
    // Per-segment cubic bezier control points.
    let rails: { p0: { x: number; y: number }; c1: { x: number; y: number }; c2: { x: number; y: number }; p1: { x: number; y: number } }[] = [];
    const pulse = NODES.map(() => 0);
    let packets: Packet[] = [];
    const mouse = { x: 0.5, y: 0.5, has: false };
    let raf = 0;
    let last = 0;
    let spawnAcc = 0;

    function layout() {
      const rect = parent!.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const padX = W * 0.04;
      const padY = H * 0.06;
      pts = NODES.map((n) => ({
        x: padX + n.fx * (W - 2 * padX),
        y: padY + n.fy * (H - 2 * padY),
      }));
      rails = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const mx = (b.x - a.x) * 0.55;
        rails.push({ p0: a, c1: { x: a.x + mx, y: a.y }, c2: { x: b.x - mx, y: b.y }, p1: b });
      }
    }

    function bez(seg: number, t: number) {
      const r = rails[seg];
      const u = 1 - t;
      const x = u * u * u * r.p0.x + 3 * u * u * t * r.c1.x + 3 * u * t * t * r.c2.x + t * t * t * r.p1.x;
      const y = u * u * u * r.p0.y + 3 * u * u * t * r.c1.y + 3 * u * t * t * r.c2.y + t * t * t * r.p1.y;
      return { x, y };
    }

    function spawn() {
      if (packets.length > 30) return;
      packets.push({
        seg: 0,
        t: 0,
        speed: 0.28 + Math.random() * 0.22,
        tag: Math.random() < 0.42 ? TAGS[(Math.random() * TAGS.length) | 0] : null,
        r: 2.6 + Math.random() * 1.6,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      // Parallax offset toward the cursor (subtle, depth-varied).
      const ox = mouse.has ? (mouse.x - 0.5) * 18 : 0;
      const oy = mouse.has ? (mouse.y - 0.5) * 14 : 0;

      // Rails.
      ctx!.lineWidth = 1.5;
      for (const r of rails) {
        ctx!.beginPath();
        ctx!.moveTo(r.p0.x + ox * 0.4, r.p0.y + oy * 0.4);
        ctx!.bezierCurveTo(
          r.c1.x + ox * 0.4, r.c1.y + oy * 0.4,
          r.c2.x + ox * 0.4, r.c2.y + oy * 0.4,
          r.p1.x + ox * 0.4, r.p1.y + oy * 0.4,
        );
        ctx!.strokeStyle = `rgba(${AMBER}, 0.2)`;
        ctx!.stroke();
      }

      // Packets — comet streaks of flowing data.
      ctx!.lineCap = "round";
      for (const p of packets) {
        const head = bez(p.seg, p.t);
        const tail = bez(p.seg, Math.max(0, p.t - 0.08));
        const hx = head.x + ox;
        const hy = head.y + oy;
        const tx = tail.x + ox;
        const ty = tail.y + oy;
        // streak
        const lg = ctx!.createLinearGradient(tx, ty, hx, hy);
        lg.addColorStop(0, `rgba(${AMBER}, 0)`);
        lg.addColorStop(1, `rgba(${AMBER}, 0.6)`);
        ctx!.strokeStyle = lg;
        ctx!.lineWidth = p.r * 1.5;
        ctx!.beginPath();
        ctx!.moveTo(tx, ty);
        ctx!.lineTo(hx, hy);
        ctx!.stroke();
        // halo
        const g = ctx!.createRadialGradient(hx, hy, 0, hx, hy, p.r * 5);
        g.addColorStop(0, `rgba(${AMBER}, 0.6)`);
        g.addColorStop(1, `rgba(${AMBER}, 0)`);
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(hx, hy, p.r * 5, 0, Math.PI * 2);
        ctx!.fill();
        // bright warm-white core
        ctx!.fillStyle = "#ffe2b0";
        ctx!.beginPath();
        ctx!.arc(hx, hy, p.r, 0, Math.PI * 2);
        ctx!.fill();
        if (p.tag) {
          ctx!.font = "10px ui-monospace, monospace";
          ctx!.fillStyle = `rgba(${AMBER}, 0.7)`;
          ctx!.fillText(p.tag, hx + 9, hy - 7);
        }
      }

      // Nodes.
      ctx!.font = "11px ui-monospace, monospace";
      pts.forEach((pt, i) => {
        const x = pt.x + ox * 0.55;
        const y = pt.y + oy * 0.55;
        const pl = pulse[i];
        if (pl > 0) {
          ctx!.beginPath();
          ctx!.arc(x, y, 10 + (1 - pl) * 22, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(${AMBER}, ${pl * 0.5})`;
          ctx!.lineWidth = 1.5;
          ctx!.stroke();
        }
        // ring
        ctx!.beginPath();
        ctx!.arc(x, y, 9, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(9, 10, 14, 0.9)";
        ctx!.fill();
        ctx!.lineWidth = 1.75;
        ctx!.strokeStyle = `rgba(${AMBER}, ${0.55 + pl * 0.45})`;
        ctx!.stroke();
        // core
        ctx!.beginPath();
        ctx!.arc(x, y, 2.6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgb(${AMBER})`;
        ctx!.fill();
        // label
        ctx!.fillStyle = "rgba(167, 172, 182, 0.85)";
        ctx!.fillText(NODES[i].label, x - ctx!.measureText(NODES[i].label).width / 2, y + 26);
      });
    }

    function step(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      // advance pulses
      for (let i = 0; i < pulse.length; i++) pulse[i] = Math.max(0, pulse[i] - dt * 1.8);
      // spawn
      spawnAcc += dt;
      if (spawnAcc > 0.3) {
        spawnAcc = 0;
        spawn();
      }
      // advance packets
      packets = packets.filter((p) => {
        p.t += p.speed * dt;
        if (p.t >= 1) {
          p.seg += 1;
          p.t = 0;
          if (p.seg < pts.length) pulse[p.seg] = 1;
          if (p.seg >= rails.length) return false;
        }
        return true;
      });
      draw();
      raf = requestAnimationFrame(step);
    }

    function seed() {
      packets = [];
      for (let s = 0; s < rails.length; s++) {
        for (let k = 0; k < 2; k++) {
          packets.push({
            seg: s,
            t: k * 0.45 + 0.18,
            speed: 0.28 + Math.random() * 0.22,
            tag: Math.random() < 0.4 ? TAGS[(Math.random() * TAGS.length) | 0] : null,
            r: 2.6 + Math.random() * 1.6,
          });
        }
      }
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / Math.max(1, rect.width);
      mouse.y = (e.clientY - rect.top) / Math.max(1, rect.height);
      mouse.has = true;
    };
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        last = performance.now();
        raf = requestAnimationFrame(step);
      }
    };

    layout();
    seed();
    draw(); // synchronous first frame — fills before rAF, and even if rAF is throttled

    const ro = new ResizeObserver(() => {
      layout();
      draw();
    });
    ro.observe(parent);

    if (!reduce) {
      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("visibilitychange", onVis);
      last = performance.now();
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />;
}
