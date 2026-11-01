"use client";

import { useLayoutEffect, useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  playCascade,
  prepareCascade,
  reducedMotion,
  retroactiveEnter,
  whenVisible,
} from "@/components/scale-clone/rlenvironments/motion";
import type { Card } from "./content";
import { ICONS } from "./icons";
import s from "./styles.module.css";

const ease = gsap.parseEase("power2.out");
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// BaseCardScroll stagger window (module 598042): l = min(0.1, 0.85 / (count - 1)); card i maps progress
// [i*l, i*l + 1 - (count-1)*l] -> [0, 1], then power2.out.
function staggered(p: number, i: number, count: number) {
  if (count <= 1) return p;
  const l = Math.min(0.1, 0.85 / Math.max(1, count - 1));
  return clamp01((p - i * l) / (1 - (count - 1) * l));
}

function CardGlyph({ name }: { name: Card["icon"] }) {
  const g = ICONS[name];
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ color: g.color }}
      aria-hidden="true"
    >
      {g.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/*
 * scale.com EvaluationLinkCardGrid (page chunk 1zwo72ehg4xzu.js module 830843) -> CardGrid 540409 / LinkCard 874328 /
 * BaseCardScroll 598042 (chunk 0b4nb0uzhfrdc.js; identical to the security / experts copies apart from minifier
 * renames, diffed module by module). Props: animationDirection "up", iconSize "md", theme "light", no heading,
 * retroactiveOnEnter true, directionalEntrance false (origin centre, no x offset). The styled-jsx wrapper zeroes the
 * CardGrid padding, forces 1 / 2 / 3 columns and pads the card 24 / 32 / 48. No hoveredColor and no link: no hover.
 *   per card, scrubbed: trigger card, `top bottom` -> `top 50%`; scale 0.96 -> 1, opacity 0 -> 1, staggered window
 *   once, grid `top bottom` (retroactive, deferred while the tab is hidden): icon tile clip
 *     inset(0 100% 0 0 round 10px) -> inset(0) 0.5s power1.out at 0.05*i + 0.125; icon opacity 1s (+0.05);
 *     title AnimatedText cascade (+0.16); description cascade (+0.18)
 */
export default function CardGrid({ cards }: { cards: Card[] }) {
  const section = useRef<HTMLElement>(null);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const glyphs = useRef<(HTMLSpanElement | null)[]>([]);
  const titles = useRef<(HTMLHeadingElement | null)[]>([]);
  const bodies = useRef<(HTMLParagraphElement | null)[]>([]);
  const count = cards.length;

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    let cancelled = false;
    let offRetro = () => {};
    let offVis = () => {};
    const splits: { revert: () => void }[] = [];
    const ctx = gsap.context(() => {
      cardEls.current.forEach((card, i) => {
        if (!card) return;
        const set = (p: number) => {
          const r = ease(staggered(p, i, count));
          gsap.set(card, { scale: 0.96 + 0.04 * r, opacity: r, x: 0, y: 0 });
        };
        set(0);
        ScrollTrigger.create({
          trigger: card,
          start: "top bottom",
          end: "top 50%",
          onUpdate: (self) => set(self.progress),
          onRefresh: (self) => set(self.progress),
        });
      });
      gsap.set(tiles.current.slice(0, count), {
        clipPath: "inset(0% 100% 0% 0% round 10px)",
      });
      gsap.set(glyphs.current.slice(0, count), { opacity: 0 });
    }, section);

    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        const pad = (el: HTMLElement | null) => {
          if (!el) return null;
          const c = prepareCascade(el);
          gsap.set(c.split.masks, {
            paddingTop: "0.0625em",
            paddingBottom: "0.0625em",
          });
          gsap.set(el, { marginTop: "-0.0625em", marginBottom: "-0.0625em" });
          return c;
        };
        const t = titles.current.slice(0, count).map(pad);
        const b = bodies.current.slice(0, count).map(pad);
        [...t, ...b].forEach((x) => x && splits.push(x.split));
        let started = false;
        const play = () => {
          if (started || cancelled) return;
          started = true;
          ctx.add(() => {
            for (let i = 0; i < count; i++) {
              const st = 0.05 * i + 0.125;
              gsap.to(tiles.current[i], {
                clipPath: "inset(0% 0% 0% 0% round 10px)",
                duration: 0.5,
                ease: "power1.out",
                delay: st,
              });
              gsap.to(glyphs.current[i], {
                opacity: 1,
                duration: 1,
                ease: "power1.out",
                delay: st + 0.05,
              });
              const c = st + 0.16;
              if (t[i]) playCascade(t[i]!, c);
              if (b[i]) playCascade(b[i]!, c + (t[i] ? 0.18 : 0));
            }
          });
        };
        let pending = false;
        const enter = () => {
          if (pending || started) return;
          pending = true;
          offVis = whenVisible(play);
        };
        const st = ScrollTrigger.create({
          trigger: section.current,
          start: "top bottom",
          end: "bottom 20%",
          onEnter: enter,
        });
        offRetro = retroactiveEnter(st, enter);
      });
    });
    return () => {
      cancelled = true;
      offRetro();
      offVis();
      ctx.revert();
      splits.forEach((sp) => sp.revert());
    };
  }, [count]);

  return (
    <div className="evaluation-link-card-grid">
      <section ref={section} className="CardGrid w-full scroll-mt-28">
        <div className="mx-auto w-full">
          <div className={`CardGridContainer ${s.cardGrid}`}>
            {cards.map((card, i) => (
              <div
                key={`${card.title}-${i}`}
                ref={(el) => {
                  cardEls.current[i] = el;
                }}
                className="BaseCard"
                style={{ transformOrigin: "center center" }}
              >
                <div
                  className="LinkCard relative h-full overflow-clip rounded-[8px] text-black xl:rounded-2xl"
                  style={{ background: "var(--emd-card)" }}
                >
                  {/* CMSLink without a link: a plain div with no height, so the inner h-full resolves to auto and the
                      content stays top-aligned in a stretched grid row (measured on scale.com). */}
                  <div className="CMSLink">
                    <div
                      className={`${s.cardInner} relative z-10 flex h-full flex-col justify-between gap-5 md:gap-6 xl:gap-16`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          ref={(el) => {
                            tiles.current[i] = el;
                          }}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.06] md:h-16 md:w-16"
                        >
                          <span
                            ref={(el) => {
                              glyphs.current[i] = el;
                            }}
                            className="flex items-center justify-center"
                          >
                            <CardGlyph name={card.icon} />
                          </span>
                        </div>
                      </div>
                      <h5
                        ref={(el) => {
                          titles.current[i] = el;
                        }}
                        className={`${s.cardTitle} font-display tracking-[-0.01em] !text-black`}
                      >
                        {card.title}
                      </h5>
                      <div className="flex flex-1 flex-col justify-end gap-4">
                        {card.body ? (
                          <div className="CardGridDescription">
                            <p
                              ref={(el) => {
                                bodies.current[i] = el;
                              }}
                              className="font-display text-[16px] leading-6 tracking-[-0.01em]"
                              style={{ color: "var(--emd-card-body)" }}
                            >
                              {card.body}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
