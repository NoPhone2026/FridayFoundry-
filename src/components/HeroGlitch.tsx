"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-reveal glitch overlay.
 *
 * Two opaque textures mix and reveal through a mask that follows the cursor:
 *   - alpha_layer (subtle checkerboard) -> the wide cloud body.
 *   - colorful_rectangles -> a solid core at the cursor.
 *
 * Reveal is BINARY per mosaic cell. A cell turns on when
 *   fall*solid + (smoothNoise - 0.5)*edge  clears a threshold,
 * so the centre is solid and the EDGES are shaped by low-frequency value noise
 * (connected blobs, not scattered dots). The noise is sampled with a per-layer
 * TIME offset, so it animates/shimmers. The reveal size scales with cursor SPEED
 * and is only stamped while moving — so it grows as you move and shrinks away to
 * nothing when the cursor stops. Everything decays to a hard zero.
 */
const BLOCK = 20; // mosaic cell size in CSS px

// checkerboard cloud — DOMINANT: large, irregular, lingers as a trail
const CLOUD = { R: 26, solid: 0.95, edge: 1.2, ns: 4.0, thr: 0.5, decay: 0.012, seed: 0, flow: 0.16 };
// colorful core — scattered/interleaved through the field (own noise mask),
// densest near the cursor, checkerboard shows through the gaps
const CORE = { R: 16, solid: 0.95, edge: 1.25, ns: 2.6, thr: 0.5, decay: 0.026, seed: 47, flow: 0.32 };

const SPEED_REF = 1.0; // cells/frame -> full-size reveal (normal movement)
const SF_MIN = 0.8; // smallest reveal scale while moving (keeps size consistent)
const MOVE_EPS = 0.08; // below this smoothed speed, treat the cursor as stopped
const AMBIENT_SPEED = 0.013; // auto-drift path speed on touch devices (calmer than cursor)
const AMBIENT_SF = 0.72; // reveal size for the ambient (touch) animation
const FLOOR = 0.004;
const THRESH = 0.5;

const TEX_CLOUD = "/images/hero/alpha_layer.png";
const TEX_CORE = "/images/hero/colorful_rectangles.png";

const hash = (x: number, y: number) => {
  let n = (x | 0) * 374761393 + (y | 0) * 668265263;
  n = (n ^ (n >> 13)) * 1274126177;
  n = n ^ (n >> 16);
  return (n >>> 0) / 4294967295;
};

// smooth value noise (bilinear + smoothstep) -> connected low-frequency blobs
const vnoise = (x: number, y: number, s: number) => {
  const xs = x / s;
  const ys = y / s;
  const x0 = Math.floor(xs);
  const y0 = Math.floor(ys);
  const fx = xs - x0;
  const fy = ys - y0;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(x0, y0);
  const b = hash(x0 + 1, y0);
  const c = hash(x0, y0 + 1);
  const d = hash(x0 + 1, y0 + 1);
  const top = a + (b - a) * ux;
  const bot = c + (d - c) * ux;
  return top + (bot - top) * uy;
};

