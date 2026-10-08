"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Pause,
  Play,
  Envelope,
  Database,
  FileText,
  Code,
  Globe,
  GitBranch,
  MagnifyingGlass,
  Check,
  WhatsappLogo,
  InstagramLogo,
  Phone,
  CalendarBlank,
  CreditCard,
  AddressBook,
  ChatsCircle,
  Headset,
  ChartBar,
  BookOpen,
} from "@phosphor-icons/react";
import Crystal from "./Crystal";
import SignalVisual from "./SignalVisual";
import s from "./restored.module.css";

// Restored from the original Scale/Attio motion study (our own code, shader and copy).
const scenes = [
  {
    tag: "What we build",
    title: "Reliable AI has to run the real work.",
    body: "We design, ship and run AI systems for appointment-led practices, and put senior AI engineers inside product teams. People stay in the loop.",
    record: "One standard, two services",
    rows: [
      ["Workflow", "Defined with you"],
      ["Quality bar", "Agreed up front"],
      ["Owner", "Your team"],
      ["Next action", "Human review"],
    ],
  },
  {
    tag: "For clinics & practices",
    title: "Practice Front Office System.",
    body: "Every enquiry answered in minutes, day and night, and booked straight into your calendar. Instagram, WhatsApp, web chat and phone in one system.",
    cta: "For clinics",
    href: "#how-it-works",
    record: "Front office · today",
    rows: [
      ["Instagram DM", "Answered · 2 min"],
      ["WhatsApp", "Rescheduled"],
      ["Web chat", "Handed to a person"],
      ["Calendar", "Booked"],
    ],
  },
  {
    tag: "For product teams",
    title: "Embedded AI Engineers.",
    body: "Senior AI engineers inside your team within two weeks, shipping to a quality bar you set and measure.",
    cta: "For product teams",
    href: "/ai-native-engineering/",
    record: "Embedded team · sprint 06",
    rows: [
      ["Engineers", "Senior, embedded"],
      ["Start", "Within 2 weeks"],
      ["Evals", "Your quality bar"],
      ["Releases", "Every week"],
    ],
  },
];
const signals = [
  {
    title: "Context",
    description:
      "Every message, booking and record about a client, in one place the system and your team both read.",
    icon: Database,
  },
  {
    title: "Actions & approvals",
    description:
      "Replies, bookings and follow-ups run on their own. Anything clinical or unusual goes to a person.",
    icon: GitBranch,
  },
  {
    title: "Connected systems",
    description:
      "Results land in the practice system, calendar and CRM your team already uses.",
    icon: Globe,
  },
];
function WireSurface({ variant = 0 }: { variant?: number }) {
  return (
    <svg viewBox="0 0 640 430" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth=".65">
        {Array.from({ length: 17 }, (_, i) => (
          <path
            key={i}
            d={`M 15 ${35 + i * 22} C 130 ${95 + i * 12} 205 ${-20 + i * 24} 315 ${80 + i * 17} S 490 ${25 + i * 18} 625 ${60 + i * 20}`}
          />
        ))}
        {Array.from({ length: 18 }, (_, i) => (
          <path
            key={"v" + i}
            opacity=".35"
            d={`M ${15 + i * 35} 10 Q ${120 + i * 23} ${180 + variant * 30} ${30 + i * 34} 420`}
          />
        ))}
      </g>
      {Array.from({ length: 22 }, (_, i) => (
        <g
          key={"p" + i}
          transform={`translate(${30 + ((i * 107) % 570)},${40 + ((i * 67) % 350)})`}
        >
          <path d="M0 0h6v6z" stroke="currentColor" />
          <text y="-7" fill="currentColor" fontSize="7">
            {String(i * 127 + 1024).slice(-4)}
          </text>
        </g>
      ))}
    </svg>
  );
}
function LayerWorld({ scene }: { scene: number }) {
  return (
    <div className={s.world} data-world>
      <div className={s.layer} data-plane="back">
        <WireSurface variant={scene} />
      </div>
      <div className={`${s.layer} ${s.dataPlane}`} data-plane="middle">
        <div className={s.recordTop}>
          <span>VAHUE / SYSTEM 0{scene + 1}</span>
          <span>● LIVE</span>
        </div>
        <div className={s.recordContent}>
          <span className={s.bigGlyph}>
            <FileText size={64} weight="thin" />
          </span>
          <div>
            <small>{scenes[scene].tag}</small>
            <h3>{scenes[scene].record}</h3>
            <p>Illustrative record</p>
          </div>
        </div>
        <div className={s.dataRows}>
          {scenes[scene].rows.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <span>{value}</span>
              <Check size={13} />
            </div>
          ))}
        </div>
        <div className={s.recordBottom}>
          <span>Input → context → decision</span>
          <span>0{scene + 1} / 03</span>
        </div>
      </div>
      <div className={s.layer} data-plane="front">
        <WireSurface variant={scene} />
      </div>
      <div className={`${s.layer} ${s.pointPlane}`} data-plane="points">
        {Array.from({ length: 32 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${8 + ((i * 23) % 85)}%`,
              top: `${8 + ((i * 31) % 84)}%`,
              animationDelay: `${i * 0.13}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
const integrations = [
  ["WhatsApp", WhatsappLogo],
  ["Instagram", InstagramLogo],
  ["Website chat", ChatsCircle],
  ["Phone line", Phone],
  ["Gmail", Envelope],
  ["Calendar", CalendarBlank],
  ["Practice system", AddressBook],
  ["Payments", CreditCard],
  ["CRM", Database],
  ["Documents", FileText],
  ["Code", Code],
  ["Workflows", GitBranch],
] as const;
/** Page-wide smooth scroll (one Lenis instance driving GSAP ScrollTrigger). */
export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.14,
      wheelMultiplier: 0.8,
      anchors: { offset: -88 },
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}

/** Scale-style opening: framed hero, the layer sequence with both services, and the 5 → 1 result. */
export default function Showcase() {
  const root = useRef<HTMLDivElement>(null),
    [scene, setScene] = useState(0),
    [paused, setPaused] = useState(false);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const layer = root.current!.querySelector<HTMLElement>("[data-hero-layer]")!;
      const world = root.current!.querySelector<HTMLElement>("[data-world]")!;
      // Timeline units: 0-1 hero frame folds into the stack, 1-1.35 hand-over, then three scenes of one unit each.
      const HANDOVER = 1.35;
      const sceneAt = (t: number) => (t < HANDOVER + 1 ? 0 : t < HANDOVER + 2 ? 1 : 2);
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (mm) => {
          const { motion } = mm.conditions as { motion: boolean };
          if (!motion || paused) {
            // No movement: the hero simply gives way to the layer scene once you scroll past it.
            ScrollTrigger.create({
              trigger: "[data-stack-story]",
              start: "top top",
              end: "bottom bottom",
              onUpdate: (self) => {
                const heroOn = self.progress < 0.2;
                gsap.set(layer, { autoAlpha: heroOn ? 1 : 0 });
                gsap.set("[data-world-wrap], [data-scene-ui]", { autoAlpha: heroOn ? 0 : 1 });
                layer.dataset.navTheme = heroOn ? "light" : "dark";
                setScene(heroOn ? 0 : Math.min(2, Math.floor(((self.progress - 0.2) / 0.8) * 3)));
              },
            });
            return;
          }
          gsap.fromTo(
            "[data-hero-title]",
            { y: 28 },
            { y: 0, duration: 1.4, ease: "power3.out", clearProps: "transform" },
          );
          gsap.set("[data-world-wrap], [data-scene-ui]", { autoAlpha: 0 });
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: "[data-stack-story]",
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const t = self.progress * tl.duration();
                setScene(sceneAt(t));
                layer.dataset.navTheme = t < 0.4 ? "light" : "dark";
              },
            },
          });
          // 1. The framed hero shrinks and tilts until it sits exactly where the first layer will be.
          tl.fromTo(
            "[data-hero]",
            {
              left: 18,
              top: 88,
              width: () => layer.clientWidth - 36,
              height: () => layer.clientHeight - 88,
              rotationY: 0,
              rotationX: 0,
              borderRadius: 0,
            },
            {
              left: () => world.offsetLeft,
              top: () => world.offsetTop,
              width: () => world.offsetWidth,
              height: () => world.offsetHeight,
              rotationY: -12,
              rotationX: 5,
              borderRadius: 20,
              duration: 1,
              ease: "power1.inOut",
            },
            0,
          )
            // The white frame goes black fast, then the layer turns see-through so the planes can appear around the image.
            .to(layer, { backgroundColor: "#000", duration: 0.22 }, 0)
            .set(layer, { backgroundColor: "rgba(0,0,0,0)" }, 0.3)
            .to("[data-scroll-hint]", { autoAlpha: 0, duration: 0.15 }, 0)
            .to("[data-hero-title]", { autoAlpha: 0, y: -40, scale: 0.92, duration: 0.45 }, 0.05)
            .to("[data-hero-shade]", { opacity: 0.25, duration: 1 }, 0)
            .to("[data-hero]", { boxShadow: "0 0 0 1px #ffffff55", duration: 0.4 }, 0.6)
            // 2. Hand-over: the image dissolves into the wire layers that were waiting behind it.
            .to("[data-world-wrap]", { autoAlpha: 1, duration: 0.3 }, 0.78)
            .to("[data-hero]", { autoAlpha: 0, duration: 0.3 }, 1.02)
            .set(layer, { visibility: "hidden" }, HANDOVER)
            .to("[data-scene-ui]", { autoAlpha: 1, duration: 0.3 }, 1.05)
            // 3. The layer sequence, one unit per scene.
            .fromTo(
              "[data-world]",
              { xPercent: 0, rotateY: -12, rotateX: 5 },
              {
                xPercent: () => (window.innerWidth < 761 ? 0 : 28),
                rotateY: -27,
                rotateX: 8,
                duration: 1,
              },
              HANDOVER,
            )
            .to('[data-plane="front"]', { z: 180, duration: 1 }, HANDOVER)
            .to('[data-plane="back"]', { z: -130, duration: 1 }, HANDOVER)
            .to("[data-world]", { rotateY: 25, rotateX: -4, duration: 1 })
            .to("[data-world]", { rotateY: -20, rotateX: 8, duration: 1 });
          gsap.fromTo(
            "[data-stat-word]",
            { opacity: 0.22 },
            {
              opacity: 1,
              stagger: 0.06,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-stat]",
                start: "top 75%",
                end: "center 45%",
                scrub: 1,
              },
            },
          );
          gsap.fromTo(
            "[data-stat-text]",
            { y: 65 },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-stat]",
                start: "top bottom",
                end: "center center",
                scrub: 1,
              },
            },
          );
        },
      );
    }, root);
    return () => {
      media.revert();
      ctx.revert();
    };
  }, [paused]);
  return (
    <div
      className={s.site}
      ref={root}
      data-motion={paused ? "paused" : "running"}
      data-page-theme="home-showcase"
    >
        <div className={s.black} data-black-start>
          <section className={s.stackStory} id="stack" data-stack-story>
            <span className={s.layersAnchor} id="layers" aria-hidden />
            <div className={s.stackSticky}>
              <div className={s.worldWrap} data-world-wrap>
                <LayerWorld scene={scene} />
              </div>
              <div className={s.sceneUi} data-scene-ui>
                <div
                  className={`${s.sceneCopy} ${scene === 0 ? s.sceneIntro : ""}`}
                  key={scene}
                >
                  <small>{scenes[scene].tag}</small>
                  <h2>{scenes[scene].title}</h2>
                  <p>{scenes[scene].body}</p>
                  {scenes[scene].href && (
                    <Link href={scenes[scene].href!}>
                      {scenes[scene].cta} <ArrowRight size={15} />
                    </Link>
                  )}
                </div>
                <div className={s.sceneNav} aria-label="Explore workflow layers">
                  {scenes.map((x, i) => (
                    <button
                      key={x.tag}
                      aria-label={`Show ${x.tag}`}
                      aria-pressed={scene === i}
                      onClick={() => setScene(i)}
                    >
                      <span />
                      {x.tag}
                    </button>
                  ))}
                </div>
              </div>
              {/* The framed hero lives on the same stage, so it can fold straight into the first layer. */}
              <div className={s.heroLayer} data-hero-layer data-nav-theme="light">
                <section className={s.hero} data-hero>
                  <div className={s.heroCanvas} data-hero-canvas>
                    <Crystal paused={paused} />
                  </div>
                  <div className={s.heroShade} data-hero-shade />
                  <div className={s.heroTitle}>
                    <h1 data-hero-title>
                      We build the AI systems
                      <br /> your business runs on.
                    </h1>
                  </div>
                  <a className={s.scrollHint} href="#layers" data-scroll-hint>
                    Scroll to explore{" "}
                    <span>
                      <ArrowDown size={18} />
                    </span>
                  </a>
                </section>
              </div>
            </div>
          </section>
          <section className={s.stat} data-stat>
            <div className={s.statArt} aria-hidden>
              <WireSurface />
              <div className={s.statOrb} />
            </div>
            <div className={s.statPanel}>
              <h2 data-stat-text>
                {"5 → 1. A London clinic replaced five separate vendors with one Vahue system."
                  .split(" ")
                  .map((word, i) => (
                    <span key={i} data-stat-word>
                      {word}{" "}
                    </span>
                  ))}
              </h2>
              <p>
                Enquiries, booking, reminders and follow-up now run in one
                place, with one team accountable for it.
              </p>
              <Link href="/case-studies/">
                See delivery outcomes <ArrowUpRight size={19} />
              </Link>
            </div>
          </section>
        </div>
      <button
        className={s.motionControl}
        onClick={() => setPaused(!paused)}
        aria-label={paused ? "Resume motion" : "Pause motion"}
      >
        {paused ? <Play size={15} /> : <Pause size={15} />}
        <span>{paused ? "Resume motion" : "Pause motion"}</span>
      </button>
    </div>
  );
}

