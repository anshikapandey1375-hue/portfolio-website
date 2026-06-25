import { useEffect, useRef } from "react";

/**
 * Premium ambient technology network.
 * - Drifting nodes connected by proximity lines
 * - Subtle parallax + cursor magnetism
 * - DPR-aware, ResizeObserver-driven, paused when off-screen
 */
export function NetworkCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999, active: false };

    type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    let nodes: Node[] = [];

    const seed = () => {
      const count = Math.max(28, Math.min(70, Math.floor((w * h) / 22000)));
      nodes = new Array(count).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
        hue: Math.random() < 0.25 ? 1 : 0, // 1 => gold, 0 => ink
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (visible = e.isIntersecting)),
      { threshold: 0.01 },
    );
    io.observe(canvas);

    const LINK = 130;
    const draw = () => {
      raf.current = requestAnimationFrame(draw);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);

      // update
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -10) n.x = w + 10; else if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10; else if (n.y > h + 10) n.y = -10;
        if (mouse.active) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140) {
            const f = (1 - d2 / (140 * 140)) * 0.6;
            n.x += (dx / Math.sqrt(d2 + 0.01)) * f;
            n.y += (dy / Math.sqrt(d2 + 0.01)) * f;
          }
        }
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            const o = (1 - d / LINK) * 0.18;
            ctx.strokeStyle = `rgba(15,23,42,${o.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // cursor halo links
      if (mouse.active) {
        for (const n of nodes) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 180) {
            const o = (1 - d / 180) * 0.35;
            ctx.strokeStyle = `rgba(200,169,107,${o.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.hue ? "rgba(200,169,107,0.85)" : "rgba(15,23,42,0.55)";
        ctx.fill();
      }
    };
    draw();

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