export default function HeroGlitch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect reduced-motion -> static wordmark.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Anything with a real cursor (desktop/laptop mouse or trackpad) follows the
    // pointer. `any-pointer: fine` is true whenever *some* fine pointer exists, so
    // it stays cursor-driven even on hybrids that misreport the primary pointer as
    // coarse — only touch-only devices (tablet and smaller) get the auto reveal.
    const cursorCapable = window.matchMedia?.("(any-pointer: fine)").matches ?? true;
    const ambient = !cursorCapable;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cap at 3 so 3× phones render the canvas at full resolution (a 2× cap let
    // the browser upscale 2→3 and softened the mosaic). The noise sim runs on a
    // low-res grid independent of dpr, so only compositing scales — cheap.
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;

    const mk = () => document.createElement("canvas");
    // Full-resolution mosaic mask (reused per layer) + the core's own layer.
    const mask = mk();
    const layerCore = mk();
    const mCtx = mask.getContext("2d")!;
    const lR = layerCore.getContext("2d")!;

    let bufCloud = new Float32Array(0);
    let bufCore = new Float32Array(0);

    const cloud = new Image();
    cloud.src = TEX_CLOUD;
    const core = new Image();
    core.src = TEX_CORE;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layerCore.width = Math.round(W * dpr);
      layerCore.height = Math.round(H * dpr);
      // Mask is full-resolution so it composites 1:1 — no low-res upscale for
      // WebKit/iOS to bilinear-smooth (which softened the mosaic on iPhones).
      mask.width = Math.round(W * dpr);
      mask.height = Math.round(H * dpr);
      mCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(1, Math.ceil(W / BLOCK));
      rows = Math.max(1, Math.ceil(H / BLOCK));
      bufCloud = new Float32Array(cols * rows);
      bufCore = new Float32Array(cols * rows);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let cx = -999;
    let cy = -999;
    let px = -999;
    let py = -999;
    let inside = false;
    let primed = false;
    let speed = 0;
    let t = 0; // animation clock (frames)

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      cx = x / BLOCK;
      cy = y / BLOCK;
      if (!primed) {
        px = cx;
        py = cy;
        primed = true;
      }
    };
    const onLeave = () => {
      inside = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    type Brush = typeof CLOUD;
    const stamp = (buf: Float32Array, ox: number, oy: number, b: Brush, sf: number) => {
      const Reff = b.R * sf;
      const Rc = Math.max(1, Math.ceil(Reff));
      const tx = t * b.flow;
      for (let dy = -Rc; dy <= Rc; dy++) {
        const yy = oy + dy;
        if (yy < 0 || yy >= rows) continue;
        for (let dx = -Rc; dx <= Rc; dx++) {
          const xx = ox + dx;
          if (xx < 0 || xx >= cols) continue;
          const dd = Math.hypot(dx, dy) / Reff;
          if (dd > 1) continue;
          const fall = 1 - dd;
          const sn = vnoise(xx + b.seed + tx, yy - b.seed, b.ns);
          if (fall * b.solid + (sn - 0.5) * b.edge < b.thr) continue;
          buf[yy * cols + xx] = 1;
        }
      }
    };

    const paintAlong = (buf: Float32Array, b: Brush, sf: number) => {
      const dist = Math.hypot(cx - px, cy - py);
      const steps = Math.min(18, Math.max(1, Math.round(dist)));
      for (let s = 0; s <= steps; s++) {
        const u = s / steps;
        stamp(
          buf,
          Math.round(px + (cx - px) * u),
          Math.round(py + (cy - py) * u),
          b,
          sf,
        );
      }
    };

    const decay = (buf: Float32Array, amt: number) => {
      const k = 1 - amt;
      for (let i = 0; i < buf.length; i++) {
        const v = buf[i] * k;
        buf[i] = v < FLOOR ? 0 : v;
      }
    };

    // Paint the on-cells of a cell buffer as crisp full-resolution white blocks
    // (horizontal runs merged), so the mask never needs a smoothed upscale.
    const paintMask = (buf: Float32Array) => {
      mCtx.clearRect(0, 0, W, H);
      mCtx.fillStyle = "#fff";
      for (let y = 0; y < rows; y++) {
        const base = y * cols;
        let start = -1;
        for (let x = 0; x < cols; x++) {
          const on = buf[base + x] >= THRESH;
          if (on && start < 0) start = x;
          else if (!on && start >= 0) {
            mCtx.fillRect(start * BLOCK, y * BLOCK, (x - start) * BLOCK, BLOCK);
            start = -1;
          }
        }
        if (start >= 0)
          mCtx.fillRect(start * BLOCK, y * BLOCK, (cols - start) * BLOCK, BLOCK);
      }
    };

    const cover = (c: CanvasRenderingContext2D, img: HTMLImageElement) => {
      const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      c.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
    };

    let raf = 0;
    const frame = () => {
      t += 1;

      // touch: drive a wandering cursor along a Lissajous path
      if (ambient) {
        const at = t * AMBIENT_SPEED;
        cx = (W * (0.5 + 0.33 * Math.sin(at))) / BLOCK;
        cy = (H * (0.5 + 0.3 * Math.sin(at * 1.37 + 1.1))) / BLOCK;
        inside = true;
        if (!primed) {
          px = cx;
          py = cy;
          primed = true;
        }
      }

      // smoothed cursor speed (cells/frame)
      const inst = primed ? Math.hypot(cx - px, cy - py) : 0;
      speed = speed * 0.7 + inst * 0.3;
      const moving = ambient || (inside && speed > MOVE_EPS);
      const sf = ambient
        ? AMBIENT_SF
        : Math.max(SF_MIN, Math.min(1, speed / SPEED_REF));

      decay(bufCloud, CLOUD.decay);
      decay(bufCore, CORE.decay);
      if (moving) {
        paintAlong(bufCloud, CLOUD, sf);
        paintAlong(bufCore, CORE, sf);
      }
      px = cx;
      py = cy;

      ctx.clearRect(0, 0, W, H);
      const ready = cloud.complete && core.complete && cloud.naturalWidth;
      if (ready) {
        // checkerboard cloud, clipped by a full-res mask (1:1 draw -> crisp)
        ctx.globalCompositeOperation = "source-over";
        cover(ctx, cloud);
        paintMask(bufCloud);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(mask, 0, 0, W, H);

        // colorful core on its own layer, then composited on top
        lR.setTransform(dpr, 0, 0, dpr, 0, 0);
        lR.globalCompositeOperation = "source-over";
        lR.clearRect(0, 0, W, H);
        cover(lR, core);
        paintMask(bufCore);
        lR.globalCompositeOperation = "destination-in";
        lR.drawImage(mask, 0, 0, W, H);

        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(layerCore, 0, 0, W, H);
      }
      raf = visible && !document.hidden ? requestAnimationFrame(frame) : 0;
    };

    let visible = true;
    const resume = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    // pause the loop when the hero scrolls off-screen (battery, esp. ambient)
    const vis = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        resume();
      },
      { threshold: 0 },
    );
    vis.observe(canvas);
    const onVisibility = () => resume();
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      vis.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    />
  );
}