/** Attio-style dark block: Unified Context arc, capabilities, signals, connections, API, then the pinned quote. */
export function UnifiedContext() {
  const root = useRef<HTMLDivElement>(null),
    [active, setActive] = useState(0),
    [inView, setInView] = useState(false),
    [hold, setHold] = useState(false),
    progress = useRef<gsap.core.Tween | null>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Tabs only advance while the Signals block is on screen.
      ScrollTrigger.create({
        trigger: "[data-signals]",
        start: "top 75%",
        end: "bottom 25%",
        onToggle: (self) => setInView(self.isActive),
      });
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const scrub = (start: string, end: string, trigger = "[data-context]") => ({
          trigger,
          start,
          end,
          scrub: 1,
        });
        // Title comes into focus as the block rises.
        gsap.fromTo(
          "[data-context-title]",
          { opacity: 0.15, filter: "blur(14px)", y: 50 },
          { opacity: 1, filter: "blur(0px)", y: 0, ease: "none", scrollTrigger: scrub("top 90%", "top 20%") },
        );
        // Horizon lifts into place…
        gsap.fromTo(
          "[data-arc]",
          { scale: 0.8, y: 260 },
          { scale: 1, y: 0, ease: "none", scrollTrigger: scrub("top bottom", "center center") },
        );
        // …while its spectrum line draws out from the centre and the glow builds behind it.
        const arc = { p: 0 };
        const line = root.current!.querySelector<SVGPathElement>("[data-arc-line]")!;
        const paint = () => {
          line.style.strokeDasharray = `${arc.p} 1`;
          line.style.strokeDashoffset = `${-(1 - arc.p) / 2}`;
        };
        paint();
        gsap.to(arc, { p: 1, ease: "none", onUpdate: paint, scrollTrigger: scrub("top 80%", "top top") });
        gsap.fromTo(
          "[data-arc-glow]",
          { opacity: 0 },
          { opacity: 0.32, ease: "none", scrollTrigger: scrub("top 60%", "top top") },
        );
        // A few of the vertical rays light up in turn behind the horizon.
        gsap.fromTo(
          "[data-ray-hi]",
          { opacity: 0 },
          {
            opacity: 0.6,
            duration: 1.1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            repeatDelay: 2.5,
            stagger: { each: 0.45, from: "random", repeat: -1, yoyo: true, repeatDelay: 2.5 },
          },
        );
        // Capability columns arrive one after another.
        gsap.fromTo(
          "[data-feature]",
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: "[data-features]", start: "top 85%", once: true },
          },
        );
        // Connection rays and the developer blueprint keep a slow line highlight running.
        gsap.fromTo(
          "[data-conn-ray]",
          { backgroundColor: "#383b413d" },
          {
            backgroundColor: "#9aa3bd",
            duration: 0.9,
            yoyo: true,
            repeat: -1,
            repeatDelay: 5,
            stagger: { each: 0.7, from: "random", repeat: -1, yoyo: true, repeatDelay: 5 },
          },
        );
        gsap.fromTo(
          "[data-blue-hi]",
          { strokeDashoffset: 116 },
          { strokeDashoffset: 0, duration: 3.2, ease: "none", repeat: -1, stagger: { each: 1.1, repeat: -1 } },
        );
      });
      // Words light up one by one while the quote is pinned (also without motion: it only changes colour).
      gsap.fromTo(
        "[data-quote-word]",
        { color: "#c2c5cb" },
        {
          color: "#1b1c1e",
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-quote]",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        },
      );
    }, root);
    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);
  // The active tab's underline fills over six seconds, then hands over to the next tab.
  useEffect(() => {
    const bar = root.current?.querySelector<HTMLElement>(`#signal-tab-${active} [data-tab-progress]`);
    gsap.set(root.current!.querySelectorAll("[data-tab-progress]"), { scaleX: 0 });
    if (!bar) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(bar, { scaleX: 1 });
      return;
    }
    progress.current = gsap.fromTo(
      bar,
      { scaleX: 0 },
      { scaleX: 1, duration: 6, ease: "none", paused: true, onComplete: () => setActive((a) => (a + 1) % 3) },
    );
    return () => {
      progress.current?.kill();
      progress.current = null;
    };
  }, [active]);
  useEffect(() => {
    const tween = progress.current;
    if (!tween) return;
    if (inView && !hold) tween.play();
    else tween.pause();
  }, [inView, hold, active]);
  return (
    <div className={s.site} ref={root} data-page-theme="home-context">
        <div className={s.contextZone} id="context">
          <section className={s.contextHero} data-context>
            <div className={s.contextTitle} data-context-title>
              <p>One Vahue system with</p>
              <h2>Unified Context</h2>
            </div>
            <div className={s.arcField} data-arc>
              <svg
                viewBox="0 0 1400 760"
                preserveAspectRatio="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="arc-spectrum">
                    <stop stopColor="#bc783f" />
                    <stop offset=".4" stopColor="#bfae4d" />
                    <stop offset=".68" stopColor="#7fbdc1" />
                    <stop offset="1" stopColor="#5e69ae" />
                  </linearGradient>
                  <linearGradient
                    id="rays-fade"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="760"
                  >
                    <stop stopColor="#303035" stopOpacity=".1" />
                    <stop offset="1" stopColor="#6c7279" stopOpacity=".3" />
                  </linearGradient>
                  <linearGradient id="rays-hi" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="760">
                    <stop stopColor="#c9d1ea" stopOpacity="0" />
                    <stop offset=".7" stopColor="#c9d1ea" stopOpacity=".55" />
                    <stop offset="1" stopColor="#c9d1ea" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {Array.from({ length: 155 }, (_, i) => (
                  <line
                    key={i}
                    x1={i * 9.1}
                    y1="0"
                    x2={i * 9.1}
                    y2="760"
                    stroke="url(#rays-fade)"
                  />
                ))}
                <g stroke="url(#rays-hi)" strokeWidth="1.2">
                  {Array.from({ length: 14 }, (_, i) => (
                    <line key={i} x1={(i * 11 + 4) * 9.1} y1="0" x2={(i * 11 + 4) * 9.1} y2="760" opacity="0" data-ray-hi />
                  ))}
                </g>
                <filter
                  id="arc-blur"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="22" />
                </filter>
                <path
                  d="M-80 825 Q700 -15 1480 825"
                  stroke="url(#arc-spectrum)"
                  strokeWidth="46"
                  opacity=".32"
                  fill="none"
                  filter="url(#arc-blur)"
                  data-arc-glow
                />
                <path d="M-80 825 Q700 -15 1480 825" fill="#101112" />
                <path
                  d="M-80 825 Q700 -15 1480 825"
                  stroke="url(#arc-spectrum)"
                  strokeWidth="2"
                  fill="none"
                  pathLength={1}
                  data-arc-line
                />
              </svg>
            </div>
          </section>
          <section
            className={s.featureRow}
            aria-label="What connected context makes possible"
            data-features
          >
            {[
              [
                "Every enquiry captured.",
                "Instagram, WhatsApp, web chat and phone in one inbox.",
                ChartBar,
              ],
              [
                "Your tools, connected.",
                "Practice system, calendar, CRM and payments stay in sync.",
                Globe,
              ],
              [
                "Learns your practice.",
                "Prices, policies, treatments and your tone of voice.",
                BookOpen,
              ],
              [
                "Every answer traceable.",
                "Open any reply and see the record it came from.",
                MagnifyingGlass,
              ],
              [
                "No one left waiting.",
                "A person takes over the moment it matters.",
                Headset,
              ],
            ].map(([title, text, Icon]) => {
              const I = Icon as typeof Database;
              return (
                <article key={String(title)} data-feature>
                  <I size={22} weight="light" />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </article>
              );
            })}
          </section>
          <section
            className={s.signals}
            data-signals
            onMouseEnter={() => setHold(true)}
            onMouseLeave={() => setHold(false)}
            onFocus={() => setHold(true)}
            onBlur={() => setHold(false)}
          >
            <div className={s.signalCopy}>
              <span className={s.tag}>Signals</span>
              <h2>
                Every signal, none of the chasing.
                <br />
                <span>Ready for the next step.</span>
              </h2>
              <Link className={s.outlineLink} href="/enterprise-ai/">
                See how it works <ArrowRight size={14} />
              </Link>
              <div
                className={s.signalTabs}
                role="tablist"
                aria-label="Context layers"
              >
                {signals.map((item, i) => (
                  <button
                    key={item.title}
                    id={`signal-tab-${i}`}
                    role="tab"
                    aria-controls="signal-visual"
                    aria-selected={active === i}
                    tabIndex={active === i ? 0 : -1}
                    onKeyDown={(e) => {
                      if (["ArrowDown", "ArrowUp"].includes(e.key)) {
                        e.preventDefault();
                        const next =
                          (active + (e.key === "ArrowDown" ? 1 : 2)) % 3;
                        setActive(next);
                        document.getElementById(`signal-tab-${next}`)?.focus();
                      }
                    }}
                    onClick={() => setActive(i)}
                  >
                    <span>{item.title}</span>
                    {active === i && <p>{item.description}</p>}
                    <i data-tab-progress />
                  </button>
                ))}
              </div>
            </div>
            <div
              className={s.signalVisual}
              role="tabpanel"
              id="signal-visual"
              aria-labelledby={`signal-tab-${active}`}
            >
              <SignalVisual active={active} />
              <span className={s.visualCaption}>
                {signals[active].title} / illustrative architecture
              </span>
            </div>
          </section>
          <section className={s.connections} id="connections">
            <div className={s.connectionRays} aria-hidden>
              {Array.from({ length: 110 }, (_, i) => (
                <i key={i} data-conn-ray={i % 9 === 4 || undefined} />
              ))}
            </div>
            <span className={s.tag}>Connections</span>
            <h2>
              The tools you already use.
              <br className={s.mobileOnly} /> Working as one system.
            </h2>
            <p>
              We connect your channels, practice system and calendar
              <br /> around the result your team needs.
            </p>
            <Link className={s.outlineLink} href="/automations/">
              Explore the building blocks <ArrowRight size={14} />
            </Link>
            <div className={s.integrationWindow}>
              <div className={s.integrationTrack}>
                {[0, 1].map((n) => (
                  <div
                    key={n}
                    className={s.integrationSet}
                    aria-hidden={n === 1}
                  >
                    {integrations.map(([label, I]) => (
                      <div
                        key={label}
                        className={s.integrationItem}
                        tabIndex={n === 0 ? 0 : -1}
                        aria-label={label}
                      >
                        <I size={44} weight="regular" />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className={s.developer}>
            <div className={s.devCopy}>
              <h2>
                APIs. Events. Workflows.
                <br />
                <span>Build around your business.</span>
              </h2>
              <Link className={s.outlineLink} href="/ai-native-engineering/">
                Inside the approach <ArrowRight size={14} />
              </Link>
            </div>
            <div className={s.blueprint} aria-hidden>
              <svg viewBox="0 0 580 380">
                <g fill="none" stroke="#454952" strokeWidth=".7">
                  {Array.from({ length: 18 }, (_, i) => (
                    <path
                      key={i}
                      d={`M${30 + i * 29} 0L${-170 + i * 29} 380 M0 ${i * 25}H580`}
                      opacity=".3"
                    />
                  ))}
                  {[0, 1, 2].map((i) => (
                    <g
                      key={i}
                      transform={`translate(${100 + i * 125},${i === 1 ? 65 : 135})`}
                    >
                      <path d="M0 40L70 0L140 40L70 80Z M0 40V140L70 180L140 140V40 M70 80V180" />
                      <path
                        d="M0 40L70 0L140 40L70 80Z M0 40V140L70 180L140 140V40 M70 80V180"
                        stroke="#cdd6ff"
                        strokeWidth="1.1"
                        pathLength={100}
                        strokeDasharray="16 100"
                        strokeDashoffset={116}
                        data-blue-hi
                      />
                      {Array.from({ length: 13 }, (_, j) => (
                        <path
                          key={j}
                          d={`M0 ${43 + j * 7.4}L70 ${83 + j * 7.4}L140 ${43 + j * 7.4}`}
                          opacity=".6"
                        />
                      ))}
                      {[
                        [0, 40],
                        [70, 0],
                        [140, 40],
                        [70, 80],
                        [0, 140],
                        [70, 180],
                        [140, 140],
                      ].map(([x, y]) => (
                        <rect
                          key={x + "-" + y}
                          x={x - 2}
                          y={y - 2}
                          width="4"
                          height="4"
                          fill="#7f8697"
                        />
                      ))}
                    </g>
                  ))}
                </g>
              </svg>
            </div>
          </section>
          <div className={s.darkTail} />
        </div>
        <section
          className={`${s.quoteSection} ${s.quotePin}`}
          id="principle"
          data-quote
          data-nav-theme="light"
        >
          <div className={s.quoteInner}>
            <p className={s.quote}>
              {"The best place to begin is a real piece of work, a useful outcome, and a shared way to know it is ready."
                .split(" ")
                .map((word, i) => (
                  <span key={i} data-quote-word>
                    {word}{" "}
                  </span>
                ))}
            </p>
            <div className={s.quoteCredit}>
              <b>Vahue delivery principle</b>
              <span>Original statement · not a customer testimonial</span>
            </div>
          </div>
        </section>
    </div>
  );
}
