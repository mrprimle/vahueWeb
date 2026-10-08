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
  ChatCircle,
  Code,
  Calendar,
  Globe,
  Lightning,
  ShieldCheck,
  GitBranch,
  MagnifyingGlass,
  Check,
} from "@phosphor-icons/react";
import Crystal from "./Crystal";
import s from "./restored.module.css";

// Restored from the original Scale/Attio motion study (our own code, shader and copy).
const services = [
  {
    tag: "For clinics & appointment businesses",
    name: "Practice Front Office System",
    line: "Every enquiry answered in minutes, day and night, and booked straight into your calendar.",
    href: "#how-it-works",
  },
  {
    tag: "For product teams",
    name: "Embedded AI Engineers",
    line: "Senior AI engineers inside your team within two weeks, shipping to a quality bar you set.",
    href: "/ai-native-engineering/",
  },
];
const scenes = [
  {
    tag: "The complete workflow",
    title: "From raw information to a useful decision.",
    body: "Connect the information, the system and the person who owns the next step. Keep the evidence in view.",
  },
  {
    tag: "Applications",
    title: "AI that fits into the work.",
    body: "Start with an operating task. Prepare the record, surface the exceptions and make the next handoff useful.",
  },
  {
    tag: "Data",
    title: "Better inputs. Clearer outcomes.",
    body: "Define the information the workflow needs. Validate the details and make missing evidence visible.",
  },
];
const signals = [
  {
    title: "Context",
    description:
      "Documents, requests and business records. Connected around the task.",
    icon: Database,
  },
  {
    title: "Actions & approvals",
    description:
      "Prepare the next action, with the decision boundary and owner in view.",
    icon: GitBranch,
  },
  {
    title: "Connected systems",
    description:
      "Bring the result into the tools where your team already works.",
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
          <span>WORKSPACE / CASE 024</span>
          <span>● EVIDENCE LINKED</span>
        </div>
        <div className={s.recordContent}>
          <span className={s.bigGlyph}>
            <FileText size={64} weight="thin" />
          </span>
          <div>
            <small>OPERATIONS</small>
            <h3>
              {["A connected view", "Prepared case", "Validated record"][scene]}
            </h3>
            <p>Northstar Services · Illustrative record</p>
          </div>
        </div>
        <div className={s.dataRows}>
          {[
            "Source documents",
            "Required information",
            "Review owner",
            "Next action",
          ].map((x, i) => (
            <div key={x}>
              <span>{x}</span>
              <span>
                {
                  [
                    "3 linked sources",
                    "Ready to inspect",
                    "Operations team",
                    "Human review",
                  ][i]
                }
              </span>
              <Check size={13} />
            </div>
          ))}
        </div>
        <div className={s.recordBottom}>
          <span>Input → context → decision</span>
          <span>01 / 03</span>
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
function Funnel({ active }: { active: number }) {
  return (
    <div className={`${s.funnel} ${s["funnelMode" + active]}`}>
      <svg viewBox="0 0 640 640" fill="none" aria-hidden>
        <defs>
          <radialGradient id="mesh-fade">
            <stop stopColor="#a6acbd" stopOpacity=".65" />
            <stop offset="1" stopColor="#676d7d" stopOpacity=".03" />
          </radialGradient>
        </defs>
        <g stroke="url(#mesh-fade)" strokeWidth=".8">
          {Array.from({ length: 9 }, (_, i) => (
            <ellipse
              key={i}
              cx="320"
              cy={325 - i * 7}
              rx={45 + i * 33}
              ry={15 + i * 17}
            />
          ))}
          {Array.from({ length: 18 }, (_, i) => {
            const a = (i / 18) * Math.PI * 2;
            const f = (n: number) => Number(n.toFixed(3));
            return (
              <path
                key={"r" + i}
                d={`M ${f(320 + Math.cos(a) * 305)} ${f(290 + Math.sin(a) * 260)} Q ${f(320 + Math.cos(a) * 80)} ${f(350 + Math.sin(a) * 50)} ${f(320 + Math.cos(a) * 40)} ${f(370 + Math.sin(a) * 15)}`}
              />
            );
          })}
        </g>
        <g className={s.orbitSpark}>
          <circle cx="531" cy="317" r="2" fill="#d9e1ff" />
          <circle cx="154" cy="389" r="1.6" fill="#d9e1ff" />
        </g>
      </svg>
      <div className={s.funnelCore}>
        {active === 0 ? (
          <Database size={20} />
        ) : active === 1 ? (
          <GitBranch size={20} />
        ) : (
          <Globe size={20} />
        )}
      </div>
    </div>
  );
}
const integrations = [
  ["Email", Envelope],
  ["Documents", FileText],
  ["Data", Database],
  ["Messages", ChatCircle],
  ["Code", Code],
  ["Calendar", Calendar],
  ["Web", Globe],
  ["Workflows", GitBranch],
  ["Search", MagnifyingGlass],
  ["Approvals", ShieldCheck],
] as const;
export default function Showcase() {
  const root = useRef<HTMLDivElement>(null),
    [scene, setScene] = useState(0),
    [active, setActive] = useState(0),
    [paused, setPaused] = useState(false);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (paused) return;
        const lenis = new Lenis({ duration: 1.05, anchors: { offset: -85 } });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.fromTo(
          "[data-hero-title]",
          { y: 28 },
          { y: 0, duration: 1.4, ease: "power3.out", clearProps: "transform" },
        );
        gsap.fromTo(
          "[data-hero-card]",
          { y: 36 },
          {
            y: 0,
            duration: 1.3,
            delay: 0.15,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "transform",
          },
        );
        gsap.to("[data-hero-canvas]", {
          scale: 1.1,
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "[data-stack-story]",
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) =>
                setScene(Math.min(2, Math.floor(self.progress * 3))),
            },
          })
          .fromTo(
            "[data-world]",
            { xPercent: 0, rotateY: -12, rotateX: 5 },
            {
              xPercent: () => (window.innerWidth < 761 ? 0 : 28),
              rotateY: -27,
              rotateX: 8,
              duration: 1,
            },
          )
          .to('[data-plane="front"]', { z: 180, duration: 1 }, 0)
          .to('[data-plane="back"]', { z: -130, duration: 1 }, 0)
          .to("[data-world]", { rotateY: 25, rotateX: -4, duration: 1 })
          .to("[data-world]", { rotateY: -20, rotateX: 8, duration: 1 });
        gsap.fromTo(
          "[data-arc]",
          { scale: 0.82, y: 80 },
          {
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-context]",
              start: "top bottom",
              end: "center center",
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
        gsap.fromTo(
          "[data-quote-word]",
          { color: "#91949c" },
          {
            color: "#26272a",
            stagger: 0.08,
            scrollTrigger: {
              trigger: "[data-quote]",
              start: "top 70%",
              end: "center 55%",
              scrub: 1,
            },
          },
        );
        return () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      });
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
      <div className={s.heroFrame}>
        <section className={s.hero} data-hero>
          <div className={s.heroCanvas} data-hero-canvas>
            <Crystal paused={paused} />
          </div>
          <div className={s.heroShade} />
          <div className={s.heroContent} data-hero-title>
            <h1>We build the AI systems your business runs on.</h1>
            <p>
              From a clinic&rsquo;s front desk to a product team&rsquo;s
              roadmap, designed, shipped and run by senior engineers.
            </p>
          </div>
          <div className={s.heroCards}>
            {services.map((x) => (
              <Link
                key={x.name}
                href={x.href}
                className={s.heroCard}
                data-hero-card
              >
                <small>{x.tag}</small>
                <strong>
                  {x.name} <ArrowUpRight size={18} />
                </strong>
                <span>{x.line}</span>
              </Link>
            ))}
            <div className={`${s.heroCard} ${s.heroStat}`} data-hero-card>
              <small>Latest result</small>
              <strong>
                5 <i>&rarr;</i> 1
              </strong>
              <span>
                A London clinic replaced five separate vendors with one Vahue
                system.
              </span>
            </div>
          </div>
        </section>
      </div>
        <div className={s.black} data-black-start>
          <section className={s.stackStory} id="stack" data-stack-story>
            <div className={s.stackSticky}>
              <LayerWorld scene={scene} />
              <div
                className={`${s.sceneCopy} ${scene === 0 ? s.sceneIntro : ""}`}
                key={scene}
              >
                <small>{scenes[scene].tag}</small>
                <h2>{scenes[scene].title}</h2>
                <p>{scenes[scene].body}</p>
                {scene > 0 && (
                  <Link
                    href={scene === 2 ? "/enterprise-ai/" : "#how-it-works"}
                  >
                    Explore the approach <ArrowRight size={15} />
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
          </section>
          <section className={s.stat} data-stat>
            <div className={s.statArt} aria-hidden>
              <WireSurface />
              <div className={s.statOrb} />
            </div>
            <div className={s.statPanel}>
              <h2 data-stat-text>
                <span>1</span> well-defined workflow. <br />A useful place to
                begin <br />
                building your AI capability.
              </h2>
              <p>
                Start with an agreed output, a measurable baseline and a clear
                owner for the next decision.
              </p>
              <Link href="#engage">
                Start with the work <ArrowUpRight size={19} />
              </Link>
            </div>
          </section>
        </div>
        <div className={s.contextZone} id="context">
          <section className={s.contextHero} data-context>
            <div className={s.contextTitle}>
              <p>A shared foundation for useful work</p>
              <h2>Connected intelligence.</h2>
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
                <path
                  d="M-80 825 Q700 -15 1480 825"
                  stroke="url(#arc-spectrum)"
                  strokeWidth="1.3"
                  fill="#101112"
                />
              </svg>
            </div>
          </section>
          <section
            className={s.featureRow}
            aria-label="What connected context makes possible"
          >
            {[
              [
                "Capture the context.",
                "Bring permitted inputs into the workflow.",
                Envelope,
              ],
              [
                "Connect the handoff.",
                "Keep systems and decision owners aligned.",
                GitBranch,
              ],
              [
                "Keep learning.",
                "Use feedback to improve the next case.",
                Lightning,
              ],
              [
                "Inspect the evidence.",
                "Follow a result back to its source.",
                MagnifyingGlass,
              ],
              [
                "Work from shared facts.",
                "Give people and agents the same context.",
                Database,
              ],
            ].map(([title, text, Icon]) => {
              const I = Icon as typeof Database;
              return (
                <article key={String(title)}>
                  <I size={22} weight="light" />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </article>
              );
            })}
          </section>
          <section className={s.signals}>
            <div className={s.signalCopy}>
              <span className={s.tag}>Signals</span>
              <h2>
                Bring the relevant pieces together.
                <br />
                <span>Make the next move clearer.</span>
              </h2>
              <Link className={s.outlineLink} href="/enterprise-ai/">
                Explore context <ArrowRight size={14} />
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
                    <i />
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
              <Funnel active={active} />
              <span className={s.visualCaption}>
                {signals[active].title} / illustrative architecture
              </span>
            </div>
          </section>
          <section className={s.connections} id="connections">
            <div className={s.connectionRays} aria-hidden>
              {Array.from({ length: 110 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <span className={s.tag}>Connectivity</span>
            <h2>
              The tools you use.
              <br className={s.mobileOnly} /> A more connected workflow.
            </h2>
            <p>
              Connect the inbox, documents and operating systems
              <br /> around the output your team needs.
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
        <section className={s.quoteSection} id="principle" data-quote>
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
