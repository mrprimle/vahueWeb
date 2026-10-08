"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Database, GitBranch, Globe } from "@phosphor-icons/react";
import s from "./restored.module.css";

const C = { x: 320, y: 330 };
const f = (n: number) => Number(n.toFixed(2));
const RADIAL = Array.from({ length: 18 }, (_, i) => {
  const a = (i / 18) * Math.PI * 2;
  return `M ${f(C.x + Math.cos(a) * 305)} ${f(C.y - 40 + Math.sin(a) * 260)} Q ${f(C.x + Math.cos(a) * 80)} ${f(C.y + 20 + Math.sin(a) * 50)} ${f(C.x + Math.cos(a) * 40)} ${f(C.y + 40 + Math.sin(a) * 15)}`;
});
const RINGS = [58, 104, 150, 196, 242];
const NODES = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
  return { x: f(C.x + Math.cos(a) * 225), y: f(C.y + Math.sin(a) * 225) };
});

/**
 * Three illustrative states for the Signals block, driven by GSAP:
 * 0 Context: light runs down the funnel into the core.
 * 1 Actions & approvals: a signal drops in and the rings fill outward from the centre.
 * 2 Connected systems: the core reaches each connected node in turn.
 */
export default function SignalVisual({ active }: { active: number }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const q = (sel: string) => `[data-mode="${active}"] ${sel}`;
      if (reduce) {
        gsap.set(q("[data-draw]"), { strokeDashoffset: 0 });
        gsap.set(q("[data-glow]"), { opacity: 1 });
        return;
      }
      if (active === 0) {
        gsap.fromTo(
          q("[data-streak]"),
          { strokeDashoffset: 112 },
          {
            strokeDashoffset: 0,
            duration: 2.4,
            ease: "power2.in",
            repeat: -1,
            stagger: { each: 0.55, from: "random", repeat: -1 },
          },
        );
        gsap.fromTo(
          q("[data-ring-pulse]"),
          { opacity: 0.15 },
          { opacity: 0.7, duration: 1.2, yoyo: true, repeat: -1, stagger: 0.15, ease: "sine.inOut" },
        );
      }
      if (active === 1) {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
        tl.set(q("[data-draw]"), { strokeDashoffset: 100 })
          .set(q("[data-dot]"), { scale: 0, transformOrigin: "50% 50%" })
          .set(q("[data-fill]"), { scale: 0, opacity: 0.55, transformOrigin: "50% 50%" })
          // the signal drops in from the top
          .to(q("[data-drop]"), { strokeDashoffset: 0, duration: 0.7, ease: "power2.in" })
          .to(q("[data-dot]"), { scale: 1, duration: 0.35, ease: "back.out(3)" })
          // the circle fills outward and each ring lights as the wave reaches it
          .to(q("[data-fill]"), { scale: 1, opacity: 0, duration: 1.8, ease: "power2.out" }, "<")
          .to(
            q("[data-ring]"),
            { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut", stagger: 0.22 },
            "<",
          )
          .to(q("[data-ring]"), { opacity: 0.35, duration: 0.8, stagger: 0.1 }, "+=0.9")
          .to(q("[data-drop]"), { opacity: 0, duration: 0.4 }, "<")
          .set(q("[data-ring], [data-drop]"), { opacity: 1 });
      }
      if (active === 2) {
        const tl = gsap.timeline({ repeat: -1 });
        tl.set(q("[data-link]"), { strokeDashoffset: 100 }).set(q("[data-node]"), { opacity: 0.35 });
        NODES.forEach((_, i) => {
          tl.to(q(`[data-link="${i}"]`), { strokeDashoffset: 0, duration: 0.45, ease: "power1.in" }, i * 0.32)
            .to(q(`[data-node="${i}"]`), { opacity: 1, duration: 0.25 }, i * 0.32 + 0.4);
        });
        tl.to(q("[data-link]"), { opacity: 0.25, duration: 0.6 }, "+=1.2")
          .to(q("[data-node]"), { opacity: 0.35, duration: 0.6 }, "<")
          .set(q("[data-link]"), { opacity: 1 });
        gsap.to(q("[data-orbit]"), { rotation: 360, svgOrigin: `${C.x} ${C.y}`, duration: 60, ease: "none", repeat: -1 });
      }
    }, root);
    return () => ctx.revert();
  }, [active]);

  const Icon = active === 0 ? Database : active === 1 ? GitBranch : Globe;
  return (
    <div className={s.signalStage} ref={root}>
      <svg viewBox="0 0 640 640" fill="none" aria-hidden>
        <defs>
          <radialGradient id="sv-fill">
            <stop offset=".55" stopColor="#9fb4ff" stopOpacity="0" />
            <stop offset=".95" stopColor="#9fb4ff" stopOpacity=".35" />
            <stop offset="1" stopColor="#9fb4ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sv-drop" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#e9eeff" stopOpacity="0" />
            <stop offset="1" stopColor="#e9eeff" />
          </linearGradient>
        </defs>

        {/* 0 · Context: funnel */}
        <g data-mode="0" className={s.svMode} data-on={active === 0}>
          <g stroke="#7d8394" strokeWidth=".8">
            {Array.from({ length: 9 }, (_, i) => (
              <ellipse
                key={i}
                cx={C.x}
                cy={C.y + 35 - i * 7}
                rx={45 + i * 33}
                ry={15 + i * 17}
                opacity={f(0.62 - i * 0.06)}
                data-ring-pulse={i < 3 || undefined}
              />
            ))}
            {RADIAL.map((d, i) => (
              <path key={i} d={d} opacity=".32" />
            ))}
          </g>
          <g stroke="#eef2ff" strokeWidth="1.3" strokeLinecap="round">
            {RADIAL.map((d, i) => (
              <path key={i} d={d} pathLength={100} strokeDasharray="12 100" strokeDashoffset={112} data-streak />
            ))}
          </g>
        </g>

        {/* 1 · Actions & approvals: rings filling outward */}
        <g data-mode="1" className={s.svMode} data-on={active === 1}>
          <g stroke="#3b3e47" strokeWidth=".8">
            {RINGS.map((r) => (
              <circle key={r} cx={C.x} cy={C.y} r={r} />
            ))}
          </g>
          <circle cx={C.x} cy={C.y} r={RINGS[4]} fill="url(#sv-fill)" data-fill />
          <g stroke="#c9d3f5" strokeWidth="1.1">
            {RINGS.map((r) => (
              <circle
                key={r}
                cx={C.x}
                cy={C.y}
                r={r}
                pathLength={100}
                strokeDasharray="100 100"
                strokeDashoffset={100}
                transform={`rotate(-90 ${C.x} ${C.y})`}
                data-ring
                data-draw
              />
            ))}
          </g>
          <path
            d={`M ${C.x} 20 V ${C.y}`}
            stroke="url(#sv-drop)"
            strokeWidth="1.4"
            pathLength={100}
            strokeDasharray="100 100"
            strokeDashoffset={100}
            data-drop
            data-draw
          />
          <circle cx={C.x} cy={C.y} r="6" fill="#f1f4ff" data-dot data-glow />
        </g>

        {/* 2 · Connected systems: core reaching each node */}
        <g data-mode="2" className={s.svMode} data-on={active === 2}>
          <g data-orbit>
            <circle cx={C.x} cy={C.y} r="225" stroke="#33363e" strokeWidth=".8" strokeDasharray="2 6" />
            <circle cx={C.x} cy={C.y} r="140" stroke="#2a2d33" strokeWidth=".8" />
            {NODES.map((n, i) => (
              <g key={i}>
                <line x1={C.x} y1={C.y} x2={n.x} y2={n.y} stroke="#2c2f36" strokeWidth=".8" />
                <line
                  x1={C.x}
                  y1={C.y}
                  x2={n.x}
                  y2={n.y}
                  stroke="#d7def7"
                  strokeWidth="1.2"
                  pathLength={100}
                  strokeDasharray="100 100"
                  strokeDashoffset={100}
                  data-link={i}
                  data-draw
                />
                <rect
                  x={n.x - 13}
                  y={n.y - 13}
                  width="26"
                  height="26"
                  rx="7"
                  fill="#17191f"
                  stroke="#8c93a8"
                  data-node={i}
                  data-glow
                  opacity=".35"
                />
              </g>
            ))}
          </g>
        </g>
      </svg>
      <div className={s.funnelCore}>
        <Icon size={20} />
      </div>
    </div>
  );
}
